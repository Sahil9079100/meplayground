import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile.jsx";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
