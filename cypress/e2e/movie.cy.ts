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

describe("input", () => {
  it("should have a placeholder", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").should("have.attr", "placeholder");
  });

  it("should show no result message", () => {
    cy.visit("http://localhost:1234");
    cy.get("button").click();
    cy.get("p").contains("Inga sökresultat att visa");
  });
});

describe("create new html", () => {
  it("should create new html", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("moviesearch");

    cy.get("input").type("Alfons");

    cy.get("input").should("have.value", "Alfons");

    cy.get("button").click();

    cy.wait("@moviesearch").get("h3").should("have.length", 3);
  });
});
