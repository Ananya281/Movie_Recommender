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
import Categories from './pages/Categories'; // ✅

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-genres" element={<SelectGenres />} />
        <Route path="/select-actors" element={<SelectActors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
<Route path="/watchlist" element={<Watchlist />} />
<Route path="/categories" element={<Categories />} /> // ✅
<Route path="/logout" element={<Logout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
