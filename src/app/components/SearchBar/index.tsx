"use client";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="w-full max-w-md mb-8">
            <input
                data-cy="search-bar"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                placeholder="Search for a planet..."
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
    );
}
