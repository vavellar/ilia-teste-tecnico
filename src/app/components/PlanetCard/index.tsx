"use client";

import { useEffect, useState } from "react";
import type { Planet } from "@/app/interfaces";
import Link from "next/link";

interface Film {
    title: string;
    episode_id: number;
}

interface PlanetCardProps {
    planet: Planet;
}

export function PlanetCard({ planet }: PlanetCardProps) {
    const [films, setFilms] = useState<Film[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const id = planet.url.split("/").filter(Boolean).pop();

    useEffect(() => {
        debugger
        const fetchFilms = async () => {
            setIsLoading(true)
            try {
                const responses = await Promise.all(
                    planet.films.map((url) => fetch(url).then((res) => res.json()))
                );
                setFilms(responses);
            } catch (err) {
                console.error("Error fetching films", err);
            } finally {
                setIsLoading(false)
            }
        };

        if (planet.films.length > 0) {
            fetchFilms();
        }
    }, [planet.films]);

    return (
        <div className="w-full shadow-md rounded-lg p-6 mb-4 bg-gray-800 text-white text-center">
            <Link href={`/planets/${id}`} className="text-blue-400 hover:underline mb-4 inline-block">
                See details about the planet
            </Link>
            <h2 className="text-2xl font-semibold mb-2">{planet.name}</h2>
            <ul className="space-y-1">
                <li><strong>Climate:</strong> {planet.climate}</li>
                <li><strong>Terrain:</strong> {planet.terrain}</li>
                <li><strong>Diameter:</strong> {planet.diameter}</li>
            </ul>

            {isLoading ? (
                <p className="mt-4 text-gray-400">Loading films...</p>
            ) : films.length > 0 ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-400">Appears in Films:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {films.map((film) => (
                            <li key={film.episode_id}>{film.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h3 className="text-md mt-4 font-semibold mb-2 text-yellow-400">
                    This planet does not appear in films
                </h3>
            )}
        </div>
    );
}
