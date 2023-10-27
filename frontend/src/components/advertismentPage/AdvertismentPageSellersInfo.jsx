import classes from "./AdvertismentPage.module.css";
import Button from "../UI/Button";
import { BiChat, BiPhone } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../Chat/Chat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getMeRoute } from "../../utils/APIRoutes";

const AdvertismentPageSellersInfo = ({ seller, advertisementId }) => {
  const [showNumber, setShowNumber] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const params = useParams();
  const currentUserFromState = useSelector(
    (state) => state.currentUserReducer.user
  );

  const navigate = useNavigate();

  const phoneNumberHandler = () => {
    setShowNumber(true);
  };

  const getMe = async () => {
    const res = await fetch(getMeRoute, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();

    setCurrentUser(data.data);
  };

  useEffect(() => {
    if (
      currentUserFromState &&
      Object.values(currentUserFromState).length !== 0
    ) {
      setCurrentUser(currentUserFromState);
    } else {
      getMe();
    }
  }, []);

  useEffect(() => {
    if (showNumber)
      fetch(
        `http://127.0.0.1:8000/api/v1/products/addPhoneNumberView/${params.advertismentId}`
      );
  }, [showNumber]);

  const openChat = async () => {
    if (currentUser && currentUser._id !== seller._id) {
      navigate(`/chat/${advertisementId}`);
    } else {
      toast(`Це ваше оголошення!`, {
        position: "bottom-right",
        type: "warning",
      });
    }
  };

  return (
    <div className={classes.info}>
      <div className={classes["sellers-info"]}>
        <img
          className={classes["user-image"]}
          src={
            require(`../../../../backend/images/users/${seller.photo}`) ||
            require("../../images/user.png")
          }
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
      <Button className={classes["info-btn"]} onClick={openChat}>
        Send message
      </Button>
      <Link to={`/users/${seller._id}`} state={seller}>
        Seller's advertisments
      </Link>
      {showChat && socket && (
        <Chat username="Maks" socket={socket} room={room} />
      )}
      <ToastContainer />
    </div>
  );
};

export default AdvertismentPageSellersInfo;
