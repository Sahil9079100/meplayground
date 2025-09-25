import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        API.get("/profile").then(res => setProfile(res.data));
    }, []);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p>{profile.email}</p>
            <p>{profile.education}</p>

            <h2 className="mt-4 font-semibold">Skills</h2>
            <ul className="list-disc ml-6">
                {profile.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>

            <h2 className="mt-4 font-semibold">Work</h2>
            <ul className="list-disc ml-6">
                {profile.work.map((w, i) => <li key={i}>{w}</li>)}
            </ul>

            <h2 className="mt-4 font-semibold">Links</h2>
            <ul className="list-disc ml-6">
                {profile.links.map((l, i) => (
                    <li key={i}><a className="text-blue-600" href={l} target="_blank">{l}</a></li>
                ))}
            </ul>
        </div>
    );
}
