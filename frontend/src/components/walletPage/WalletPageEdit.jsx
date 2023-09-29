import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./WalletPage.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultUserImage from "./../../images/user.png";
import Spinner from "../UI/Spinner";
import { setUser } from "../../store/currentUserReducer";

const WalletPageEdit = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const currentUserState = useSelector((state) => {
    console.log("GETTING USER FROM STATE");
    return state.currentUserReducer.user;
  });
  const imageRef = useRef();
  const dispatch = useDispatch();
  const userData = useLocation();

  console.log("Current USer", userData);

  const updateUser = () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    console.log("setIsLoading");
    fetch("http://127.0.0.1:8000/api/v1/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCurrentUser(data.data.user);
          setName(data.data.user.name);
          setPhoneNumber(data.data.user.phoneNumber);
          dispatch(setUser(data.data.user));
          console.log("✅✅✅✅✅✅✅✅✅✅✅");
          setIsLoading(false);
        } else {
          console.log("❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️");
          setIsLoading(false);
          navigate("/signin");
        }
      });
  };

  const submitHandler = async () => {
    const formData = new FormData();

    console.log("name", name);
    if (image) {
      formData.append("photo", image);
      console.log("Image appended");
    }
    if (phoneNumber.length > 0) formData.append("phoneNumber", phoneNumber);
    if (name.length > 0) formData.append("name", name);

    const token = localStorage.getItem("token");

    try {
      console.log("Start");
      const response = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.ok) {
        updateUser();
        console.log("Data loaded successful");
        setTimeout(() => navigate("/wallet"), 1000);
      } else {
        console.error("An error occured");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const changePhoneNumber = (e) => {
    const inputText = e.target.value.slice(4);
    if (!/^\d*$/.test(inputText)) {
      return;
    }

    setPhoneNumber(inputText);
  };

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const selectFiles = () => {
    imageRef.current.click();
  };

  const onFileSelect = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  return (
    <>
      <Navigation />
      {isLoading && <Spinner className={classes.spinner} />}
      {!isLoading && (
        <div className={classes.wrapper}>
          <div className={classes["info-wrapper"]}>
            <div>
              <img
                src={
                  require(`../../../../backend/images/users/${currentUser.photo}`) ||
                  defaultUserImage
                }
                alt="user-image"
                className={classes["user-img--edit"]}
              />
              <button
                type="button"
                onClick={selectFiles}
                className={`${classes.btn} ${classes["btn--small"]}`}
              >
                Змінити фото
              </button>
              <input
                type="file"
                className={classes.hidden}
                ref={imageRef}
                onChange={onFileSelect}
                name="photo"
              />
            </div>
            <div>
              <div className={classes["change-phone-number"]}>
                <label htmlFor="name">Імʼя:</label>
                <input
                  id="name"
                  maxLength={13}
                  value={name}
                  onChange={changeNameHandler}
                />
              </div>

              <div className={classes["change-phone-number"]}>
                <label htmlFor="phone-number">Номер телефону:</label>
                <input
                  id="phone-number"
                  maxLength={13}
                  value={`+380${phoneNumber}`}
                  onChange={changePhoneNumber}
                />
              </div>
              {/* <button className={classes["logout-btn"]} onClick={logoutHandler}>
                Вийти
              </button> */}
            </div>
          </div>
          <button onClick={submitHandler}>Submit</button>
        </div>
      )}
    </>
  );
};

export default WalletPageEdit;
