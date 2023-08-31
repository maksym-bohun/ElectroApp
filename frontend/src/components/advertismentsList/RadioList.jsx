import { useState } from "react";
import classes from "./CheckboxList.module.css";

const RadioList = ({ array, setCheckedRadioHandler, uniqueId }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const changeRadioHandler = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    setCheckedRadioHandler(e.target);
  };

  return (
    <ul className={classes.list}>
      {array.map((item, i) => {
        return (
          <li key={item + (Math.random() * 100).toFixed(2)}>
            <label
              className={classes.label}
              htmlFor={`radio-input-${uniqueId}-${i}`}
            >
              <div>
                <input
                  type="radio"
                  id={`radio-input-${uniqueId}-${i}`}
                  name={`radio-input-${uniqueId}`}
                  value={item}
                  onChange={changeRadioHandler}
                  checked={selectedValue === item}
                />
                {item}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default RadioList;
