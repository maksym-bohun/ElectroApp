import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Button from "../UI/Button";
import classes from "./WalletPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/UserIsLoggedReducer";
import AdvertismentsList from "./../advertismentsList/AdvertismentsListPage";
import jwt_decode from "jwt-decode";
import defaultUserImage from "./../../images/user.png";
import GoodsItem from "../advertismentsList/Goods/GoodsItem";
import SignIn from "../Signin/Signin";
import { AiOutlineEdit } from "react-icons/ai";
import Spinner from "../UI/Spinner";

const WalletPage = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUserReducer.user);
  const userIsLogged = useSelector(
    (state) => state.userIsLoggedReducer.userIsLogged
  );

  const editProfileHandler = () => {};

  useEffect(() => console.log(isLoading), [isLoading]);

  useEffect(() => {
    if (Object.values(currentUser).length !== 0) {
      setUser(currentUser);
      setProducts(currentUser.products);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      console.log("else");
      const token = localStorage.getItem("token");
      const id = jwt_decode(token).id;
      fetch("http://127.0.0.1:8000/api/v1/users/me", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("FINISH");
          setIsLoading(false);
          setUser(data.data.user);
          setProducts(data.data.user.products);
        });
    }
  }, [currentUser]);

  const logoutHandler = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
  };

  if (localStorage.getItem("token") === "") {
    return (
      <>
        <SignIn className={classes.signin} />
      </>
    );
  }

  console.log(products);

  return (
    <>
      <Navigation />
      {isLoading && <Spinner className={classes.spinner} />}
      {!isLoading && (
        <div className={classes.wrapper}>
          <div className={classes["info-wrapper"]}>
            <div>
              <img
                src={user.photo || defaultUserImage}
                alt="user-image"
                className={classes["user-img"]}
              />
              <div className={classes["edit-btn"]} onClick={editProfileHandler}>
                {" "}
                <AiOutlineEdit size={20} /> <span>Редагувати профіль</span>{" "}
              </div>
            </div>
            <div>
              <div>{user.name}</div>
              <div>+380{user.phoneNumber}</div>
              <button className={classes["logout-btn"]} onClick={logoutHandler}>
                Вийти
              </button>
            </div>
          </div>
          <div className={classes.advertisments}>
            <h2>Ваші оголошення</h2>
            <div className={classes["adverts-container"]}>
              {products &&
                products.map((product) => {
                  return (
                    <GoodsItem
                      key={product.id}
                      image={product.images[0]}
                      name={product.name}
                      technicalInfo={product.technicalInfo}
                      price={product.price}
                      adress={product.location.description}
                      phoneNumber={user.phoneNumber}
                      id={product.id}
                      type="wallet"
                      stats={{
                        views: product.views,
                        phoneNumberViews: product.phoneNumberViews,
                        likes: product.likes,
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletPage;
