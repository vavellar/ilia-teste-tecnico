/// <reference types="cypress" />

describe("Home - Star Wars Planets", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/planets**", { fixture: "planets.json" }).as("getPlanets");

    cy.visit("/");
    cy.wait("@getPlanets");
  });


  it("Should show the planets list", () => {
    cy.get("[data-cy=planet-item]").should("have.length.greaterThan", 0);

    cy.get("[data-cy=planet-item] h2").first().should("not.be.empty");
  });

  it("Should show the planets in alphabetical order", () => {
    cy.get("[data-cy=planet-item] h2").then(($names) => {
      const uiNames = $names.toArray().map((el) => el.innerText.trim());

      expect(uiNames).to.deep.equal(["Alderaan", "Tatooine",]);
    });
  });

  it("Should navigate to details page when link is clicked", () => {
    cy.get("[data-cy=planet-detail-link]").first().click();


    cy.url().should("include", "/planets/2");

    cy.contains("Alderaan").should("exist");
  });

  it("Should filter the planets when search bar is typed", () => {
    cy.get("[data-cy=search-bar]").type("Tatooine");

    cy.get("[data-cy=planet-item]").should("have.length", 1);
    cy.get("[data-cy=planet-item] h2").contains("Tatooine");
  });
});
