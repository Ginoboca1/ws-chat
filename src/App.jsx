/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Chat } from "./pages/Chat";
import { UnauthorizedMessage } from "./pages/NotAuthorized";

function App() {
  // Lógica para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Devuelve true si hay un token, false si no hay token
  };

  const PrivateRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? element : <Navigate to="/notauthorized" />;
  };

  return (
    <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 min-h-screen flex flex-col justify-center items-center text-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
        <Route path="/notauthorized" element={<UnauthorizedMessage />} />
      </Routes>
    </div>
  );
}

export default App;
