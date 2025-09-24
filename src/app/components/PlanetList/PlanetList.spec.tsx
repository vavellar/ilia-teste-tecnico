import { render, screen, fireEvent } from "@testing-library/react";
import { PlanetList } from "./index";
import { Planet } from "@/app/interfaces";
import { vi } from "vitest";
import React from "react";

describe("PlanetList", () => {
    const mockPlanets: Planet[] = [
        { name: "Earth", climate: "temperate", terrain: 'grasslands', url: 'https://swapi.dev/api/planets/3/', diameter: '12742', films: [] },
        { name: "Mars", climate: "arid",  terrain: 'mountains', url: 'https://swapi.dev/api/planets/4/', diameter: '6779', films: [] },
    ]

    const mockOnFetchPage = vi.fn();

    it("renders loading state", () => {
        render(
            <PlanetList
                planets={[]}
                nextUrl={null}
                prevUrl={null}
                isLoading={true}
                onFetchPage={mockOnFetchPage}
            />
        );

        expect(screen.getAllByTestId("planet-card-skeleton").length).toBe(5);
    })

    it("renders empty state", () => {
        render(
            <PlanetList
                planets={[]}
                nextUrl={null}
                prevUrl={null}
                isLoading={false}
                onFetchPage={mockOnFetchPage}
            />
        )

        expect(screen.getByText("No planets found.")).toBeInTheDocument();
    })

    it("renders planets and orders them by name", () => {
        render(
            <PlanetList
                planets={mockPlanets}
                nextUrl={null}
                prevUrl={null}
                isLoading={false}
                onFetchPage={mockOnFetchPage}
            />
        )

        expect(screen.getByText("Earth")).toBeInTheDocument();
        expect(screen.getByText("Mars")).toBeInTheDocument();

    });

    it("handles next and previous page buttons", () => {
        render(
            <PlanetList
                planets={mockPlanets}
                nextUrl="next-url"
                prevUrl="prev-url"
                isLoading={false}
                onFetchPage={mockOnFetchPage}
            />
        );

        const nextButton = screen.getByText("Next Page")
        const prevButton = screen.getByText("Previous Page")

        fireEvent.click(nextButton)
        fireEvent.click(prevButton)

        expect(mockOnFetchPage).toHaveBeenCalledWith("next-url")
        expect(mockOnFetchPage).toHaveBeenCalledWith("prev-url")
    });
});
