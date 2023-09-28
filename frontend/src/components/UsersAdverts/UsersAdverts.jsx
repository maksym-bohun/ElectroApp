import { Link, useLocation, useParams } from "react-router-dom";
import defaultPhoto from "./../../images/user.png";
import { useEffect, useState } from "react";
import classes from "./UsersAdverts.module.css";
import GoodsItem from "../advertismentsList/Goods/GoodsItem";
import Spinner from "../UI/Spinner";
import { CiUser, CiPhone, CiMail } from "react-icons/ci";
import Navigation from "../navigation/Navigation";
import { useSelector } from "react-redux";

const UsersAdverts = () => {
  const users = useSelector((state) => console.log(state.usersReducer.users));
  const location = useLocation();
  // const params = useParams();
  const [user, setUser] = useState(location.state);

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/api/v1/users/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data.data.user);
  //     });
  // }, []);

  if (Object.keys(user).length !== 0) {
    return (
      <>
        <Navigation />
        <main className={classes.main}>
          <div className={classes["info-container"]}>
            <img
              src={
                require(`../../../../backend/images/users/${user.photo}`) ||
                defaultPhoto
              }
              className={classes["user-img"]}
              alt="Seller photo"
            />
            <div>
              <p>
                <CiUser size={20} /> {user.name}
              </p>
              <p>
                <CiPhone size={20} />
                +380{user.phoneNumber}
              </p>
              <p>
                <CiMail size={20} />
                {user.email}
              </p>
            </div>
          </div>
          <div className={classes["adverts-container"]}>
            <h2>Оголошення</h2>
            {user.products.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <GoodsItem
                  image={product.images[0]}
                  name={product.name}
                  technicalInfo={product.technicalInfo}
                  price={product.price}
                  adress={product.location.description}
                  phoneNumber={user.phoneNumber}
                  id={product.id}
                />
              </Link>
            ))}
          </div>
        </main>
      </>
    );
  } else return <Spinner className={classes.spinner} />;
};

export default UsersAdverts;
