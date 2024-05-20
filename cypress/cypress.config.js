import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'support/e2e.ts',
    specPattern: 'e2e/**/*.cy.ts',
    baseUrl: `http://server:${process.env.PORT}`,
  },
  experimentalWebKitSupport: true,
});
