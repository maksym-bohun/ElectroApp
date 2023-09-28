import Navigation from "../navigation/Navigation";
import TechnicalInformation from "../technicalInformation/TechnicalInformation";
import classes from "./CreateAdvertismentPage.module.css";
import CreateAdvertismentForm from "./CreateAdvertismentForm";
import React, { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CreateAdvertismentPage = (props) => {
  const [category, setCategory] = useState([]);
  const [dataFromForm, setDataFromForm] = useState({});
  const [technicalInfoData, setTechnicalInfoData] = useState({});
  const [technicalInfoFull, setTechnicalInfoFull] = useState(false);
  const [formIsFull, setFormIsFull] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [advPublished, setAdvPublished] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        console.log("FINISHED");
      });
  }, []);

  useEffect(() => {
    setAdvPublished(false);
  }, []);

  const getTechnicalInformation = (technicalInfo, isFull) => {
    console.log(technicalInfo, isFull);
    setTechnicalInfoFull(isFull);
    setTechnicalInfoData(technicalInfo);
  };

  const getDataHandler = (data) => {
    setDataFromForm(data);
    console.log("CITY", data.city);
  };

  const setImagesToForm = (images) => {
    console.log(images);
    const newFiles = [];

    for (let i = 0; i < images.length; i++) {
      newFiles.push(images[i]);
    }

    console.log(newFiles);

    setImages([...newFiles]);
  };

  const publishHandler = async (e) => {
    e.preventDefault();

    console.log(categories);
    const category = categories.filter(
      (item) => item.name.toLowerCase() === dataFromForm.category.toLowerCase()
    )[0].id;

    const formData = new FormData();
    formData.append("name", dataFromForm.name);
    formData.append("city", dataFromForm.city);
    formData.append("category", category);
    formData.append("description", dataFromForm.description);
    formData.append("price", dataFromForm.price);
    formData.append("technicalInfo", JSON.stringify(technicalInfoData));

    for (let i = 0; i < images.length; i++) {
      formData.append("photos", images[i]);
    }

    const token = localStorage.getItem("token");

    try {
      console.log("Start");
      const response = await fetch("http://127.0.0.1:8000/api/v1/products", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.ok) {
        console.log("Data loaded successful");
        setAdvPublished(true);
      } else {
        console.error("An error occured");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === "") {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Navigation />
      {!advPublished && (
        <>
          <form onSubmit={publishHandler}>
            <div className={classes.main}>
              <div className={classes.heading}>Додати оголошення</div>
              {showErrorMessage && (
                <div className={`${classes.heading} ${classes.error}`}>
                  Будь ласка, заповніть всі поля!
                </div>
              )}
              <CreateAdvertismentForm
                onChangeCategory={setCategory}
                setFormIsFull={setFormIsFull}
                returnData={getDataHandler}
                setImagesToForm={setImagesToForm}
              />
              <div className={classes["right-bar"]}>
                <TechnicalInformation
                  filters={category.technicalInfo}
                  type="radio"
                  getTechnicalInformation={getTechnicalInformation}
                />
              </div>
            </div>
            <button className={classes["publish-btn"]} type="submit">
              Опублікувати
            </button>
          </form>
        </>
      )}

      {advPublished && (
        <div className={classes.published}>
          <BsPatchCheck size={80} />
          <div className={classes.heading}>Оголошення опубліковано!</div>
          <div className={classes.heading}>
            Воно з'явиться протягом 15-ти хвилин!
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAdvertismentPage;
