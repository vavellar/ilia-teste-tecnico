import React from "react";

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    population: string;
    residents: string[];
}

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
                <h1 className="text-3xl font-bold mb-4">{planet.name}</h1>
                <ul className="space-y-2">
                    <li><strong>Rotation period:</strong> {planet.rotation_period}</li>
                    <li><strong>Orbital period:</strong> {planet.orbital_period}</li>
                    <li><strong>Diameter:</strong> {planet.diameter}</li>
                    <li><strong>Climate:</strong> {planet.climate}</li>
                    <li><strong>Gravity:</strong> {planet.gravity}</li>
                    <li><strong>Terrain:</strong> {planet.terrain}</li>
                    <li><strong>Population:</strong> {planet.population}</li>
                </ul>
            </div>

            {residents.length > 0 && (
                <div className="w-full max-w-3xl shadow-md rounded-lg p-6 bg-gray-800">
                    <h2 className="text-2xl font-semibold mb-4">Residents</h2>
                    {residents.map((resident, idx) => (
                        <div key={idx} className="mb-4 border-b pb-4">
                            <p><strong>Name:</strong> {resident.name}</p>
                            <p><strong>Hair color:</strong> {resident.hair_color}</p>
                            <p><strong>Eye color:</strong> {resident.eye_color}</p>
                            <p><strong>Gender:</strong> {resident.gender}</p>

                            {resident.species.length > 0 && (
                                <ul className="ml-4 mt-2 list-disc">
                                    {resident.species.map((s, i) => (
                                        <li key={i}><strong>Species:</strong> {s.name}</li>
                                    ))}
                                </ul>
                            )}

                            {resident.vehicles.length > 0 && (
                                <ul className="ml-4 mt-2 list-disc">
                                    {resident.vehicles.map((v, i) => (
                                        <li key={i}><strong>Vehicle:</strong> {v.name} - {v.model}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
