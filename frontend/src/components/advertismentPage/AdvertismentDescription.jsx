import classes from "./AdvertismentDescription.module.css";
import { FaHryvnia, FaBalanceScale } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdvertismentDescription = ({ name, price, adress, description, id }) => {
  const [postIsLiked, setPostIsLiked] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const params = useParams();

  const likeHandler = () => {
    setPostIsLiked(!postIsLiked);
  };

  useEffect(() => {
    if (firstLoad === true) {
      setFirstLoad(false);
      fetch("http://127.0.0.1:8000/api/v1/users/me", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPostIsLiked(
            data.data.user.likedProducts.includes(params.advertismentId)
          );
        });
    } else if (firstLoad === false) {
      if (!postIsLiked) {
        fetch(`http://127.0.0.1:8000/api/v1/products/dislikeProduct/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } else {
        fetch(`http://127.0.0.1:8000/api/v1/products/likeProduct/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    }
  }, [postIsLiked]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.headline}>
          <h3>{name}</h3>
          <div>
            {!postIsLiked && (
              <AiOutlineHeart
                color="#313131"
                size={42}
                className={classes.icon}
                onClick={likeHandler}
              />
            )}
            {postIsLiked && (
              <AiFillHeart
                color="#313131"
                fill="#f29f10"
                stroke="#313131"
                size={42}
                className={classes.icon}
                onClick={likeHandler}
              />
            )}
          </div>
        </div>
        <h4 className={classes.price}>
          {price} <FaHryvnia />
        </h4>
        <h5 className={classes.location}>{adress}</h5>
        <h3 className={classes["description-header"]}>Опис</h3>
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default AdvertismentDescription;
