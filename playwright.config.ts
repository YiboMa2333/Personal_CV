import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://127.0.0.1:4330', headless: true },
  webServer: { command: 'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4330', url:'http://127.0.0.1:4330/', reuseExistingServer:false },
});
