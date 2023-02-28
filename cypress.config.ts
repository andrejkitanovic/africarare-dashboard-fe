import { defineConfig } from "cypress";

require("dotenv").config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      config.baseUrl = process.env.CYPRESS_BASE_URL;
      config.env.API_URL = process.env.REACT_APP_API_URL;
      config.env.AUTH_EMAIL = process.env.CYPRESS_AUTH_EMAIL;
      config.env.AUTH_PASSWORD = process.env.CYPRESS_AUTH_PASSWORD;

      return config;
    },
  },
});
