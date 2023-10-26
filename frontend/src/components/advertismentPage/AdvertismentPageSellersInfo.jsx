import classes from "./AdvertismentPage.module.css";
import Button from "../UI/Button";
import { BiChat, BiPhone } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../Chat/Chat";
import { useSelector } from "react-redux";

const AdvertismentPageSellersInfo = ({ seller, advertisementId }) => {
  const [showNumber, setShowNumber] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const navigate = useNavigate();

  const phoneNumberHandler = () => {
    setShowNumber(true);
  };

  useEffect(() => {
    if (showNumber)
      fetch(
        `http://127.0.0.1:8000/api/v1/products/addPhoneNumberView/${params.advertismentId}`
      );
  }, [showNumber]);

  const openChat = async () => {
    try {
      navigate(`/chat/${advertisementId}`);
      //   const res = await fetch("http://127.0.0.1:8000/api/v1/chats", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //     body: JSON.stringify({
      //       users: [
      //         { user_id: seller._id, role: "seller" },
      //         { user_id: currentUser._id, role: "user" },
      //       ],
      //       advertisement_id: params.advertismentId,
      //       created_at: new Date(Date.now()),
      //     }),
      //   });

      // const data = await res.json();
      // console.log("DATA ", data);
      // if (data.status === "success") {
      //   setShowChat(true);
      //   setSocket(
      //     io.connect(`http://127.0.0.1:8000/api/v1/chats/${data.chat._id}`)
      //   );
      //   setRoom(data.chat._id);
      // }
    } catch (err) {
      console.log(err);
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
    </div>
  );
};

export default AdvertismentPageSellersInfo;
