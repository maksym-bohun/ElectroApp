import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./WalletPage.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultUserImage from "./../../images/user.png";
import Spinner from "../UI/Spinner";
import { setUser } from "../../store/currentUserReducer";
import Button from "../UI/Button";

const WalletPageEdit = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberInvalid, setPhoneNumberInvalid] = useState(false);
  const [image, setImage] = useState(defaultUserImage);
  const [currentImage, setCurrentImage] = useState(defaultUserImage);
  const [name, setName] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef();
  const dispatch = useDispatch();

  console.log("Current USer", currentUser);

  useEffect(() => {
    console.log("START UPDATING USER");
    updateUser();
  }, []);

  const checkInputs = (value) => {
    if (value === "name") {
      if (name.length > 0) return true;
      else {
        setNameInvalid(true);
        return false;
      }
    }

    if (value === "phoneNumber") {
      if ((phoneNumber + "").length === 9) return true;
      else {
        setPhoneNumberInvalid(true);
        console.log("PHONE NUMBER INCORRECT", phoneNumber);
        return false;
      }
    }
  };

  const updateUser = (exit = false) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/api/v1/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCurrentUser(data.data);
          setName(data.data.name);
          setPhoneNumber(data.data.phoneNumber);
          if (!exit)
            setCurrentImage(
              require(`../../../../backend/images/users/${data.data.photo}`)
            );
          setPhoneNumber(data.data.phoneNumber);
          dispatch(setUser(data.data));
          console.log("✅✅✅✅✅✅✅✅✅✅✅");
          setCurrentUser(data.data);
          if (exit)
            setTimeout(() => {
              setIsLoading(false);
              navigate("/wallet");
            }, 1000);
          else setIsLoading(false);
        } else {
          console.log("❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️");
          setIsLoading(false);
          navigate("/signin");
        }
      })
      .finally(() => {});
  };

  const submitHandler = async () => {
    const formData = new FormData();

    if (image) {
      formData.append("photo", image);
    }
    if (checkInputs("phoneNumber")) formData.append("phoneNumber", phoneNumber);
    if (checkInputs("name")) formData.append("name", name);

    const token = localStorage.getItem("token");
    if (checkInputs("phoneNumber") && checkInputs("name")) {
      try {
        console.log("Start");
        const response = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Data loaded successful");
          setIsLoading(true);
          updateUser(true);
        } else {
          console.error("An error occured");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
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
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setCurrentImage(URL.createObjectURL(selectedImage));
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
                src={currentImage || defaultUserImage}
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
                  className={nameInvalid ? classes["invalid-input"] : ""}
                />
              </div>

              <div className={classes["change-phone-number"]}>
                <label htmlFor="phone-number">Номер телефону:</label>
                <input
                  id="phone-number"
                  maxLength={13}
                  value={`+380${phoneNumber}`}
                  onChange={changePhoneNumber}
                  className={phoneNumberInvalid ? classes["invalid-input"] : ""}
                />
              </div>
              {/* <button className={classes["logout-btn"]} onClick={logoutHandler}>
                Вийти
              </button> */}
            </div>
          </div>
          <Button onClick={submitHandler} className={classes.btn}>
            Зберегти зміни
          </Button>
        </div>
      )}
    </>
  );
};

export default WalletPageEdit;
