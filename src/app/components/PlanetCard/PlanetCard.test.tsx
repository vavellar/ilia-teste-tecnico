import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { PlanetCard } from './index'

const planetMock = {
    name: "Tatooine",
    climate: "arid",
    terrain: "desert",
    rotation_period: "23",
    orbital_period: "304",
    residents: [],
    population: "200000",
    gravity: "1 standard",
    url: "https://swapi.dev/api/planets/1/",
    diameter: "10465",
    films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/"
    ],
};

const filmMockData = [
    { title: "A New Hope", episode_id: 1 },
    { title: "The Empire Strikes Back", episode_id: 2 }
];

describe("PlanetCard", () => {
    beforeEach(() => {
        global.fetch = vi.fn((url: string) =>
            Promise.resolve({
                json: () => {
                    const film = filmMockData.find(f => url.includes(f.episode_id.toString()));
                    return Promise.resolve(film);
                },
            } as Response)
        ) as unknown as typeof fetch;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should show loading state initially", () => {
        render(<PlanetCard planet={planetMock} />);
        expect(screen.getByText("Loading films...")).toBeInTheDocument();
    });

    it("should render films after loading", async () => {
        render(<PlanetCard planet={planetMock} />);

        await waitFor(() => {
            expect(screen.getByText("Appears in Films:")).toBeInTheDocument();
        });

        expect(screen.getByText("A New Hope")).toBeInTheDocument();
        expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    });

    it("should renders fallback if no films", async () => {
        const planetNoFilms = { ...planetMock, films: [] };
        render(<PlanetCard planet={planetNoFilms} />);

        expect(screen.getByText("No films available")).toBeInTheDocument();
    });
});
