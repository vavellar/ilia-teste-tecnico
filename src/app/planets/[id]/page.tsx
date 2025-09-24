import Link from "next/link";
import PlanetDetail from "@/app/planets/components/PlanetDetail";

export default async function PlanetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div>
            <div className="text-center mt-4 ">
                <Link href="/" className="text-blue-500 hover:underline">Back to planets page</Link>
            </div>
           <PlanetDetail id={id}/>
        </div>

    );
}
