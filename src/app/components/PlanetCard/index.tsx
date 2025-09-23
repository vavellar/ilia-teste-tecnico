import Link from "next/link";

export function PlanetCard({ name, climate, terrain, url }: { name: string; climate: string; terrain: string, url: string }) {

    const id = url.split("/").filter(Boolean).pop();

    return (
        <div className="border p-4 m-4 rounded shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">{name}</h2>
            <p><strong>Climate:</strong> {climate}</p>
            <p><strong>Terrain:</strong> {terrain}</p>
            <Link href={`/planets/${id}`} className="text-blue-600 underline">
                See details
            </Link>
        </div>
    );
}
