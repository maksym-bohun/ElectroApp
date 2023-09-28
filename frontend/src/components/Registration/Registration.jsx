import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "../Signin/Signin.module.css";
import { useRef, useState } from "react";
import DragAndDropImage from "../../DragAndDropImage/DragAndDropImage";
import DnDImage from "../../DragAndDropImage/DnDImage";
import axios from "axios";

const Registration = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");
  const [registrationFinished, setRegistrationFinished] = useState(false);
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();
  const username = useRef();
  const phoneNumber = useRef();

  const setImagesToForm = (image) => {
    console.log(image);
    setImage(image);
  };

  const submitRegistrationHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", username.current.value);
    formData.append("password", password.current.value);
    formData.append("passwordConfirm", password.current.value);
    formData.append("phoneNumber", phoneNumber.current.value);
    formData.append("email", email.current.value);

    formData.append("photo", image);

    try {
      console.log("Start");
      const res = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        navigate("/wallet");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <Navigation />
      <form
        className={`${classes.form} ${classes["reg-form"]}`}
        onChange={() => {
          setErrorMessage("");
        }}
      >
        <h2>Реєстрація</h2>
        {showError && <div className={classes.error}>{errorMessage}</div>}
        <div className={classes["actions-container"]}>
          <div>
            <div className={classes["input-contaner"]}>
              <label htmlFor="email-input">Електрона пошта</label>
              <input
                id="email-input"
                type="email"
                placeholder="Email"
                ref={email}
              />
            </div>

            <div className={classes["input-contaner"]}>
              <label htmlFor="password-input">Пароль</label>
              <input
                id="password-input"
                type="password"
                placeholder="Password"
                ref={password}
              />
            </div>

            <div className={classes["input-contaner"]}>
              <label htmlFor="username-input">Ім'я користувача</label>
              <input
                id="username-input"
                type="text"
                placeholder="Username"
                ref={username}
              />
            </div>
            <div className={classes["input-contaner"]}>
              <label htmlFor="">Номер телефону</label>
              <input type="tel" ref={phoneNumber} />
            </div>
          </div>

          <DragAndDropImage
            className={classes["image-container"]}
            setImagesToForm={setImagesToForm}
            type="registration"
            name="photo"
          />
        </div>

        <button onClick={submitRegistrationHandler}>Зареєструватись</button>
        <div className={classes.registration}>
          Або <Link to={"/signin"}>увійти</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
