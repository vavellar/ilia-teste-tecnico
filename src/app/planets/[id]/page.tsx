import {Suspense} from "react";
import {PlanetDetail} from "@/app/planets/components/PlanetDetail";
import Link from "next/link";

export default async function PlanetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div>
           <div className="text-center mt-4 ">
               <h1 className="text-4xl">Planet details: </h1>
           </div>
            <Suspense fallback={<p className="text-center font-2xl my-4">Loading planet details...</p>}>
               <PlanetDetail id={id}/>
            </Suspense>
            <div className="text-center mt-4 ">
                <Link href="/" className="text-blue-500 hover:underline">Back to planets page</Link>
            </div>
        </div>

    );
}
