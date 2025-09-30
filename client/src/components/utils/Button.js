const Button = ({ onClick, title, nameClass }) => {
  return (
    <button className={`btn ${nameClass}`} onClick={onClick}>
      {title}
    </button>
  );
};
export default Button;
