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
    <div className="mb-5 text-md">
      <label className="block mb-2 file:font-medium text-gray-900 dark:text-white">
        {nameTitle}
      </label>
      <input
        type={type}
        name={nameInput}
        className={`mt-1 p-2 w-full border rounded-md ${inputClass} focus:outline-none focus:border-indigo-500 focus:ring-1 mb-1 bg-black/40`}
        placeholder={placeholder}
        {...register(nameInput, {
          required: { value: true, message: "This field is required" },
        })}
      />
      <div className="flex gap-2 mt-2 items-center">
        <i className={error ? "text-red-500" : "text-transparent"}>
          <AiFillExclamationCircle />
        </i>
        <p className={error ? "text-red-500" : "text-transparent"}>
          {error ? error : "this is a error"}
        </p>
      </div>
    </div>
  );
};
export default Input;