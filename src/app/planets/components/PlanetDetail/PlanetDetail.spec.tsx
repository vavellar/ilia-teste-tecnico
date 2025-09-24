import React from "react";
import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PlanetDetail from "./index";
import type { PlanetDetails } from "@/app/interfaces";

interface MockFetchOptions {
    planet?: PlanetDetails;
    resident?: typeof residentMock;
    failPlanet?: boolean;
    residentsList?: string[];
}

const planetMock: PlanetDetails = {
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    population: "200000",
    films: [],
    url: "https://swapi.dev/api/planets/1/",
    residents: ["https://swapi.dev/api/people/1/"],
};

const residentMock = {
    name: "Luke Skywalker",
    hair_color: "blond",
    eye_color: "blue",
    gender: "male",
    species: [],
    vehicles: [],
};

async function renderPlanetDetail(id: string) {
    const jsx = await PlanetDetail({ id });
    return render(jsx);
}

function mockFetch({
                       planet = planetMock,
                       resident = residentMock,
                       failPlanet = false,
                       residentsList = planet.residents,
                   }: MockFetchOptions = {}) {
    global.fetch = vi.fn((url: string | Request) => {
        const urlStr = typeof url === "string" ? url : url.url;

        if (urlStr.includes("planets")) {
            if (failPlanet) return Promise.resolve({ ok: false } as Response);
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ ...planet, residents: residentsList }),
            } as Response);
        }

        if (urlStr.includes("people")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(resident),
            } as Response);
        }

        return Promise.reject("Unknown URL");
    }) as unknown as typeof fetch;
}

describe("PlanetDetail (Server Component)", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render planet details correctly", async () => {
        mockFetch();
        await renderPlanetDetail("1");

        expect(screen.getByText("Planet Details")).toBeInTheDocument();
        expect(screen.getByText("Tatooine")).toBeInTheDocument();
        expect(screen.getByText("23")).toBeInTheDocument();
        expect(screen.getByText("304")).toBeInTheDocument();
        expect(screen.getByText("10465")).toBeInTheDocument();
        expect(screen.getByText("arid")).toBeInTheDocument();
        expect(screen.getByText("desert")).toBeInTheDocument();
        expect(screen.getByText("200000")).toBeInTheDocument();
    });

    it("should render residents correctly", async () => {
        mockFetch();
        await renderPlanetDetail("1");

        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("blond")).toBeInTheDocument();
        expect(screen.getByText("blue")).toBeInTheDocument();
        expect(screen.getByText("male")).toBeInTheDocument();
    });

    it("should show fallback when there are no residents", async () => {
        mockFetch({ residentsList: [] });
        await renderPlanetDetail("1");

        expect(screen.getByText("No residents on this planet")).toBeInTheDocument();
    });

    it("should handle fetch error gracefully", async () => {
        mockFetch({ failPlanet: true });
        await renderPlanetDetail("999");

        expect(screen.getByText("Failed to load planet data.")).toBeInTheDocument();
    });
});
