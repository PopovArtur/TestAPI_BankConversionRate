import { defineConfig } from '@playwright/test';
export default defineConfig({
  globalTeardown:require.resolve('./global-teardown'),
  use: {
    baseURL: 'https://www.bankofcanada.ca',
    screenshot: 'only-on-failure'
  },
  reporter: [ ['junit', { outputFile: 'results.xml' }] ]
});