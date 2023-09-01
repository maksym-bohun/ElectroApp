import { RotatingLines } from "react-loader-spinner";
import classes from "./Spinner.module.css";

const Spinner = ({ className }) => {
  return (
    <div className={`${classes.spinner} ${className}`}>
      <RotatingLines
        strokeColor="#343639"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
