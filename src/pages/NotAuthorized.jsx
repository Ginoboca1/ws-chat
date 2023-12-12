import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export const UnauthorizedMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h4 className="text-gray-700 text-2xl mb-4">
        Not authorized, please login to continue
      </h4>
      <Button
        className={"bg-blue-500 hover:bg-blue-700 px-4 py-1.5 rounded-sm"}
        titleButton={"Login"}
        clickAction={() => navigate("/")}
      />
    </div>
  );
};
