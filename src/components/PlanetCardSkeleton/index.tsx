export function PlanetCardSkeleton() {
    return (
        <div className="border p-4 m-4 rounded shadow-lg animate-pulse flex justify-center items-center flex-col">
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
            <div className="w-75 h-5 bg-gray-300 mb-4 rounded"></div>
        </div>
    );
}
