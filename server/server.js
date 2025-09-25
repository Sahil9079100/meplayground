const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profile.routes');
const projectsRoutes = require('./routes/projects.routes');
const searchRoutes = require('./routes/search.routes');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
connectDB();

app.use(cors({
    origin: ["http://localhost:5173", "meplayground.netlify.app"],
    credentials: true,
}));

app.use(bodyParser.json());

app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/search', searchRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
