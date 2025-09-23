'use client'

import {useState} from "react";

export function SearchBar() {
    const [search, setSearch ] = useState('')
    return (
        <div className="w-full max-w-md mb-8">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for a planet..."
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
    )
}
