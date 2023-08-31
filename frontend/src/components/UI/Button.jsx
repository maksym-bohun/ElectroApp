import classes from "./Button.module.css";

const Button = ({ children, className, onClick, style, type }) => {
  return (
    <button
      className={`${classes.btn} ${className}`}
      onClick={onClick}
      style={style}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
