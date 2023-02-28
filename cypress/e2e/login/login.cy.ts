/// <reference types="cypress" />

describe("check login page", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/login");
  });

  it("should have language switcher", () => {
    cy.get('button[data-cy="language-switcher"]').click();
  });

  it("should have forgot password link", () => {
    cy.get('[data-cy="forgot-password-button"]').click();

    cy.location("pathname").should("eq", "/forgot-password");
  });

  it("should have login form", () => {
    cy.get('[data-cy="email-input"]');
    cy.get('[data-cy="password-input"]');

    cy.get('button[data-cy="login-button"]');
  });

  it("should have login functionality", () => {
    cy.get('div[data-cy="email-input"] input[name="email"]').type(
      Cypress.env("AUTH_EMAIL")
    );
    cy.get('div[data-cy="password-input"] input[name="password"]').type(
      Cypress.env("AUTH_PASSWORD")
    );

    cy.get('form[data-cy="login-form"]').submit();
    cy.location("pathname").should("eq", "/dashboard");
  });
});
