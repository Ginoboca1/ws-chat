/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import "./style/chat.css";
import { FaPaperPlane } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/authContext";

export const Chat = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [userName, setUserName] = useState();
  const { decodedToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState();

  const decodeToken = async (token) => {
    const result = await decodedToken(token);
    return result;
  };
  const socket = io("http://localhost:3000");

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (!tokenStorage) {
      console.log("Token is undefined");
      return;
    }
    setToken(tokenStorage);
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("auth", tokenStorage);
      socket.on("on-clients-changed", (clients) => {
        setUsers((prevUsers) => [...prevUsers, ...clients]);
      });
      setStatus(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      socket.emit("disconnect");
    });

    if (token) {
      decodeToken(token)
        .then((decodedData) => {
          const { id, name } = decodedData;
          setUserName(name);
          setUsers((prevUsers) => [...prevUsers, { id, name }]);
        })
        .catch((error) => {
          console.error(error);
          navigate("/");
        });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(token);
    socket.emit("send-message", message, token);
  };

  const logout = () => {
    socket.disconnect();
    localStorage.removeItem("token");
    navigate("/register");
  };

  return (
    <div className="main-container">
      <Button
        className={"logout-button"}
        titleButton={"Logout"}
        clickAction={logout}
      />
      <div className="information-bubble">
        <h3>Usuario: {userName || "Usuario Desconocido"}</h3>
        <div className="status-info">
          <h3>Estado del chat: </h3>
          {status ? (
            <p className="status-online">online</p>
          ) : (
            <p className="status-offline">offline</p>
          )}
        </div>

        <h3>Personas conectadas</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      <div className="chat ">
        <div className="contact">
          <div className="pic stark"></div>
          <div className="contact-info">
            <div className="name text-gray-900">Tony Stark</div>
            <div className="seen">Hoy a las 12:56</div>
          </div>
          <i className="phone-icon">
            <FaPhoneAlt />
          </i>
        </div>

        <div className="messages " id="chat">
          <div className="time ">Hoy a las 11:41</div>

          <div className="message incoming ">
            Uh, what is this guy's problem, Mr. Stark? 🤔
          </div>

          <div className="message text-gray-900">
            Uh, he's from space, he came here to steal a necklace from a wizard.
          </div>

          <div className="message stark">
            <div className="typing typing-1 inline-block w-2 h-2 mr-0 box-border"></div>
            <div className="typing typing-2 inline-block w-2 h-2 mr-0 box-border"></div>
            <div className="typing typing-3 inline-block w-2 h-2 mr-0 box-border"></div>
          </div>
        </div>

        <form className="input" onSubmit={handleSubmit}>
          <input
            className="border-none"
            placeholder="Escribe tu mensaje aquí"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">button</button>
        </form>
      </div>
    </div>
  );
};
