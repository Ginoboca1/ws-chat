/* eslint-disable react/prop-types */
import { AiFillExclamationCircle } from "react-icons/ai";

const Input = ({
  type,
  nameInput,
  nameTitle,
  placeholder,
  className,
  register,
  error,
}) => {
  return (
    <div>
      <label>{nameTitle}</label>
      <input
        type={type}
        name={nameInput}
        className={className}
        placeholder={placeholder}
        {...register(nameInput, {
          required: { value: true, message: "This field is required" },
        })}
      />
      <div className={error ? "flex gap-2 mt-2 items-center" : "mt-2"}>
        <i className={error ? "text-red-500" : "text-transparent"}>
          <AiFillExclamationCircle
            className={error ? "text-red-500 text-sm" : "text-transparent"}
          />
        </i>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    </div>
  );
};

export default Input;
