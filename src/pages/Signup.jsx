import { joiResolver } from "@hookform/resolvers/joi";
import Input from "../components/Input.jsx";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { Message } from "../components/Message.jsx";

export const Signup = () => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.base": "Invalid input for name",
      "string.min": "Name should have at least 3 characters",
      "string.empty": "Name is required",
    }),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.base": "Invalid input for email",
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email address",
        "string.minDomainSegments":
          "Email should have at least 2 domain segments",
        "string.tlds.allow":
          "Email must have a valid top-level domain (.com or .net)",
      }),

    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[a-zA-Z\d@$!%*?&.]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain special characters, numbers and uppercase letters",
        "string.min": "Password should be at least 8 characters long",
        "string.empty": "Password is required",
      }),
  });

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
  const { signup, errors: registerErrors } = useAuth();

  const onSubmit = async () => {
    const data = getValues();
    await signup(data);
    if (!registerErrors) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {registerErrors.map((error, i) => (
        <Message message={error} key={i} />
      ))}
      <form
        className="text-white text-center bg-black/50 shadow rounded-lg sm:px-10 w-full max-w-md py-6 px-5 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <h3 className="text-white font-semibold mb-3 text-center text-xl sm:text-2xl">
          Register
        </h3>
        <div className="form-field text-start">
          <Input
            type="name"
            nameInput="name"
            nameTitle="Name"
            register={register}
            error={errors.name?.message}
            placeholder={"Name"}
          />
        </div>
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
            signup
          </button>
        </div>
        <div className="flex items-center gap justify-center h-5">
          <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Do you have an account?
          </p>
          <div className="mx-1"></div>
          <NavLink to="/" className="text-blue-500 hover:underline mb-1">
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};
