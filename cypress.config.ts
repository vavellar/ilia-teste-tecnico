import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",

    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
  },
  video: false
});
