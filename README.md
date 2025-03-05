# API Testing Framework

This is an automation testing framework for JSONPlaceholder APIs using Node.js, TypeScript, and Playwright.

## Features

- TypeScript support for better type safety and developer experience
- Playwright for reliable and fast API testing
- Automatic type generation from API responses
- Runtime type validation using Zod
- Modular test structure
- Reusable API helper utilities
- HTML test reports
- CI/CD integration with GitHub Actions

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd api-testing-framework
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers (although not needed for API testing):

```bash
npx playwright install
```

## Project Structure

```
├── src/
│   ├── types/
│   │   ├── api.types.ts        # Manual type definitions
│   │   └── generated.types.ts  # Auto-generated types from API
│   ├── schemas/
│   │   └── api.schemas.ts      # Zod schemas for validation
│   └── utils/
│       └── api-helper.ts       # API helper utilities
├── tests/
│   ├── posts.spec.ts          # Tests for posts endpoints
│   ├── comments.spec.ts       # Tests for comments endpoints
│   ├── users.spec.ts          # Tests for users endpoints
│   ├── albums.spec.ts         # Tests for albums endpoints
│   ├── photos.spec.ts         # Tests for photos endpoints
│   └── todos.spec.ts          # Tests for todos endpoints
├── scripts/
│   └── generate-types.ts      # Type generation script
├── playwright.config.ts       # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Test Scenarios

### Posts API

- **GET /posts**
  - Returns all posts
  - Validates response structure
  - Checks array properties
- **GET /posts/:id**
  - Returns specific post by ID
  - Validates all fields (userId, id, title, body)
- **POST /posts**
  - Creates new post
  - Validates response includes created data
  - Checks ID assignment
- **PUT /posts/:id**
  - Updates existing post
  - Verifies updated fields
- **DELETE /posts/:id**
  - Deletes post
  - Verifies successful deletion

### Comments API

- **GET /comments**
  - Returns all comments
  - Validates response structure
- **GET /comments?postId=:id**
  - Returns comments for specific post
  - Validates postId filtering
- **POST /comments**
  - Creates new comment
  - Validates email format
  - Checks required fields
- **PUT /comments/:id**
  - Updates existing comment
  - Verifies field updates
- **DELETE /comments/:id**
  - Deletes comment
  - Confirms deletion

### Users API

- **GET /users**
  - Returns all users
  - Validates complex nested objects (address, company)
- **GET /users/:id**
  - Returns specific user
  - Validates all nested fields
- **POST /users**
  - Creates new user with full details
  - Validates complex object creation
- **PUT /users/:id**
  - Updates user with nested objects
  - Verifies nested updates
- **DELETE /users/:id**
  - Deletes user record

### Albums API

- **GET /albums**
  - Returns all albums
  - Validates basic structure
- **GET /albums/:id**
  - Returns specific album
  - Validates fields
- **GET /albums?userId=:id**
  - Returns albums for specific user
  - Validates user filtering
- **POST /albums**
  - Creates new album
  - Validates required fields
- **PUT /albums/:id**
  - Updates album details
  - Verifies changes
- **DELETE /albums/:id**
  - Removes album

### Photos API

- **GET /photos**
  - Returns all photos
  - Validates URL formats
- **GET /photos/:id**
  - Returns specific photo
  - Validates all fields
- **GET /photos?albumId=:id**
  - Returns photos for specific album
  - Validates album filtering
- **POST /photos**
  - Creates new photo
  - Validates URL fields
- **PUT /photos/:id**
  - Updates photo details
  - Verifies URL updates
- **DELETE /photos/:id**
  - Removes photo

### Todos API

- **GET /todos**
  - Returns all todos
  - Validates boolean completion status
- **GET /todos/:id**
  - Returns specific todo
  - Validates structure
- **POST /todos**
  - Creates new todo
  - Validates boolean fields
- **PUT /todos/:id**
  - Updates todo status
  - Verifies completion update
- **DELETE /todos/:id**
  - Removes todo

## Running Tests

Run all tests:

```bash
npm test
```

Run tests with UI mode:

```bash
npm run test:headed
```

View HTML test report:

```bash
npm run test:report
```

Generate API types:

```bash
npm run generate:types
```

## CI/CD Integration

The framework includes GitHub Actions workflow that:

1. Runs on push to main and pull requests
2. Sets up Node.js environment
3. Installs dependencies
4. Runs all tests
5. Uploads test reports as artifacts

## Type Generation

The framework automatically generates TypeScript interfaces from API responses:

1. Fetches data from all endpoints
2. Generates precise types
3. Saves to `src/types/generated.types.ts`
4. Run manually with `npm run generate:types`

## Runtime Validation

Uses Zod schemas to validate:

- Response structure
- Data types
- Required fields
- Email formats
- URL formats
- Nested objects
- Array responses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
