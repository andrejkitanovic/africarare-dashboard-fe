/// <reference types="cypress" />

describe("check dashboard page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("should have navigation bar", () => {
    cy.get('[data-cy="navigation"]');
  });

  it("should have footer bar", () => {
    cy.get('[data-cy="footer"]');
  });
});
