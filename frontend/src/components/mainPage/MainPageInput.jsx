import { CiSearch } from "react-icons/ci";
import classes from "./MainPageInput.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom";

const MainPageInput = () => {
  const [inputValue, setInputValue] = useState("");

  const changeInputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = () => {};

  return (
    <form className={classes.container} onSubmit={submitHandler}>
      <label className={`input-icon ${classes.label}`}>
        <CiSearch size={28} htmlFor="input" color="#1d2023" />
        <input
          type="text"
          placeholder="Введіть назву товару"
          name="input"
          className={classes.input}
          onChange={changeInputHandler}
        />
      </label>
      <NavLink to={"./allAdvertisments"} state={{ inputValue: inputValue }}>
        <Button type="submit">Пошук</Button>
      </NavLink>
    </form>
  );
};

export default MainPageInput;
