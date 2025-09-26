"use client";

import React, { useState, useEffect } from "react";
import type {ApiResponse, Planet} from "@/app/interfaces";
import {SearchBar} from "@/app/components/SearchBar";
import {PlanetList} from "@/app/components/PlanetList";

export default function Home() {
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPlanets = async (url?: string) => {
        setLoading(true);
        try {
            const apiUrl = url ?? (searchTerm
                ? `https://swapi.dev/api/planets/?search=${searchTerm}`
                : "https://swapi.dev/api/planets");
            const res = await fetch(apiUrl);
            const data: ApiResponse = await res.json();
            setPlanets(data.results);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
        } catch (err) {
            console.error("error on fetch planets", err);
            setPlanets([]);
            setNextUrl(null);
            setPrevUrl(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchPlanets();
        }, 400);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8">Star Wars Planets</h1>

            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            <div className="w-full max-w-3xl mt-6">
                <PlanetList
                    planets={planets}
                    nextUrl={nextUrl}
                    prevUrl={prevUrl}
                    isLoading={loading}
                    onFetchPage={fetchPlanets}
                />
            </div>
        </main>
    );
}
