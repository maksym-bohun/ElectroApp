import { Link, NavLink, useParams } from "react-router-dom";
import defaultPhoto from "./../../images/user.png";
import { useEffect, useState } from "react";
import classes from "./UsersAdverts.module.css";
import GoodsItem from "../advertismentsList/Goods/GoodsItem";
import Spinner from "../UI/Spinner";
import { CiUser, CiPhone, CiMail } from "react-icons/ci";

const UsersAdverts = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data.user);
      });
  }, []);

  if (Object.keys(user).length !== 0) {
    return (
      <>
        <main className={classes.main}>
          <div className={classes["info-container"]}>
            <img
              src={user.photo || defaultPhoto}
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
              <NavLink to={`/products/${product.id}`}>
                <GoodsItem
                  key={product.id}
                  image={product.images[0]}
                  name={product.name}
                  technicalInfo={product.technicalInfo}
                  price={product.price}
                  adress={product.location.description}
                  phoneNumber={user.phoneNumber}
                  id={product.id}
                />
              </NavLink>
            ))}
          </div>
        </main>
      </>
    );
  } else return <Spinner className={classes.spinner} />;
};

export default UsersAdverts;
