import classes from "./CategoriesList.module.css";
import CategoryItem from "./CategoryItem";
import { DUMMY_CATEGORIES } from "../../data/data";

const CategoriesList = () => {
  return (
    <>
      <h2 className={classes["heading-secondary"]}>Categories</h2>
      <div className={classes.container}>
        <ul className={classes.list}>
          {DUMMY_CATEGORIES.map((item) => (
            <CategoryItem
              icon={item.icon}
              name={item.name}
              key={item.name}
              id={item.name.split(" ").join("0")}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesList;
