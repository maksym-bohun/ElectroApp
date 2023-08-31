import classes from "./GoodsItem.module.css";
import { FaHryvnia, FaEye } from "react-icons/fa";
import { AiOutlineHeart, AiOutlinePhone, AiOutlineEye } from "react-icons/ai";

const GoodsItem = ({
  image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
  name,
  technicalInfo,
  price,
  adress,
  phoneNumber,
  type,
  stats,
  id,
}) => {
  if (type === "wallet") {
    return (
      <li className={classes.item}>
        <div className={classes.container}>
          <div className={classes["image-container"]}>
            <img src={image} className={classes.image} />
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
            <span>111</span>
          </div>
          <div>
            <AiOutlineHeart size={24} />
            <span>111</span>
          </div>
          <div>
            <AiOutlinePhone size={24} />
            <span>111</span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={classes.item}>
      <div className={classes.container}>
        <div className={classes["image-container"]}>
          <img src={image} className={classes.image} />
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
