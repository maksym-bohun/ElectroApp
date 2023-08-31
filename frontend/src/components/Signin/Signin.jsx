import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./Signin.module.css";
import { useRef, useState } from "react";
import { signin } from "../../store/UserIsLoggedReducer";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const jsonBody = JSON.stringify({
      login:
        !isNaN(parseFloat(email.current.value)) && isFinite(email.current.value)
          ? +email.current.value
          : email.current.value,
      password: password.current.value,
    });

    const res = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
      method: "POST",
      body: jsonBody,
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
    // document.cookie = `jwt=${data.token}; expires=${data.tokenExpires}`;
  };

  return (
    <div>
      <Navigation />
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Вхід</h2>
        <div className={classes.actions}>
          <div className={classes["input-contaner"]}>
            <label htmlFor="email-input">Електрона пошта</label>
            <input
              id="email-input"
              // type="email"
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
        </div>
        <button>Увійти</button>
        <div className={classes.registration}>
          Або <Link to={"/registration"}>зареєструватись</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
