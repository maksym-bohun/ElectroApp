import classes from "./CategoryItem.module.css";
import { Link } from "react-router-dom";

const CategoryItem = ({ icon, name, id }) => {
  return (
    <li className={classes.item}>
      <Link to={id} className={classes.link}>
        <div className={classes.icon}>{icon}</div>
      </Link>
      <div className={classes.name}>{name}</div>
    </li>
  );
};

export default CategoryItem;
