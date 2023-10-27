import classes from "./Navigation.module.css";
import { CiUser, CiChat1 } from "react-icons/ci";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import logo from "./../../images/logo.png";

const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <Link to="/" className={classes.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <div className={classes["nav__info"]}>
        <Link to="/createAdvertisment">
          <Button className={classes["nav__button"]}>Add advertisment</Button>
        </Link>
        <Link to="/chats">
          <CiChat1 size={44} color="#1d2023" className={classes["user-icon"]} />
        </Link>

        <Link to="/wallet">
          <CiUser size={44} color="#1d2023" className={classes["user-icon"]} />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
