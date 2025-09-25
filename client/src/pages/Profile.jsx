import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        education: "",
        skills: "",
        work: "",
        links: "",
        projects: [],
    });

    // Fetch profile on mount
    useEffect(() => {
        API.get("/profile")
            .then((res) => setProfile(res.data))
            .catch((error) => {
                // window.location.href = "/";
                console.log("error on profile page",error);
            });
    }, []);

    // Pre-fill form when profile loads
    useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name,
                email: profile.email,
                education: profile.education,
                skills: profile.skills.join(", "),
                work: profile.work.join(", "),
                links: profile.links.join(", "),
                projects: profile.projects && profile.projects.length > 0
                    ? profile.projects.map(p => ({
                        title: p.title,
                        description: p.description,
                        links: p.links
                    }))
                    : [],
            });
        }
    }, [profile]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Update project field
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...form.projects];
        newProjects[index][field] = value;
        setForm({ ...form, projects: newProjects });
    };

    // Update project link
    const handleProjectLinkChange = (projIndex, linkIndex, value) => {
        const newProjects = [...form.projects];
        newProjects[projIndex].links[linkIndex] = value;
        setForm({ ...form, projects: newProjects });
    };

    // Add new project
    const addProject = () => {
        setForm({
            ...form,
            projects: [...form.projects, { title: "", description: "", links: [""] }]
        });
    };

    // Remove project
    const removeProject = (index) => {
        const newProjects = [...form.projects];
        newProjects.splice(index, 1);
        setForm({ ...form, projects: newProjects });
    };

    // Add link to project
    const addProjectLink = (projIndex) => {
        const newProjects = [...form.projects];
        newProjects[projIndex].links.push("");
        setForm({ ...form, projects: newProjects });
    };

    // Remove link from project
    const removeProjectLink = (projIndex, linkIndex) => {
        const newProjects = [...form.projects];
        newProjects[projIndex].links.splice(linkIndex, 1);
        setForm({ ...form, projects: newProjects });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const body = {
            ...form,
            skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
            work: form.work.split(",").map((w) => w.trim()).filter(Boolean),
            links: form.links.split(",").map((l) => l.trim()).filter(Boolean),
            projects: form.projects.map((project) => ({
                ...project,
                links: project.links.map((l) => l.trim()).filter(Boolean)
            })),
        };

        try {
            const res = await API.put("/profile", body);
            setProfile(res.data);
            setEditMode(false);
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        }
    };

    if (!profile) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10">
            {!editMode ? (
                <>
                    <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                    <p>{profile.email}</p>
                    <p>{profile.education}</p>

                    <h2 className="text-xl font-semibold mt-4">Skills</h2>
                    <ul className="list-disc ml-6">
                        {profile.skills.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>

                    <h2 className="text-xl font-semibold mt-4">Work</h2>
                    <ul className="list-disc ml-6">
                        {profile.work.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>

                    <h2 className="text-xl font-semibold mt-4">Links</h2>
                    <ul className="list-disc ml-6">
                        {profile.links.map((l, i) => (
                            <li key={i}>
                                <a href={l} className="text-blue-600 underline" target="_blank" rel="noreferrer">{l}</a>
                            </li>
                        ))}
                    </ul>

                    {profile.projects.length > 0 && (
                        <>
                            <h2 className="text-xl font-semibold mt-4">Projects</h2>
                            {profile.projects.map((proj, i) => (
                                <div key={i} className="border p-2 rounded mb-2">
                                    <h3 className="font-semibold">{proj.title}</h3>
                                    <p>{proj.description}</p>
                                    {proj.links.length > 0 && (
                                        <ul className="list-disc ml-6">
                                            {proj.links.map((l, j) => (
                                                <li key={j}>
                                                    <a href={l} className="text-blue-600 underline" target="_blank" rel="noreferrer">{l}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                    <button
                        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </button>
                </>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                    {["name", "email", "education", "skills", "work", "links"].map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            placeholder={field}
                            value={form[field]}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    ))}
                    {/* Render project fields */}
                    <h2 className="text-xl font-semibold mt-4">Projects</h2>
                    {form.projects.map((proj, i) => (
                        <div key={i} className="border p-4 rounded mb-4">
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={proj.title}
                                onChange={(e) => handleProjectChange(i, "title", e.target.value)}
                                className="w-full border p-2 rounded mb-2"
                            />
                            <textarea
                                placeholder="Project Description"
                                value={proj.description}
                                onChange={(e) => handleProjectChange(i, "description", e.target.value)}
                                className="w-full border p-2 rounded mb-2"
                            />
                            <h3 className="font-semibold">Links</h3>
                            {proj.links.map((link, j) => (
                                <div key={j} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Project Link"
                                        value={link}
                                        onChange={(e) => handleProjectLinkChange(i, j, e.target.value)}
                                        className="w-full border p-2 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeProjectLink(i, j)}
                                        className="bg-red-500 text-white px-2 rounded"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addProjectLink(i)}
                                className="bg-green-500 text-white px-2 rounded"
                            >
                                Add Link
                            </button>

                            <button
                                type="button"
                                onClick={() => removeProject(i)}
                                className="bg-red-600 text-white px-2 rounded mt-2"
                            >
                                Remove Project
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addProject}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Project
                    </button>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Update
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Profile;
