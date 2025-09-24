import React from "react";

export function PlanetCardSkeleton() {
    return (
        <div className="border p-4 rounded shadow-lg animate-pulse flex justify-center items-center flex-col mb-4" data-testid="planet-card-skeleton">
            <div className="w-75 h-5 bg-gray-300 my-4 rounded"></div>
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
        </div>
    );
}
