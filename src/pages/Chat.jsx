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

  const decodeToken = async (token) => {
    const result = await decodedToken(token);
    return result;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      socket.emit("auth", token);
      socket.on("on-clients-changed", (clients) => {
        setUsers(clients);
        console.log("socket users:", users);
      });
      setStatus(true);
    });

    if (token) {
      decodeToken(token)
        .then((decodedData) => {
          const { id, name } = decodedData;
          setUserName(name);
          setUsers([...users, { id, name }]);
          console.log("token users:", users);
        })
        .catch((error) => {
          console.error(error);
          navigate("/");
        });
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="main-contain bg-black/50 rounded-xl p-5 flex text-gray-300">
      <Button
        className={"bg-blue-500 hover:bg-blue-700 px-4 py-1.5 rounded-sm"}
        titleButton={"Logout"}
        clickAction={logout}
      />
      <Button clickAction={logout} className={"w-5"} />
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
      <div className="bottom-right">
        <div className="chat ">
          <div className="contact bar">
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
              Uh, he's from space, he came here to steal a necklace from a
              wizard.
            </div>

            <div className="message stark">
              <div className="typing typing-1 inline-block w-2 h-2 mr-0 box-border"></div>
              <div className="typing typing-2 inline-block w-2 h-2 mr-0 box-border"></div>
              <div className="typing typing-3 inline-block w-2 h-2 mr-0 box-border"></div>
            </div>
          </div>

          <form className="input ">
            <input
              className="border-none"
              placeholder="Escribe tu mensaje aquí"
              type="text"
            />
            <i>
              <FaPaperPlane />
            </i>
          </form>
        </div>
      </div>
    </div>
  );
};
// export const Chat = () => {
//   return (
//     <div className="main-container bg-black text-white">
//       <div className="information-bubble ml-5">
//         <h3>
//           Estado del chat:
//           <small className="hidden text-green-500" id="status-online">
//             online
//           </small>
//           <small className="hidden text-red-600" id="status-offline">
//             offline
//           </small>
//         </h3>

//         <h3>Personas conectadas</h3>
//         <ul>
//           <li>Fernando</li>
//           <li>Alberto</li>
//         </ul>
//       </div>
//       <div className="bottom-right absolute bottom-0 right-10">
//         <div className="chat relative flex flex-col justify-between w-96 h-152 z-2 box-border rounded-lg bg-white shadow-2xl">
//           <div className="contact bar relative mb-4 pl-20 h-18 flex flex-col justify-center flex-shrink-0 flex-basis-14 m-4 box-border">
//             <div
//               className="pic stark w-16 h-16 bg-cover bg-center rounded-full absolute left-0 bg-black"
//               style={{
//                 backgroundImage:
//                   'url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png")',
//               }}
//             ></div>

//             <div className="name font-medium mb-1 text-gray-950">Tony Stark</div>
//             <div className="seen text-xs text-gray-600">Hoy a las 12:56</div>
//           </div>

//           <div
//             className="messages p-4 bg-gray-200 flex-shrink-2 overflow-y-auto min-h-420 shadow-inner"
//             id="chat"
//           >
//             <div className="time text-xs bg-gray-300 px-4 py-2 rounded-full text-gray-600 fit-content mx-auto">
//               Hoy a las 11:41
//             </div>

//             <div className="message incoming m-4 ml-auto rounded-tl-md rounded-bl-md rounded-br-md bg-gray-800 text-white">
//               Uh, what is this guy's problem, Mr. Stark? 🤔
//             </div>

//             <div className="message box-border p-2 m-4 bg-white rounded-tl-md rounded-tr-md rounded-br-md min-h-9 fit-content max-w-2/3 shadow-md">
//               Uh, he's from space, he came here to steal a necklace from a
//               wizard.
//             </div>

//             <div className="message stark">
//               <div className="typing typing-1 inline-block w-2 h-2 mr-0 box-border bg-gray-300 rounded-full"></div>
//               <div className="typing typing-2 inline-block w-2 h-2 mr-0 box-border bg-gray-300 rounded-full"></div>
//               <div className="typing typing-3 inline-block w-2 h-2 mr-0 box-border bg-gray-300 rounded-full"></div>
//             </div>
//           </div>

//           <form className="input box-border flex-shrink-0 flex items-center p-0.5 pl-6">
//             <input
//               className="border-none bg-white p-2 pr-6 mr-4 rounded-full flex-grow shadow-md font-red-hat-display font-normal tracking-wide placeholder:text-gray-900"
//               placeholder="Escribe tu mensaje aquí"
//               type="text"
//             />
//             <i className="fas fa-paper-plane text-lg mr-4 text-gray-600 cursor-pointer transition-colors duration-200 hover:text-gray-900"></i>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
