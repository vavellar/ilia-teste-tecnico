import {Suspense} from "react";
import Link from "next/link";
import {PlanetCardSkeleton} from "@/components/PlanetCardSkeleton";
import PlanetDetail from "@/app/planets/components/PlanetDetail";

export default async function PlanetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id)
    return (
        <div>
           <div className="text-center mt-4 ">
               <h1 className="text-4xl">Planet details: </h1>
           </div>
            <Suspense fallback={<h2 className="text-center my-4 ">Search planet details...</h2>}>
               <PlanetDetail id={id}/>
            </Suspense>
            <div className="text-center mt-4 ">
                <Link href="/" className="text-blue-500 hover:underline">Back to planets page</Link>
            </div>
        </div>

    );
}
