// Define test data types
export type TestData = {
  samplePost: {
    title: string;
    body: string;
    userId: number;
  };
  sampleComment: {
    name: string;
    email: string;
    body: string;
  };
  sampleUser: {
    name: string;
    email: string;
    username: string;
  };
};

// Test data fixtures
export const testDataFixtures = {
  samplePost: async ({}, use) => {
    await use({
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    });
  },

  sampleComment: async ({}, use) => {
    await use({
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment'
    });
  },

  sampleUser: async ({}, use) => {
    await use({
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser'
    });
  }
}; 