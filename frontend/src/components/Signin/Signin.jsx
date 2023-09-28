import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./Signin.module.css";
import { useRef, useState } from "react";
import { signin } from "../../store/UserIsLoggedReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/currentUserReducer";
import { ThreeDots } from "react-loader-spinner";

const SignIn = ({ className }) => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [requestIsLoading, setRequestIsLoading] = useState(false);
  const formClassName = requestIsLoading
    ? `${classes.form} ${classes["form-loading"]}`
    : classes.form;
  const submitHandler = async (e) => {
    e.preventDefault();
    const jsonBody = JSON.stringify({
      login:
        !isNaN(parseFloat(email.current.value)) && isFinite(email.current.value)
          ? +email.current.value
          : email.current.value,
      password: password.current.value,
    });
    setRequestIsLoading(true);
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
      fetch(`http://127.0.0.1:8000/api/v1/users/me`, {
        headers: { Authorization: "Bearer " + data.data.token },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(setUser(data.data.user));
          console.log("DATA DATA USEEEER", data.data.user);
          setRequestIsLoading(false);
          navigate("/wallet");
        });
    } else {
      console.log(data);
      setRequestIsLoading(false);
    }
    // document.cookie = `jwt=${data.token}; expires=${data.tokenExpires}`;
  };

  return (
    <div className={className}>
      <Navigation />
      <form className={formClassName} onSubmit={submitHandler}>
        {requestIsLoading && (
          <div className={classes.spinner}>
            <ThreeDots
              height="40"
              width="60"
              // radius="3"
              color="#1a1b1d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}

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

        <button disabled={requestIsLoading}>Увійти</button>
        <div className={classes.registration}>
          Або <Link to={"/registration"}>зареєструватись</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
