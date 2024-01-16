/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Button } from "../components/Button.jsx";
import "./style/chat.css";
import { FaPaperPlane } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/authContext";
import { ModalConfirm } from "../components/modal/Modal";

export const Chat = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [userName, setUserName] = useState();
  const { decodedToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState();
  const [dataMessage, setDataMessage] = useState([]);
  const [callModal, setCall] = useState(false);

  const decodeToken = async (token) => {
    const result = await decodedToken(token);
    return result;
  };
  const socket = io("wss://ws-chat-server.vercel.app/ws");

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (!tokenStorage) {
      console.log("Token is undefined");
      return;
    }
    setToken(tokenStorage);
    socket.on("connect", () => {
      socket.emit("auth", tokenStorage);
      socket.on("on-clients-changed", (clients) => {
        setUsers(clients);
      });
      setStatus(true);
    });

    socket.on("disconnect", () => {
      socket.emit("disconnect");
    });

    if (tokenStorage) {
      decodeToken(tokenStorage)
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

    socket.on("on-message", async (data) => {
      try {
        const decodedData = await decodeToken(tokenStorage);
        const { id } = decodedData;

        if (!(id === data.userId)) {
          setDataMessage((prevMessage) => [
            ...prevMessage,
            { content: data.message[0], you: false },
          ]);
          return;
        }
        setDataMessage((prevMessage) => [
          ...prevMessage,
          { content: data.message[0], you: true },
        ]);
        return;
      } catch (error) {
        console.error("Error decoding token in on-message:", error);
      }
    });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      return false;
    }
    socket.emit("send-message", message, token);
    setMessage("");
  };

  const logout = () => {
    socket.disconnect();
    localStorage.removeItem("token");
    navigate("/register");
  };

  return (
    <div className="main-container">
      {callModal && <ModalConfirm setCall={setCall} />}
      <Button
        className={"logout-button"}
        titleButton={"Logout"}
        clickAction={logout}
      />
      <div className="information-bubble">
        <div className="status-info">
          <h3 className="username">{userName || "Usuario Desconocido"}</h3>
          {status ? (
            <p className="status-online">online</p>
          ) : (
            <p className="status-offline">offline</p>
          )}
        </div>

        <h3 className="username">Connected Users</h3>
        <ul>
          {/* Renderizar el usuario actual primero */}
          {userName && <li>{userName} (You)</li>}

          {/* Renderizar los demás usuarios */}
          {users
            .filter((user) => user.name !== userName) // Excluir al usuario actual
            .map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
        </ul>
      </div>

      <div className="chat ">
        <div className="contact">
          <div className="pic stark"></div>
          <div className="contact-info">
            <div className="name text-gray-900">Darth Vader</div>
            <div className="seen">Today at 12:56</div>
          </div>
          <i className="phone-icon" onClick={() => setCall(true)}>
            <FaPhoneAlt className="phone-icon" />
          </i>
        </div>

        <div className="messages " id="chat">
          <div className="time ">Today at 11:41</div>

          <div className="message text-gray-900 ">
            {`${userName} ... I am your father`}
          </div>

          {dataMessage.map((message, index) =>
            message.you ? (
              <div className="message incoming" key={index}>
                {message.content}
              </div>
            ) : (
              <div className="message" key={index}>
                {message.content}
              </div>
            )
          )}
        </div>

        <form className="input" onSubmit={handleSubmit}>
          <input
            className="border-none"
            placeholder="Write your message here"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message ? message : ""}
          />
          <button type="submit">
            <FaPaperPlane className="icon" />
          </button>
        </form>
      </div>
    </div>
  );
};
