import { useLocation, useNavigate } from "react-router-dom";
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

const WalletPage = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const userIsLogged = useSelector(
    (state) => state.userIsLoggedReducer.userIsLogged
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = jwt_decode(token).id;

    fetch(`http://127.0.0.1:8000/api/v1/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data.user);
        setProducts(data.data.user.products);
      });

    setTimeout(() => console.log(user), 2000);
    dispatch({ type: "SIGN_IN" });
  }, []);
  return (
    <>
      <Navigation />
      <div className={classes.wrapper}>
        <div className={classes["info-wrapper"]}>
          <img
            src={user.photo || defaultUserImage}
            alt="user-image"
            className={classes["user-img"]}
          />
          <div>
            <div>{user.name}</div>
            <div>+380{user.phoneNumber}</div>
            <button className={classes["logout-btn"]}>Вийти</button>
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
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
