const Button = ({ onClick, title, className }) => {
  return (
    <button className={`btn ${className || ''}`} onClick={onClick}>
      {title}
    </button>
  );
};
export default Button;
