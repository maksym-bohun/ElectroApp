import React, { useRef, useState } from "react";
import { DUMMY_CATEGORIES } from "./data/data";
import Navigation from "./components/navigation/Navigation";
import CityAutoComplete from "./components/CityAutoComplete/CityAutoComplete";
import DragAndDropImage from "./DragAndDropImage/DragAndDropImage";
import TechnicalInformation from "./components/technicalInformation/TechnicalInformation";

const Test = () => {
  const [file, setFile] = useState(null);
  const name = useRef();
  const currentCategory = useRef();
  const price = useRef();
  const description = useRef();
  const [cityisValid, setCityisValid] = useState(false);
  const [cityName, setCityName] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const publishHandler = () => {};

  const changeFormHandler = () => {};

  const changeCategoryHandler = () => {};

  const getTechnicalInformation = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("Выберите файл для отправки");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Данные успешно отправлены");
        // Дополнительная логика после успешной отправки
      } else {
        console.error("Ошибка при отправке данных");
        // Обработка ошибки
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  return (
    <>
      <Navigation />
    </>
  );
};

export default Test;
