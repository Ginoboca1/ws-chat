/* eslint-disable react/prop-types */
export const Input = ({
  type,
  nameInput,
  nameTitle,
  className,
  placeholder,
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
      {error ? (
        <div className="error-container">
          {/* <i className={error ? "error-icon" : "error-icon-disabled"}>
            <AiFillExclamationCircle />
          </i> */}
          <p>{error}</p>
        </div>
      ) : (
        <div className="error-container-disabled">
          {/* <i className={error ? "error-icon" : "error-icon-disabled"}>
            <AiFillExclamationCircle />
          </i> */}
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
