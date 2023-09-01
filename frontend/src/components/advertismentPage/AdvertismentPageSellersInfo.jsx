import classes from "./AdvertismentPage.module.css";
import Button from "../UI/Button";
import { BiChat, BiPhone } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const AdvertismentPageSellersInfo = ({ seller }) => {
  const [showNumber, setShowNumber] = useState(false);
  console.log(seller);
  const params = useParams();

  const phoneNumberHandler = () => {
    setShowNumber(true);
  };

  useEffect(() => {
    if (showNumber)
      fetch(
        `http://127.0.0.1:8000/api/v1/products/addPhoneNumberView/${params.advertismentId}`
      );
  }, [showNumber]);

  return (
    <div className={classes.info}>
      <div className={classes["sellers-info"]}>
        <img
          className={classes["user-image"]}
          src={seller.photo || require("../../images/user.png")}
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
        onClick={phoneNumberHandler}
      >
        <BiPhone size={24} />
        {showNumber ? `+380${seller.phoneNumber}` : "Phone number"}
      </Button>
      <Button className={classes["info-btn"]}>Order with verification</Button>
      <Link to={`/users/${seller._id}`}> Seller's advertisments</Link>
    </div>
  );
};

export default AdvertismentPageSellersInfo;
