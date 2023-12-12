import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Chat } from "./pages/Chat";

function App() {
  return (
    <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 min-h-screen flex flex-col justify-center items-center text-center">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
