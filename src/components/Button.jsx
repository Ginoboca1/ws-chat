/* eslint-disable react/prop-types */
export const Button = ({ type, titleButton, className, clickAction }) => {
  return (
    <div>
      <button type={type} className={className} onClick={clickAction}>
        {titleButton}
      </button>
    </div>
  );
};
