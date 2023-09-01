import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "../Signin/Signin.module.css";
import { useRef, useState } from "react";
import DragAndDropImage from "../../DragAndDropImage/DragAndDropImage";
import DnDImage from "../../DragAndDropImage/DnDImage";

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

  const submitRegistrationHandler = async (e) => {
    e.preventDefault();

    const registrationBody = JSON.stringify({
      name: username.current.value,
      password: password.current.value,
      passwordConfirm: password.current.value,
      phoneNumber: phoneNumber.current.value,
      email: email.current.value,
      photo: image[0].url,
    });

    try {
      console.log();
      const res = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
        method: "POST",
        body: registrationBody,
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        navigate("/wallet");
      }
    } catch (err) {
      console.log("ERROR 💥 ", err);
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
            setImagesToForm={setImage}
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
