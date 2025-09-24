"use client";

import { PlanetCard } from "../PlanetCard";
import type { Planet } from "@/app/interfaces";
import {PlanetCardSkeleton} from "@/app/components/PlanetCardSkeleton";

interface PlanetListProps {
    planets: Planet[];
    nextUrl: string | null;
    prevUrl: string | null;
    isLoading: boolean;
    onFetchPage: (url: string) => void;
}

export function PlanetList({ planets, nextUrl, prevUrl, isLoading, onFetchPage }: PlanetListProps) {

    const orderByName = (list: Planet[]) => {
        return list.sort((a: Planet, b: Planet) => a.name.localeCompare(b.name));
    }

    if (isLoading) {
        return (
            <div className="p-8">
                {Array.from({ length: 5 }).map((_, i) => (
                    <PlanetCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if(planets.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">No planets found.</p>
            </div>
        );
    }


    return (
        <div className="grid gap-4 w-full">
            <div className="flex mt-8 w-full justify-between flex-col sm:flex-row">
                <button
                    className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50 cursor-pointer mb-2 sm:mb-0"
                    onClick={() => prevUrl && onFetchPage(prevUrl)}
                    disabled={!prevUrl}
                >
                    Previous Page
                </button>

                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer"
                    onClick={() => nextUrl && onFetchPage(nextUrl)}
                    disabled={!nextUrl}
                >
                    Next Page
                </button>
            </div>
            <div>
              {orderByName(planets).map((planet) => (
                  <PlanetCard
                      key={planet.name}
                      planet={planet}
                  />
              ))}
            </div>
        </div>
    );
}
