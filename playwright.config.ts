import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    baseURL: 'https://www.bankofcanada.ca'
  },
});