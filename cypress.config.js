const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // Integrates the Cucumber preprocessor plugin
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  // Configures the file preprocessor with esbuild plugin for handling feature files
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents, // Sets up event handling for Cypress tests
    specPattern: "cypress/e2e/features/*.feature", // Specifies the location of feature files
    baseUrl: "https://example.com", // Base URL for the tests (replace with your actual URL)
    defaultCommandTimeout: 5000, // Sets default timeout for Cypress commands
    chromeWebSecurity: false, // Disables Chrome web security for testing
  },
});
