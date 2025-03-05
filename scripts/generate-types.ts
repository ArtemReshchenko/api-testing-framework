import axios from 'axios';
import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';
import * as fs from 'fs/promises';
import * as path from 'path';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const ENDPOINTS = {
  posts: '/posts',
  comments: '/comments',
  albums: '/albums',
  photos: '/photos',
  todos: '/todos',
  users: '/users'
};

async function quicktypeJSON(typeName: string, jsonString: string): Promise<string> {
  const jsonInput = await jsonInputForTargetLanguage('typescript');
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const options = {
    rendererOptions: {
      'just-types': 'true',
    },
    inferMaps: false,
    inferEnums: false,
    inferDateTimes: false,
    inferIntegerStrings: false,
    alphabetizeProperties: true,
  };

  const { lines } = await quicktype({
    inputData,
    lang: 'typescript',
    ...options,
  });

  return lines.join('\n');
}

async function fetchAndGenerateTypes(): Promise<void> {
  try {
    let allTypes = '';
    
    for (const [name, endpoint] of Object.entries(ENDPOINTS)) {
      console.log(`Fetching ${name} from ${endpoint}...`);
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      const typeName = name.charAt(0).toUpperCase() + name.slice(1, -1);
      const typeDefinition = await quicktypeJSON(typeName, JSON.stringify(data));
      allTypes += `${typeDefinition}\n\n`;
    }

    const outputDir = path.join(process.cwd(), 'src', 'types');
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(
      path.join(outputDir, 'generated.types.ts'),
      allTypes
    );

    console.log('Types generated successfully!');
  } catch (error) {
    console.error('Error generating types:', error);
    process.exit(1);
  }
}

fetchAndGenerateTypes(); 