import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SelectGenres from "./pages/SelectGenres";
import SelectActors from "./pages/SelectActors";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import Logout from "./pages/Logout";
import Categories from "./pages/Categories";
import MovieDetail from "./pages/MovieDetail";
import About from "./pages/AboutPage";
import HeroDashboard from "./components/HeroDashboard";
import FavoriteMoviesPage from './pages/FavoriteMoviesPage';
import GenrePage from './pages/GenrePage'; // or components, wherever you store it

function App() {
  const userId = localStorage.getItem('userId'); // ✅ define inside App

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-genres" element={<SelectGenres />} />
        <Route path="/select-actors" element={<SelectActors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hero-dashboard" element={<HeroDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/movie/:title" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/favorites" element={<FavoriteMoviesPage userId={userId} />} /> {/* ✅ FIXED */}
        <Route path="/top/:genre" element={<GenrePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
