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

// ✅ Configure CORS properly
app.use(cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,               // allow cookies
}));

app.use(bodyParser.json());

// ✅ Mount under /api so frontend matches
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
