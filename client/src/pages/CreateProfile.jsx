import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CreateProfile() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        education: "",
        skills: "",
        work: "",
        links: "",
        projects: [
            {
                title: "",
                description: "",
                links: [""]
            }
        ]
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            ...form,
            skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
            work: form.work.split(",").map((w) => w.trim()).filter(Boolean),
            links: form.links.split(",").map((l) => l.trim()).filter(Boolean),
            projects: form.projects.map((project) => ({
                ...project,
                links: project.links.map((l) => l.trim()).filter(Boolean)
            }))
        };

        try {
            const res = await API.post("/profile", body);
            if (res.status === 200 || res.status === 201) {
                navigate("/profile");
            } else {
                alert("Failed to create profile");
            }
        } catch (err) {
            console.error(err);
            alert("Error creating profile");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "email", "education", "skills", "work", "links"].map((field) => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                ))}

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
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Remove Project
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProject}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Add Project
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateProfile;
