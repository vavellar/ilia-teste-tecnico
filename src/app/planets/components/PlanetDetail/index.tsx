import React from "react";
import {Planet} from "@/app/interfaces";

interface Resident {
    name: string;
    hair_color: string;
    eye_color: string;
    gender: string;
    species: { name: string }[];
    vehicles: { name: string; model: string }[];
}

interface PlanetDetailProps {
    id: string;
}

export default async function PlanetDetail({ id }: PlanetDetailProps) {

    const planetRes = await fetch(`https://swapi.dev/api/planets/${id}/`);

    if (!planetRes.ok) {
        return <div className="text-center text-red-500">Failed to load planet data.</div>;
    }
    const planet: Planet = await planetRes.json();


    const residents: Resident[] = await Promise.all(
        planet.residents.map(async (url) => {
            const rRes = await fetch(url);
            const rData: any = await rRes.json();
            const species = await Promise.all(
                (rData.species || []).map(async (url: string) => {
                    const sRes = await fetch(url);
                    return await sRes.json();
                })
            );

            const vehicles = await Promise.all(
                (rData.vehicles || []).map(async (url: string) => {
                    const vRes = await fetch(url);
                    return await vRes.json();
                })
            );

            return {
                name: rData.name,
                hair_color: rData.hair_color,
                eye_color: rData.eye_color,
                gender: rData.gender,
                species,
                vehicles,
            };
        })
    );

    return (
        <main className="flex flex-col items-center p-6">
            <div className="w-full max-w-3xl shadow-md rounded-lg p-6 mb-6 bg-gray-800">
                <h1 className="text-3xl font-bold mb-4 text-yellow-400 text-center">
                    Planet Details
                </h1>
                <ul className="space-y-2 text-center">
                    <li className="text-xl"><strong>Name:</strong> <strong>{planet.name}</strong></li>
                    <li><strong>Rotation period:</strong> {planet.rotation_period}</li>
                    <li><strong>Orbital period:</strong> {planet.orbital_period}</li>
                    <li><strong>Diameter:</strong> {planet.diameter}</li>
                    <li><strong>Climate:</strong> {planet.climate}</li>
                    <li><strong>Gravity:</strong> {planet.gravity}</li>
                    <li><strong>Terrain:</strong> {planet.terrain}</li>
                    <li><strong>Population:</strong> {planet.population}</li>
                </ul>
            </div>

            <div className="w-full max-w-3xl shadow-md rounded-lg p-6 mb-6 bg-gray-800">
                {residents.length > 0 ? (
                    <>
                        <h2 className="text-3xl font-semibold mb-4 text-center text-yellow-400">
                            Residents
                        </h2>
                        <div className="space-y-4">
                            {residents.map((resident, idx) => (
                                <div key={idx} className="p-4 border rounded-lg bg-gray-700">
                                    <p><strong>Name:</strong> {resident.name}</p>
                                    <p><strong>Hair color:</strong> {resident.hair_color}</p>
                                    <p><strong>Eye color:</strong> {resident.eye_color}</p>
                                    <p><strong>Gender:</strong> {resident.gender}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="text-2xl font-semibold mb-4 text-center text-red-800">
                        No residents on this planet
                    </h2>
                )}
            </div>
        </main>
    );
}
