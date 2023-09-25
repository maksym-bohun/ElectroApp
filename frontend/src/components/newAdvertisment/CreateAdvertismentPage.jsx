import Navigation from "../navigation/Navigation";
import TechnicalInformation from "../technicalInformation/TechnicalInformation";
import classes from "./CreateAdvertismentPage.module.css";
import CreateAdvertismentForm from "./CreateAdvertismentForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdvertisment } from "../../store/ProductsReducer";
import { BsPatchCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { DUMMY_CATEGORIES } from "../../data/data";
import axios from "axios";

const CreateAdvertismentPage = (props) => {
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({});
  const [technicalInfoData, setTechnicalInfoData] = useState({});
  const [technicalInfoFull, setTechnicalInfoFull] = useState(false);
  const [formIsFull, setFormIsFull] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [advPublished, setAdvPublished] = useState(false);
  const [file, setFile] = useState();

  const navigate = useNavigate();
  let categories = useSelector(
    (state) => state.categoriesReducer.categories.payload
  );

  if (categories === undefined) {
    categories = DUMMY_CATEGORIES;
  }

  const isLoggedIn = useSelector(
    (state) => state.userIsLoggedReducer.userIsLogged
  );

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8000/api/v1/products", formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    setAdvPublished(false);
  }, []);

  const getTechnicalInformation = (technicalInfo, isFull) => {
    console.log(technicalInfo, isFull);
    setTechnicalInfoFull(isFull);
    setTechnicalInfoData(technicalInfo);
  };

  const getDataHandler = (data) => {
    setFormData(data);
  };

  const publishHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const category = categories.filter(
      (item) => item.name.toLowerCase() === formData.category.toLowerCase()
    )[0].id;

    const imagesArray = formData.images.map((img) => img.url);

    const productBody = JSON.stringify({
      name: formData.name,
      price: formData.price,
      category,
      description: formData.description,
      technicalInfo: technicalInfoData,
      location: { description: formData.city, coordinates: [0, 0] },
      images: imagesArray,
    });

    console.log("start fetching");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: productBody,
      });

      upload();

      const data = await res.json();
      if (data.status === "success") {
        setAdvPublished(true);
      }
    } catch (err) {
      console.log(err);
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
