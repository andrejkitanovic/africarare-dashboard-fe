/// <reference types="cypress" />

describe("check partner page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/partners");
  });

  it("should have new partner modal", () => {
    cy.get('[data-cy="new-partner-button"]').click();
    cy.get('[data-cy="new-partner-modal"]');
  });

  it("should close new partner modal when clicked on backdrop", () => {
    cy.get('[data-cy="new-partner-button"]').click();
    cy.get('[data-cy="new-partner-modal"]');

    cy.get(".MuiBackdrop-root").click({ force: true });
    cy.get('[data-cy="new-partner-modal"]').should("not.exist");
  });
});
