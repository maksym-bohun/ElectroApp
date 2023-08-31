import React, { useEffect, useState } from "react";
import classes from "./CheckboxList.module.css";

const CheckboxList = ({ array, setCheckedItemsHandler }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setCheckedItemsHandler(checkedItems);
  }, [checkedItems]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
  };

  return (
    <ul className={classes.list}>
      {array.map((item, i) => {
        return (
          <li key={item + (Math.random() * 100).toFixed(2)}>
            <label className={classes.label}>
              <input
                type="checkbox"
                value={item}
                checked={checkedItems.includes(item)}
                onChange={handleCheckboxChange}
              />
              <span>{item}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default CheckboxList;
