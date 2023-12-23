import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../components/Input.jsx";
import { Message } from "../components/Message.jsx";
import { useAuth } from "../context/authContext.jsx";

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
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[a-zA-Z\d@$!%*?&.]{8,}$/
    )
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

  const navigate = useNavigate();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();

  const onSubmit = async () => {
    const data = getValues();
    await signin(data);
    if (isAuthenticated) {
      navigate("/chat");
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/chat");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      {loginErrors.map((error, i) => (
        <Message message={error} key={i} />
      ))}
      <form
        className="text-white text-center bg-black/50 shadow rounded-lg sm:px-10 w-full max-w-md py-6 px-5 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-white font-semibold mb-3 text-center text-xl sm:text-2xl">
          Login
        </h3>
        <div className="form-field text-start">
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
          <button className="form-btn bg-blue-500 hover:bg-blue-700 text-white uppercase font py-3 px-6 rounded sm:py-2 sm:px-4">
            Login
          </button>
        </div>
        <div className="flex items-center gap justify-center h-5">
          <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Do you not have an account?
          </p>
          <div className="mx-1"></div>
          <NavLink
            to="/register"
            className="text-blue-500 hover:underline mb-1"
          >
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
};
