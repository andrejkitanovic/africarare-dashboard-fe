/// <reference types="cypress" />

describe("check user drawer", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("sholud have user drawer", () => {
    cy.get('[data-cy="user-drawer-button"]').click();
    cy.get('[data-cy="user-drawer"]');
  });

  it("sholud close user drawer when clicked on backdrop", () => {
    cy.get('[data-cy="user-drawer-button"]').click();
    cy.get('[data-cy="user-drawer"]');

    cy.get(".MuiBackdrop-root").click();
    cy.get('[data-cy="user-drawer"]').should("not.exist");
  });

  it("sholud have user drawer logout functionality", () => {
    cy.get('[data-cy="user-drawer-button"]').click();
    cy.get('[data-cy="user-drawer"]');

    cy.get('[data-cy="logout-button"]').click();
    cy.location("pathname").should("eq", "/login");
  });
});
