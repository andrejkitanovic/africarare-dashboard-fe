/// <reference types="cypress" />

describe("check login page", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/forgot-password");
  });

  it("should have login form", () => {
    cy.get('[data-cy="email-input"]');

    cy.get('button[data-cy="forgot-password-button"]');
  });

  it("should have forgot password link", () => {
    cy.get('[data-cy="back-to-login-button"]').click();

    cy.location("pathname").should("eq", "/login");
  });

  it("should have language switcher", () => {
    cy.get('button[data-cy="language-switcher"]').click();
  });
});
