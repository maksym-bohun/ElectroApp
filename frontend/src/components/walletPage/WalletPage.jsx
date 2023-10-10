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

const WalletPage = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const navigate = useNavigate();
  const currentUserFromLoader = useLoaderData();

  const currentUser = useSelector((state) => {
    console.log("current user in state: ", state.currentUserReducer.user);
    return state.currentUserReducer.user;
  });

  const editProfileHandler = () => {
    console.log("UUSSEERR", user);
    // navigate("/editProfile", { user: user });
    navigate("/editProfile", { someData: "This is some data" });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      if (Object.values(currentUser).length !== 0) {
        console.log(1);
        setUser(currentUser);
        setProducts(currentUser.products);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUser(currentUserFromLoader);
        setProducts(currentUserFromLoader.products);
        setUserIsLogged(true);
      }
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
            {/* <h2>Ваші оголошення</h2> */}
            {/* <div className={classes["adverts-container"]}>
              {products && products.length === 0 ? (
                <div className={classes["emptyAds"]}>
                  <p>У вас ще немає оголошень</p>
                  <span>
                    <AiOutlineFrown size={24} />
                  </span>
                </div>
              ) : (
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
                })
              )}
            </div> */}
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
