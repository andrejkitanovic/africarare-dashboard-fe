/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import "cypress-localstorage-commands";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(props?: {
        email: string;
        password: string;
      }): Promise<{ token: string }>;
      logout(): void;
    }
  }
}

// -- This is a login command --
Cypress.Commands.add(
  "login",
  ({
    email = Cypress.env("AUTH_EMAIL"),
    password = Cypress.env("AUTH_PASSWORD"),
  } = {}) => {
    cy.log(`Logging in as ${email}`);

    const options = {
      method: "POST",
      url: Cypress.env("API_URL") + "/api/auth/login",
      form: true,
      body: {
        email,
        password,
      },
    };

    cy.request(options).then(({ body }) => {
      const { token } = body;

      cy.setLocalStorage("JWToken", token);

      // yields token necessary for cy.request's
      cy.wrap({ token });
    });
  }
);

Cypress.Commands.add("logout", () => {
  cy.clearLocalStorage();
});
