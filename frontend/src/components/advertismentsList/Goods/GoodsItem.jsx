import classes from "./GoodsItem.module.css";
import { FaHryvnia, FaEye } from "react-icons/fa";
import { AiOutlineHeart, AiOutlinePhone, AiOutlineEye } from "react-icons/ai";

const GoodsItem = ({
  image,
  name,
  technicalInfo,
  price,
  adress,
  phoneNumber,
  type,
  stats,
  id,
}) => {
  let img;
  if (image) {
    img = require(`../../../../../backend/images/products/${image}`);
  } else {
    img =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
  }
  console.log("ADRESS", adress);
  console.log("IMAGE", image);

  if (type === "wallet") {
    return (
      <li className={classes.item}>
        <div className={classes.container}>
          <div className={classes["image-container"]}>
            <img src={img} className={classes.image} />
          </div>
          <div className={classes.info}>
            <h3>{name}</h3>
            <div>
              {Object.values(technicalInfo).map((info) => (
                <div key={info + (Math.random() * 100).toFixed(2)}>
                  <span>{info}</span>
                  {","}
                  &nbsp;
                </div>
              ))}
            </div>
          </div>
          <div className={classes["price-box"]}>
            <h3>
              {price} <FaHryvnia />
            </h3>
            <div>{adress}</div>
          </div>
        </div>
        <div className={classes["statistics-info"]}>
          <h3>Статистика: </h3>
          <div>
            <AiOutlineEye size={24} />
            <span>{stats.views || 0}</span>
          </div>
          <div>
            <AiOutlineHeart size={24} />
            <span>{stats.likes || 0}</span>
          </div>
          <div>
            <AiOutlinePhone size={24} />
            <span>{stats.phoneNumberViews || 0}</span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={classes.item}>
      <div className={classes.container}>
        <div className={classes["image-container"]}>
          <img src={img} className={classes.image} />
        </div>
        <div className={classes.info}>
          <h3>{name}</h3>
          <div>
            {Object.values(technicalInfo).map((info) => (
              <div key={info + (Math.random() * 100).toFixed(2)}>
                <span>{info}</span>
                {","}
                &nbsp;
              </div>
            ))}
          </div>
        </div>
        <div className={classes["price-box"]}>
          <h3>
            {price} <FaHryvnia />
          </h3>
          <div>{adress}</div>
          <div>{"+380" + phoneNumber}</div>
        </div>
      </div>
    </li>
  );
};

export default GoodsItem;
