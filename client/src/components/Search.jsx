import { useState } from "react";
import API from "../api";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);

    const handleSearch = async () => {
        const res = await API.get(`/search?q=${query}`);
        setResults(res.data);
    };

    return (
        <div className="p-4 bg-white shadow rounded mt-4">
            <h2 className="text-xl font-bold">Search</h2>
            <div className="flex gap-2 mt-2">
                <input
                    className="border p-2 flex-1"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4" onClick={handleSearch}>
                    Go
                </button>
            </div>

            {results && (
                <div className="mt-4">
                    <h3 className="font-semibold">Results:</h3>
                    <pre className="bg-gray-100 p-2 mt-2 text-sm overflow-x-auto">
                        {JSON.stringify(results, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
