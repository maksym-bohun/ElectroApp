import React, { useState, useEffect } from "react";
import classes from "./CityAutoComplete.module.css";

const CityAutoComplete = ({
  setCityisValid,
  setCityName,
  type = "new-advertisment",
  onCloseInput,
  inputClassName,
  placeholder = "Місто",
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (type !== "advertisments-page") {
      if (suggestions.some((suggestion) => suggestion.name.uk === value)) {
        setCityName(value);
        setCityisValid(true);
      } else setCityisValid(false);
    }
  }, [value]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Medniy2000/ua_locations/master/json/ua_locations_10_11_2021.json"
      );
      const data = await response.json();
      const filteredSuggestions = data
        .filter((item) => item.type === "CITY" || item.type === "VILLAGE")
        .sort((a, b) => a.name.uk.localeCompare(b.name.uk));

      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filtered = inputValue
      ? suggestions.filter((city) => {
          if (city === "Вся Україна") return;
          return city.name.uk.toLowerCase().includes(inputValue.toLowerCase());
        })
      : suggestions;

    setFilteredSuggestions(filtered);
  };

  const handleItemClick = (city) => {
    if (city === "Вся Україна") setValue("Вся Україна");
    else setValue(city.name.uk);
    setFilteredSuggestions([]);
    if (type === "advertisments-page") {
      if (city === "Вся Україна") onCloseInput("Вся Україна");
      else onCloseInput(city.name.uk);
    }
  };

  const list =
    type === "new-advertisment" ? (
      filteredSuggestions.map((city) => (
        <li key={city.id} onClick={() => handleItemClick(city)}>
          {city.name.uk}
        </li>
      ))
    ) : (
      <>
        <li key={"All Ukraine"} onClick={() => handleItemClick("Вся Україна")}>
          {"Вся Україна"}
        </li>
        {filteredSuggestions.map((city) => {
          return (
            <li key={city.id} onClick={() => handleItemClick(city)}>
              <span>{city.name.uk}</span>{" "}
              <span>{` (${city["post_code"][0]})`}</span>
            </li>
          );
        })}
      </>
    );

  return (
    <div
      className={
        type === "new-advertisment"
          ? classes.container
          : `${classes.container} ${classes["container-big"]}`
      }
    >
      <input
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${classes.input} ${inputClassName}`}
      />
      {filteredSuggestions.length > 0 && (
        <ul className={classes.suggestions}>{list}</ul>
      )}
    </div>
  );
};

export default CityAutoComplete;
