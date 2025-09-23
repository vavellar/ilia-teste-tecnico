export interface Planet {
    name: string;
    climate: string;
    terrain: string;
    diameter: string;
    films: string[];
    url: string;
}

export interface ApiResponse {
    results: Planet[];
    next: string | null;
    previous: string | null;
}
