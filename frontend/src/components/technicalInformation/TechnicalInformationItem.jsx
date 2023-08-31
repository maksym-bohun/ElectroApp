import CheckboxList from "../advertismentsList/CheckboxList";
import RadioList from "../advertismentsList/RadioList";
import classes from "./TechnicalInformationItem.module.css";

const TechnicalInformationItem = ({
  filtersInfo,
  type = "checkbox",
  uniqueId,
  setFilterHandler,
  setCheckboxesFilter,
}) => {
  const setCheckedRadioHandler = (radio) => {
    setFilterHandler({ filter: filtersInfo.title, value: radio.value });
  };

  const setCheckedCheckboxesHandler = (checkedItems) => {
    setCheckboxesFilter({ filter: filtersInfo.title, items: checkedItems });
  };

  return (
    <div>
      <h4 className={classes.title}>{filtersInfo.title}</h4>
      {type === "radio" ? (
        <RadioList
          array={filtersInfo.array}
          uniqueId={uniqueId} // add unique ID to RadioList component
          setCheckedRadioHandler={setCheckedRadioHandler}
        />
      ) : (
        <CheckboxList
          array={filtersInfo.array}
          setCheckedItemsHandler={setCheckedCheckboxesHandler}
        />
      )}
    </div>
  );
};

export default TechnicalInformationItem;
