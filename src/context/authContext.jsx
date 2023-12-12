import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      let errorMessage =
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.";

      if (error.response) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage =
          "Error de conexión. Por favor, inténtalo de nuevo más tarde.";
      }

      setErrors([...errors, errorMessage]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
