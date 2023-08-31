import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import GoodsItem from "../advertismentsList/Goods/GoodsItem";
import classes from "./AllAdvertismentsPage.module.css";
import Navigation from "../navigation/Navigation";
import { useEffect, useState } from "react";
import CategoryFilters from "./CategoryFilters";
import Spinner from "../UI/Spinner";

const AllAdvertismentsPage = () => {
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  // console.log(state);
  let location = useLocation();
  let initialProducts;
  const inputValue = location.state.inputValue;

  const setFiltersLoadedHandler = (res) => {
    console.log(res);
    setFiltersLoaded(res);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        const allProductsData = data.data.reduce((accumulator, category) => {
          return accumulator.concat(category.products);
        }, []);
        setProducts(
          allProductsData.filter((product) =>
            product.name.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
        setDefaultProducts(
          allProductsData.filter((product) =>
            product.name.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
        setProductsLoaded(true);
      });
  }, []);

  const getFiltersHandler = (filters) => {
    if (filters.length !== 0) {
      setProducts((prevProducts) => {
        prevProducts = defaultProducts.filter((product) => {
          return filters.includes(product.category.name);
        });
        return [...prevProducts];
      });
    } else {
      setProducts(defaultProducts);
    }
  };

  return (
    <section>
      <Navigation />
      {productsLoaded && filtersLoaded && (
        <div>
          <CategoryFilters
            onGetFilters={getFiltersHandler}
            setFiltersLoaded={setFiltersLoadedHandler}
          />
          {listIsEmpty && (
            <div className={classes["empty-list"]}>Таких оголошень немає!</div>
          )}
          {!listIsEmpty && (
            <div className={classes.list}>
              {products.map((item) => {
                return (
                  <NavLink
                    to={`/allAdvertisments/${item.id}`}
                    style={{ textDecoration: "none", color: "#000" }}
                    key={item.id}
                    state={{ products: products }}
                  >
                    <GoodsItem
                      name={item.name}
                      image={item.image}
                      technicalInfo={item.technicalInfo}
                      adress={item.adress}
                      price={item.price}
                      phoneNumber={item.author.phoneNumber}
                      id={item.id}
                    />
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      )}
      {(!productsLoaded || !filtersLoaded) && (
        <>
          <CategoryFilters
            style={{ display: "none" }}
            onGetFilters={getFiltersHandler}
            setFiltersLoaded={setFiltersLoaded}
          />
          <Spinner />
        </>
      )}
    </section>
  );
};

export default AllAdvertismentsPage;
