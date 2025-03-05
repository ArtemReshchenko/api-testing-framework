import { test as base } from '@playwright/test';
import { Services, serviceFixtures } from './services';
import { TestData, testDataFixtures } from './test-data';

// Extend base test with our fixtures
export const test = base.extend<Services & TestData>({
  ...serviceFixtures,
  ...testDataFixtures
});

export { expect } from '@playwright/test'; 