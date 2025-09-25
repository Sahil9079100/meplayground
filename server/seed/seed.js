const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Profile = require('../models/profile.model');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedProfile = async () => {
    try {
        await Profile.deleteMany({}); // Clear previous data

        const profile = new Profile({
            name: "Sahil Vaishnav",
            email: "sahil@example.com",
            education: "B.Tech in Computer Science",
            skills: ["JavaScript", "React", "Node.js", "MongoDB", "Python"],
            projects: [
                {
                    title: "Portfolio Website",
                    description: "A personal portfolio website built with React and Tailwind",
                    links: ["https://github.com/sahil/portfolio", "https://sahil-portfolio.netlify.app"]
                },
                {
                    title: "Chat App",
                    description: "Real-time chat app using Node.js and Socket.io",
                    links: ["https://github.com/sahil/chat-app"]
                }
            ],
            work: ["Intern at XYZ Corp", "Freelance Web Developer"],
            links: ["https://github.com/sahil", "https://linkedin.com/in/sahil", "https://sahil-portfolio.netlify.app"]
        });

        await profile.save();
        console.log('Profile seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB().then(seedProfile);
