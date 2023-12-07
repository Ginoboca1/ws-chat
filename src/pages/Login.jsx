import Joi from "joi";
import { Button } from "../components/button";
import Input from "../components/input";
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { NavLink /* useNavigate */ } from "react-router-dom";

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }) // comprueba que tenga formato email.
    .required() // tiene que ser obligatorio
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
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) // regex comprueba que sea alfanumerico
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least one lowercase letter, one uppercase letter, and one digit",
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
    }),
});

export function Login() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // evento
    resolver: joiResolver(schema), // toma los mensajes de error
  });

  return (
    <div className="relative h-11 w-full min-w-[200px]">
      <h2 className="mb-5 text-xl uppercase font-semibold">Login</h2>
      <form
        action=""
        method="post"
        className="flex flex-col gap-6 w-72 mx-auto mb-5"
      >
        <Input
          type={"email"}
          nameInput={"email"}
          placeholder={"Email"}
          nameTitle={"Email"}
          register={register}
          error={errors.email?.message}
          className={
            "h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          }
        />
        <Input
          type={"password"}
          nameInput={"password"}
          placeholder={"Password"}
          nameTitle={"Password"}
          register={register}
          error={errors.password?.message}
          className={
            "h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          }
        />
        <Button
          type={"submit"}
          titleButton={"Login"}
          className={"bg-gray-800 px-10 text-white"}
        />
      </form>
      <p>
        You dont have an account?{" "}
        <NavLink to="/register" className="hover:underline">
          Create one here
        </NavLink>
      </p>
    </div>
  );
}
