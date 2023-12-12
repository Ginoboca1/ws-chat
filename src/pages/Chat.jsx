/* eslint-disable react/no-unescaped-entities */
export const Chat = () => {
  return (
    <div className="main-container bg-black text-white">
      <div className="information-bubble ml-5">
        <h3>
          Estado del chat:
          <small className="hidden text-green-500" id="status-online">
            online
          </small>
          <small className="hidden text-red-600" id="status-offline">
            offline
          </small>
        </h3>

        <h3>Personas conectadas</h3>
        <ul>
          <li>Fernando</li>
          <li>Alberto</li>
        </ul>
      </div>
      <div className="bottom-right absolute bottom-0 right-10">
        <div className="chat relative flex flex-col justify-between w-96 h-152 z-2 box-border rounded-lg bg-white shadow-2xl">
          <div className="contact bar relative mb-4 pl-20 h-18 flex flex-col justify-center flex-shrink-0 flex-basis-14 m-4 box-border">
            <div
              className="pic stark w-16 h-16 bg-cover bg-center rounded-full absolute left-0 bg-black"
              style={{
                backgroundImage:
                  'url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png")',
              }}
            ></div>

            <div className="name font-medium mb-1 text-gray-950">Tony Stark</div>
            <div className="seen text-xs text-gray-600">Hoy a las 12:56</div>
          </div>

          <div
            className="messages p-4 bg-gray-200 flex-shrink-2 overflow-y-auto min-h-420 shadow-inner"
            id="chat"
          >
            <div className="time text-xs bg-gray-300 px-4 py-2 rounded-full text-gray-600 fit-content mx-auto">
              Hoy a las 11:41
            </div>

            <div className="message incoming m-4 ml-auto rounded-tl-md rounded-bl-md rounded-br-md bg-gray-800 text-white">
              Uh, what is this guy's problem, Mr. Stark? 🤔
            </div>

            <div className="message box-border p-2 m-4 bg-white rounded-tl-md rounded-tr-md rounded-br-md min-h-9 fit-content max-w-2/3 shadow-md">
              Uh, he's from space, he came here to steal a necklace from a
              wizard.
            </div>

            <div className="message stark">
              <div className="typing typing-1 inline-block w-2 h-2 mr-0 box-border bg-gray-300 rounded-full"></div>
              <div className="typing typing-2 inline-block w-2 h-2 mr-0 box-border bg-gray-300 rounded-full"></div>
              <div className="typing typing-3 inline-block w-2 h-2 mr-0 box-border bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <form className="input box-border flex-shrink-0 flex items-center p-0.5 pl-6">
            <input
              className="border-none bg-white p-2 pr-6 mr-4 rounded-full flex-grow shadow-md font-red-hat-display font-normal tracking-wide placeholder:text-gray-900"
              placeholder="Escribe tu mensaje aquí"
              type="text"
            />
            <i className="fas fa-paper-plane text-lg mr-4 text-gray-600 cursor-pointer transition-colors duration-200 hover:text-gray-900"></i>
          </form>
        </div>
      </div>
    </div>
  );
};
