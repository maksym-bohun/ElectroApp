import Navigation from "../navigation/Navigation";
import TechnicalInformation from "../technicalInformation/TechnicalInformation";
import classes from "./CreateAdvertismentPage.module.css";
import CreateAdvertismentForm from "./CreateAdvertismentForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdvertisment } from "../../store/ProductsReducer";
import { BsPatchCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CreateAdvertismentPage = (props) => {
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({});
  const [technicalInfoData, setTechnicalInfoData] = useState({});
  const [technicalInfoFull, setTechnicalInfoFull] = useState(false);
  const [formIsFull, setFormIsFull] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [advPublished, setAdvPublished] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state) => state.userIsLoggedReducer.userIsLogged
  );

  useEffect(() => {
    setAdvPublished(false);
  }, []);

  useEffect(() => {
    console.log("FORM", formData);
    console.log("TECHNICAL", technicalInfoData);
  }, [technicalInfoData, formData]);

  const getTechnicalInformation = (technicalInfo, isFull) => {
    console.log(technicalInfo, isFull);
    setTechnicalInfoFull(isFull);
    setTechnicalInfoData(technicalInfo);
  };

  // const onChangeCategory = (category) => {
  //   setCategory(category);
  // };

  const getDataHandler = (data) => {
    setFormData(data);
    console.log("FORM DATA", data);
  };

  const publishHandler = async (e) => {
    e.preventDefault();
    console.log("FORM DATA", formData);

    const token = localStorage.getItem("token");
    const categoryRes = await fetch(
      `http://127.0.0.1:8000/api/v1/categories/${formData.category.toLowerCase()}`
    );
    const categoryData = await categoryRes.json();
    const category = categoryData.data.id;
    const imagesArray = formData.images.map((img) => img.url);
    console.log(imagesArray);

    const productBody = JSON.stringify({
      name: formData.name,
      price: formData.price,
      category,
      description: formData.description,
      technicalInfo: technicalInfoData,
      location: { description: formData.city, coordinates: [0, 0] },
      images: imagesArray,
    });

    const res = await fetch("http://127.0.0.1:8000/api/v1/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: productBody,
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setAdvPublished(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
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
        </div>
      )}
    </>
  );
};

export default CreateAdvertismentPage;
