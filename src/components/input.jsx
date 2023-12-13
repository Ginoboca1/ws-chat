/* eslint-disable react/prop-types */
import { AiFillExclamationCircle } from "react-icons/ai";

const Input = ({
  type,
  nameInput,
  nameTitle,
  placeholder,
  register,
  error,
}) => {
  const inputClass = error ? "border-red-500" : "border-none";

  return (
    <div className="text-md w-full">
      <label className="block mb-2 file:font-medium text-gray-900 dark:text-white">
        {nameTitle}
      </label>
      <input
        type={type}
        name={nameInput}
        className={`w-full p-2 border rounded-md ${inputClass} focus:outline-none focus:border-indigo-500 focus:ring-1 bg-black/40`}
        placeholder={placeholder}
        {...register(nameInput, {
          required: { value: true, message: "This field is required" },
        })}
      />
      <div
        className="flex gap-2  items-center mx-2"
        style={{ width: "15rem", height: "4rem" }}
      >
        <i className={error ? "text-red-500" : "text-transparent"}>
          <AiFillExclamationCircle />
        </i>
        <p className={error ? "text-red-500 text-sm " : "text-transparent"}>
          {error
            ? error
            : "The password must contain at special characters, numbers and mayus"}
        </p>
      </div>
    </div>
  );
};
export default Input;
