import { useEffect, useState } from "react";
import API from "../api";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        API.get("/profile").then(res => setProjects(res.data.projects));
    }, []);

    return (
        <div className="p-4 bg-white shadow rounded mt-4">
            <h2 className="text-xl font-bold">Projects</h2>
            {projects.map((p, i) => (
                <div key={i} className="mt-3 p-2 border-b">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p>{p.description}</p>
                    {p.links.map((l, j) => (
                        <a key={j} href={l} target="_blank" className="text-blue-600 block">{l}</a>
                    ))}
                </div>
            ))}
        </div>
    );
}
