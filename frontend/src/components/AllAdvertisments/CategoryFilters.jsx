import { useEffect, useState } from "react";
import classes from "./AllAdvertismentsPage.module.css";

const CategoryFilters = ({ onGetFilters, setFiltersLoaded, style }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const checkItemHandler = (e) => {
    if (e.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, e.target.name]);
    } else {
      setCheckedItems((prevItems) => {
        prevItems = prevItems.filter((item) => item !== e.target.name);
        return [...prevItems];
      });
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

  useEffect(() => {
    if (categories.length !== 0) {
      setFiltersLoaded(true);
    }
  }, [categories]);

  useEffect(() => {
    onGetFilters(checkedItems);
  }, [checkedItems]);

  return (
    <div className={classes["categories-container"]} style={style}>
      <h2>Категорії</h2>
      <ul>
        {categories.map((category, i) => (
          <li key={category.name}>
            <input
              id={"category-filter-" + i}
              name={category.name}
              type="checkbox"
              onChange={checkItemHandler}
            />
            <label htmlFor={"category-filter-" + i}>{category.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilters;
