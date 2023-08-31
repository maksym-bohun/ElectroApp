import classes from "./AdvertismentPage.module.css";
import Button from "../UI/Button";
import { BiChat, BiPhone } from "react-icons/bi";
import { useState } from "react";

const AdvertismentPageSellersInfo = ({ seller }) => {
  const [showNumber, setShowNumber] = useState(false);
  console.log(seller);

  return (
    <div className={classes.info}>
      <div className={classes["sellers-info"]}>
        <img
          className={classes["user-image"]}
          src={seller.image || require("../../images/user.png")}
        />
        <div className={classes["name-container"]}>
          <p>{seller.name}</p>

          <Button className={classes["follow-btn"]}>Follow</Button>
        </div>
      </div>

      <Button
        className={
          showNumber
            ? `${classes["info-btn"]} ${classes["number-shown"]}`
            : classes["info-btn"]
        }
        onClick={() => setShowNumber(true)}
      >
        <BiPhone size={24} />
        {showNumber ? `+380${seller.phoneNumber}` : "Phone number"}
      </Button>
      <Button className={classes["info-btn"]}>Order with verification</Button>
      <a href="#">Seller's advertisments</a>
    </div>
  );
};

export default AdvertismentPageSellersInfo;
