import { PlanetList } from "@/components/PlanetList";
import type {ApiResponse} from "@/app/interfaces";
import {SearchBar} from "@/components/SearchBar";



export default async function Home() {
    const res = await fetch("https://swapi.dev/api/planets");
    const data: ApiResponse = await res.json();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <SearchBar />
            <h1 className="text-4xl font-bold mb-8">Star Wars Planets</h1>

            <PlanetList initialPlanets={data.results} initialNext={data.next} initialPrev={data.previous} />
        </main>
    );
}
