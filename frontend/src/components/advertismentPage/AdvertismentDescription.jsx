import classes from "./AdvertismentDescription.module.css";
import { FaHryvnia, FaBalanceScale } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const AdvertismentDescription = ({ name, price, adress, description }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.headline}>
          <h3>{name}</h3>
          <div>
            <AiOutlineHeart
              color="#313131"
              size={42}
              className={classes.icon}
            />
          </div>
        </div>
        <h4 className={classes.price}>
          {price} <FaHryvnia />
        </h4>
        <h5 className={classes.location}>{adress}</h5>
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default AdvertismentDescription;
