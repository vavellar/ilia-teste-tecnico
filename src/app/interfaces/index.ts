export interface Planet {
    name: string;
    climate: string;
    terrain: string;
    diameter: string;
    films: string[];
    url: string;
}

export interface PlanetDetails extends Planet {
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    residents: string[];
}

export interface ApiResponse {
    results: Planet[];
    next: string | null;
    previous: string | null;
}
