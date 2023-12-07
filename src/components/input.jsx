/* eslint-disable react/prop-types */
const Input = ({
  type,
  nameInput,
  nameTitle,
  placeholder,
  register,
  error,
}) => {
  // Agrega una clase específica si hay un error
  const inputClass = error ? "border-red-500" : "";

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {nameTitle}
      </label>
      <input
        type={type}
        name={nameInput}
        className={`mt-1 p-2 w-full border rounded-md ${inputClass} focus:outline-none focus:border-indigo-500 focus:ring-1 mb-1 bg-black`}
        placeholder={placeholder}
        {...register(nameInput, {
          required: { value: true, message: "This field is required" },
        })}
      />
      {error ? (
        <div className="error-container ">
          {/* <i className={error ? "error-icon" : "error-icon-disabled"}>
            <AiFillExclamationCircle />
          </i> */}
          <p className="text-red-500 ">{error}</p>
        </div>
      ) : (
        <div className="error-container-disabled">
          {/* <i className={error ? "error-icon" : "error-icon-disabled"}>
            <AiFillExclamationCircle />
          </i> */}
          <p className="text-transparent">Esto es un error transparente</p>
        </div>
      )}
    </div>
  );
};
export default Input;
