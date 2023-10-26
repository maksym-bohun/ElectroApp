import { useLoaderData, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Button from "../UI/Button";
import classes from "./WalletPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultUserImage from "./../../images/user.png";
import { AiOutlineEdit, AiOutlineFrown } from "react-icons/ai";
import Spinner from "../UI/Spinner";
import WalletProducts from "./WalletProducts";
import { getMeRoute } from "../../utils/APIRoutes";

const WalletPage = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => {
    console.log("current user in state: ", state.currentUserReducer?.user);
    return state.currentUserReducer.user;
  });

  const editProfileHandler = () => {
    console.log("UUSSEERR", user);
    // navigate("/editProfile", { user: user });
    navigate("/editProfile", { someData: "This is some data" });
  };

  const fetchMe = async () => {
    console.log("Fetch me");
    const res = await fetch(getMeRoute, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    console.log("DAAAATAAA", data);
    setUser(data.data);
    setProducts(data.data.products);

    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("data.data", data.data);
    // });

    setIsLoading(false);
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === ""
    ) {
      setIsLoading(false);
      navigate("/signin");
    }

    if (localStorage.getItem("token") !== "") {
      if (currentUser && Object.values(currentUser).length !== 0) {
        console.log(1);
        setUser(currentUser);
        setProducts(currentUser.products);
        setIsLoading(false);
      } else {
        fetchMe();
      }
      //  else {
      //   setIsLoading(false);
      //   console.log("currentUserFromLoader", currentUserFromLoader);
      //   setUser(currentUserFromLoader);
      //   setProducts(currentUserFromLoader.products);
      //   setUserIsLogged(true);
      // }
    } else {
      navigate("/signin");
    }
  }, [currentUser]);

  const logoutHandler = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
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
                  require(`../../../../backend/images/users/${user.photo}`) ||
                  defaultUserImage
                }
                alt="user-image"
                className={classes["user-img"]}
              />
              <div className={classes["edit-btn"]} onClick={editProfileHandler}>
                <AiOutlineEdit size={20} /> <span>Редагувати профіль</span>
              </div>
            </div>
            <div>
              <div>{user.name}</div>
              <div>+380{user.phoneNumber}</div>
              <button className={classes["btn"]} onClick={logoutHandler}>
                Вийти
              </button>
            </div>
          </div>
          <div className={classes.advertisments}>
            {console.log("products: ", products)}
            <WalletProducts
              usersAdverts={products}
              user={user}
              likedProducts={user?.likedProducts}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WalletPage;
