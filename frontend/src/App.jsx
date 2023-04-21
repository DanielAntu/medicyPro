import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

// hooks
import { useAuth } from "./hooks/useAuth";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";

function App() {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={auth ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/profile"
                            element={
                                auth ? <Profile /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/register"
                            element={!auth ? <Register /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/login"
                            element={!auth ? <Login /> : <Navigate to="/" />}
                        />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
