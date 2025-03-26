import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CardAdd from "./pages/CardAdd";
import CardEdit from "./pages/CardEdit";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./UserContext"; // Importation du UserProvider

const App: React.FC = () => {
  return (
    <UserProvider>
      {" "}
      {/* Fournit le contexte utilisateur à toute l'application */}
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cardAdd" element={<CardAdd />} />
            <Route path="/cardEdit" element={<CardEdit />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
