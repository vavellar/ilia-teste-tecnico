"use client";

import { useState } from "react";
import { PlanetCard } from "../PlanetCard";
import type {ApiResponse, Planet} from "@/app/interfaces";
import {PlanetCardSkeleton} from "@/components/PlanetCardSkeleton";


interface Props {
    initialPlanets: Planet[];
    initialNext: string | null;
    initialPrev: string | null;
}

export function PlanetList({ initialPlanets, initialNext, initialPrev }: Props) {

    const orderByName = (list: Planet[]) => {
        return list.sort((a: Planet, b: Planet) => a.name.localeCompare(b.name));
    }
    const [planets, setPlanets] = useState<Planet[]>(orderByName(initialPlanets));
    const [nextUrl, setNextUrl] = useState<string | null>(initialNext);
    const [prevUrl, setPrevUrl] = useState<string | null>(initialPrev);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchPlanets = async (url: string) => {
        setIsLoading(true);
        const res = await fetch(url);
        const data: ApiResponse = await res.json();

        const sortedPlanets = orderByName(data.results)

        setPlanets(sortedPlanets);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="p-8">
                {Array.from({ length: 5 }).map((_, i) => <PlanetCardSkeleton key={i} />)}
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-4">
                <div className="flex mt-8 w-full justify-between flex-col sm:flex-row">
                    <button
                        className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
                        onClick={() => prevUrl && fetchPlanets(prevUrl)}
                        disabled={!prevUrl}
                    >
                        Previous Page
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                        onClick={() => nextUrl && fetchPlanets(nextUrl)}
                        disabled={!nextUrl}
                    >
                        Next page
                    </button>
                </div>
                {planets.map((planet) => (
                    <PlanetCard
                        key={planet.name}
                        name={planet.name}
                        url={planet.url}
                        climate={planet.climate}
                        terrain={planet.terrain}
                    />
                ))}
            </div>
        </>
    );
}
