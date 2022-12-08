import { IOmdbResponse } from "../../src/ts/models/IOmdbResponse";

const mockData: IOmdbResponse = {
  Search: [
    {
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Type: "movie",
      Year: "2001",
      imdbID: "tt0120737",
    },
    {
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
      Title: "Alfons Åberg",
      Type: "movie",
      Year: "2001",
      imdbID: "tt0120737",
    },
    {
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
      Title: "Harry Potter",
      Type: "movie",
      Year: "2001",
      imdbID: "tt0120737",
    },
  ],
};

const mockedEmtyList: IOmdbResponse = {
  Search: [],
};

beforeEach(() => {
  cy.visit("/");
});

describe("test movieApp", () => {
  it("should change input.value when typing", () => {
    cy.get("input").type("Alfons");

    cy.get("input").should("have.value", "Alfons");
  });
  it("should have a placeholder in input", () => {
    cy.get("input").should("have.attr", "placeholder", "Skriv titel här");
  });

  it("should show no result message when emty input", () => {
    cy.get("#search").click();

    cy.get("p").contains("Inga sökresultat att visa");
  });
  it("should create new html, a real request", () => {
    cy.get("input").type("Lord of the Rings");

    cy.get("input").should("have.value", "Lord of the Rings");

    cy.get("#search").click();

    cy.get("h3:first").contains("Lord of the Rings");
  });

  it("should create new html, with mockedData", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("moviesearch");
    cy.get("input").type("Alfons");

    cy.get("#search").click();
    cy.wait("@moviesearch").its("request.url").should("contain", "Alfons");

    cy.get("h3").should("have.length", 3);
    cy.get("div.movie").should("have.length", 3);
    cy.get("h3:first").contains("The Lord");
    cy.get("img").should("have.length", 3);
    cy.get("img:first").should(
      "have.attr",
      "src",
      "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
    );
  });

  it("should show no result message when emty list return", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockedEmtyList).as(
      "moviesearch"
    );
    cy.get("input").type("no search result");
    cy.get("#search").click();
    cy.get("p").contains("Inga sökresultat att visa");
  });
});
