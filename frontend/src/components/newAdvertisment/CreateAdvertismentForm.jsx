import classes from "./CreateAdvertismentPage.module.css";
import { DUMMY_CATEGORIES } from "../../data/data";
import { useEffect, useRef, useState } from "react";
import DragAndDropImage from "../../DragAndDropImage/DragAndDropImage";
import CityAutoComplete from "../CityAutoComplete/CityAutoComplete";
import DnDImage from "../../DragAndDropImage/DnDImage";

const CreateAdvertismentForm = ({
  onChangeCategory,
  setFormIsFull,
  returnData,
}) => {
  const [images, setImages] = useState([]);
  const [formIsFilled, setFormIsFilled] = useState(false);
  const [cityIsValid, setCityisValid] = useState(false);
  const [cityName, setCityName] = useState("");
  const currentCategory = useRef();
  const name = useRef();
  const price = useRef();
  const description = useRef();

  useEffect(() => console.log("images ", images), [images]);

  const changeCategoryHandler = (e) => {
    onChangeCategory(
      DUMMY_CATEGORIES.filter((category) => category.name === e.target.value)[0]
    );
  };

  const changeFormHandler = () => {
    setFormIsFilled(false);
    console.log(
      currentCategory.current.value.trim().length > 0 &&
        currentCategory.current.value.length !== "Category" &&
        name.current.value.trim().length > 0 &&
        price.current.value.trim().length > 0
    );
    if (
      currentCategory.current.value.trim().length > 0 &&
      currentCategory.current.value.length !== "Category" &&
      name.current.value.trim().length > 0 &&
      price.current.value.trim().length > 0 &&
      cityIsValid &&
      images.length > 0
    ) {
      setFormIsFilled(true);
      returnData({
        category: currentCategory.current.value,
        name: name.current.value,
        price: price.current.value,
        city: cityName,
        description: description.current.value,
        images: images,
      });
    }
  };

  useEffect(() => {
    setFormIsFull(formIsFilled);
  }, [formIsFilled]);

  return (
    <form onChange={changeFormHandler}>
      <div className={classes.wrapper}>
        <div className={classes.form}>
          <input
            type="text"
            placeholder="Назва"
            className={classes["name-input"]}
            ref={name}
          />
          <select
            name="category"
            id="selectCategory"
            placeholder="Category"
            defaultValue={"Категорія"}
            className={classes["category-select"]}
            ref={currentCategory}
            onChange={changeCategoryHandler}
          >
            <option name="category-option" disabled={true}>
              Категорія
            </option>
            {DUMMY_CATEGORIES.map((category) => (
              <option key={category.name} name={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className={classes["price-box"]}>
            <input
              type="number"
              placeholder="Ціна"
              className={classes["price-input"]}
              min={0}
              ref={price}
            />

            <CityAutoComplete
              setCityisValid={setCityisValid}
              setCityName={setCityName}
            />
            {/* <div>
              <input type="checkbox" id="trade" />
              <label htmlFor="trade">Trade</label>
            </div> */}
          </div>
        </div>

        <div>
          <DragAndDropImage setImagesToForm={setImages} />
        </div>
        {/* <div>
          <DnDImage setImagesToForm={setImages}/>
        </div> */}
      </div>
      <div className={classes.description}>
        <label or="description">Опис:</label>

        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          ref={description}
        ></textarea>
      </div>
    </form>
  );
};

export default CreateAdvertismentForm;
