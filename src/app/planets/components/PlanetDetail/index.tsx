interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    terrain: string;
    population: string;
}
interface PlanetDetailProps {
    id: string;
}
export async function PlanetDetail({ id }: PlanetDetailProps) {
    const res = await fetch(`https://swapi.dev/api/planets/${id}/`);
    const planet: Planet = await res.json();
    return (
        <div className="flex items-center justify-center flex-col p-8 border p-4 m-4 rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{planet.name}</h1>
            <p><strong>Rotation period:</strong> {planet.rotation_period}</p>
            <p><strong>Orbital period:</strong> {planet.orbital_period}</p>
            <p><strong>Diameter:</strong> {planet.diameter}</p>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
            <p><strong>Population:</strong> {planet.population}</p>
        </div>
    )
}
