import { NavLink } from "react-router-dom";

export const UnauthorizedMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h4 className="text-gray-700 text-2xl mb-4">
        Not authorized, please login to continue
      </h4>

      <button
        className={
          "bg-blue-500 hover:bg-blue-700 px-4 py-1.5 rounded-sm to-black"
        }
      >
        <NavLink to="/" className="to-black hover:underline mb-1">
          Login
        </NavLink>
      </button>
    </div>
  );
};
