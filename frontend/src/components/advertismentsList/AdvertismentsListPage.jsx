import classes from "./AdvertismentsListPage.module.css";
import Navigation from "../navigation/Navigation";
import Button from "../UI/Button";
import GoodsList from "./Goods/GoodsList";
import TechnicalInformation from "../technicalInformation/TechnicalInformation";
import { useNavigate, useParams } from "react-router-dom";
import { DUMMY_CATEGORIES } from "../../data/data";
import { useEffect, useState } from "react";
import CityAutoComplete from "../CityAutoComplete/CityAutoComplete";

const AdvertismentsList = ({ category }) => {
  const [filters, setFilters] = useState([]);
  const [city, setCity] = useState(
    <h2 className={classes["heading-secondary"]}>Вся Україна</h2>
  );

  const [goodsList, setGoodsList] = useState(<GoodsList />);
  const params = useParams();
  const navigate = useNavigate();

  const changeCityHandler = () => {
    setCity(
      <CityAutoComplete
        type={"advertisments-page"}
        onCloseInput={closeInputHandler}
      />
    );
  };

  const closeInputHandler = (city) => {
    setCity(<h2 className={classes["heading-secondary"]}>{city}</h2>);
  };

  const techInfo = DUMMY_CATEGORIES.filter(
    (currentCategory) => currentCategory.name === params.category
  )[0].technicalInfo;

  const getFilters = (filters) => {
    setFilters(filters);
  };

  const setLoadingHandler = (load) => {
    console.log(load);
  };

  useEffect(() => {
    setGoodsList(
      <GoodsList filters={filters} city={city} setLoading={setLoadingHandler} />
    );
  }, [filters, city]);

  return (
    <>
      <Navigation />

      <div className={classes.container}>
        <div className={classes["left-bar"]}>
          <div className={classes.location}>
            {city}
            <Button className={classes.btn} onClick={changeCityHandler}>
              Change filter
            </Button>
          </div>
          <TechnicalInformation filters={techInfo} getFilters={getFilters} />
        </div>
        <div className={classes["right-bar"]}>
          <div className={classes["category-container"]}>
            <div>{params.category.replaceAll("0", " ")}</div>
            <Button onClick={() => navigate("/")}>Change category</Button>
          </div>
          {goodsList}
        </div>
      </div>
    </>
  );
};

export default AdvertismentsList;
