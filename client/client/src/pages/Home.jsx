import Profile from "../components/Profile";
import Projects from "../components/Projects";
import Search from "../components/Search";

export default function Home() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <Profile />
            <Projects />
            <Search />
        </div>
    );
}
