import { joiResolver } from "@hookform/resolvers/joi";
import Input from "../components/Input.jsx";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "The email must be a text string",
      "string.empty": "Email is required",
      "string.email": "The email must be a valid email address",
      "string.minDomainSegments":
        "The email must have at least 2 domain segments",
      "string.tlds.allow":
        "The email must have a valid top-level domain (.com or .net)",
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least one lowercase letter, one uppercase letter, and one digit",
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
    }),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(schema),
  });

  // const [error, setError] = useState("");
  // const { signUp } = useAuth();
  // const navigate = useNavigate();

  const onSubmit = async () => {
    const data = getValues();
    console.log(data);
  };

  return (
    <div className=" bg-black/50 shadow rounded-lg sm:px-10 w-1/3 py-12 px-5">
      <h3 className="text-white font-bold text-start mb-8 text-xl">LOGIN</h3>
      <form
        className="mx-auto text-white text-center min-w-max"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-field mb-4 text-start">
          <Input
            type="email"
            nameInput="email"
            nameTitle="Email"
            register={register}
            error={errors.email?.message}
            placeholder={"Email"}
          />
        </div>

        <div className="form-field mb-4 text-start">
          <Input
            type="password"
            nameInput="password"
            nameTitle="Password"
            register={register}
            error={errors.password?.message}
            placeholder={"Password"}
          />
        </div>

        <div className="submit-area mb-5">
          <button className="form-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </div>
      </form>
      <div className="flex items-center gap justify-center h-5">
        <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Do you have an account?
        </p>
        <div className="mx-1"></div>
        <NavLink to="/login" className="text-blue-500 hover:underline mb-1">
          Register
        </NavLink>
      </div>
    </div>
  );
};
