const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: false, // Run tests in a visible browser
    baseURL: 'https://demo.haroldwaste.com/',
  },
  timeout: 60000
});
