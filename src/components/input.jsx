const input = ({
  type,
  nameInput,
  nameTitle,
  className /*register, error*/,
}) => {
  return (
    <div>
      <label>{nameTitle}</label>
      <input type={type} name={nameInput} className={className} />
      {/* {...register(nameInput, {
        required: { value: true, message: "This field is required" },
      })} */}
    </div>
  );
};

export default input;
