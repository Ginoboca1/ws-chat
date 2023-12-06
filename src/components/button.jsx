export const button = ({ type, titleButton, className }) => {
  return (
    <div>
      <button type={type} className={className}>
        {titleButton}
      </button>
    </div>
  );
};
