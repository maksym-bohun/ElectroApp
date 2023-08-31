import { useEffect, useState } from "react";
import classes from "./TechnicalInformation.module.css";
import TechnicalInformationItem from "./TechnicalInformationItem";

const generateUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(10000));
};

const TechnicalInformation = ({
  filters,
  type = "checkbox",
  getTechnicalInformation,
  getFilters,
}) => {
  let filtersObject;

  if (filters) {
    filtersObject = filters.reduce((obj, filter) => {
      obj[filter.title + ""] = null;
      return obj;
    }, {});
  }

  const [createFilters, setCreateFilters] = useState({});
  const [infoIsFull, setInfoIsFull] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    if (
      typeof filtersObject === "object" &&
      Object.keys(createFilters).length === Object.keys(filtersObject).length
    )
      setInfoIsFull(true);
  }, [createFilters]);

  useEffect(() => {
    if (type === "radio") {
      getTechnicalInformation(createFilters, infoIsFull);
    }
  }, [createFilters, infoIsFull]);

  useEffect(() => {
    if (type !== "radio") getFilters(checkboxes);
  }, [checkboxes]);

  const setFilterHandler = (obj) => {
    filtersObject[obj.filter] = obj.value;
    setCreateFilters((prevObject) => {
      return { ...prevObject, [obj.filter]: obj.value };
    });
  };

  const setCheckedCheckboxesHandler = (obj) => {
    if (!!checkboxes.filter((checkbox) => checkbox.filter === obj.filter)[0]) {
      setCheckboxes((prevFilters) => {
        const currentIndex = prevFilters.indexOf(
          prevFilters.filter((checkbox) => checkbox.filter === obj.filter)[0]
        );
        prevFilters[currentIndex] = obj;
        return [...prevFilters];
      });
    } else setCheckboxes((prevFilters) => [...prevFilters, obj]);
  };

  return (
    <div className={classes["technical-info"]}>
      <h2 className={classes["heading-secondary"]}>Технічна інформація</h2>
      <div className={classes.filters}>
        {filters && filters.length > 0
          ? filters.map((filter) => (
              <TechnicalInformationItem
                key={filter.title}
                filtersInfo={filter}
                type={type}
                uniqueId={generateUniqueId()} // add unique ID to TechnicalInformationItem component
                setFilterHandler={setFilterHandler}
                setCheckboxesFilter={setCheckedCheckboxesHandler}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default TechnicalInformation;
