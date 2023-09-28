import GoodsItem from "./GoodsItem";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./../AdvertismentsListPage.module.css";
import Spinner from "../../UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../../store/ProductsReducer";

const GoodsList = ({ filters, city }) => {
  const params = useParams();
  const [productFilters, setProductFilters] = useState([]);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [productsArray, setProductsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  let includesFilters;
  const productsState = useSelector((state) => {
    return state.productsReducer.products;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("productsArray", productsArray);
  }, []);

  useEffect(() => {
    if (city) {
      if (city.props.children !== "Вся Україна") {
        setCityFilter(city.props.children);
      } else {
        setCityFilter("");
      }
    }

    console.log("productsState", productsState);

    if (
      Array.isArray(productsState) &&
      productsState.filter(
        (product) =>
          product.category.name.toLowerCase() === params.category.toLowerCase()
      ).length === 0
    ) {
      setLoading(true);

      fetch(
        `http://127.0.0.1:8000/api/v1/categories/${params.category.toLowerCase()}`
      )
        .then((res) => res.json())
        .then((data) => {
          const reversedArray = [];
          console.log("data data prods", data.data.products);
          data.data.products.forEach((prod) => reversedArray.unshift(prod));
          setProductsArray(reversedArray);
          setLoading(false);
          if (data.data.products.length === 0) {
            setListIsEmpty(true);
          }
          setListIsEmpty(false);
          dispatch(addProducts(data.data.products));
        });
    } else {
      const reversedArray = [];
      productsState
        .filter((prod) => prod.category.name === params.category)
        .forEach((prod) => reversedArray.unshift(prod));
      setProductsArray(reversedArray);
      console.log("reversedArray", reversedArray);
      setListIsEmpty(false);
      if (reversedArray.length === 0) {
        setListIsEmpty(true);
      }
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (filters) {
      if (filters.every((filter) => filter.items.length === 0)) {
        setProductFilters([]);
      }
      filters.map((filter) => {
        if (filter.items.length > 0) {
          if (
            !!productFilters.filter(
              (productFilter) => productFilter.filter === filter.filter
            )[0]
          ) {
            setProductFilters((prevFilters) => {
              const currentIndex = prevFilters.indexOf(
                prevFilters.filter(
                  (checkbox) => checkbox.filter === filter.filter
                )[0]
              );
              prevFilters[currentIndex] = filter;
              return [...prevFilters];
            });
          } else setProductFilters((prevFilters) => [...prevFilters, filter]);
        } else
          setProductFilters((prevFilters) => {
            prevFilters = prevFilters.filter(
              (curFilter) => curFilter.filter !== filter.filter
            );
            return [...prevFilters];
          });
      });
    }
  }, [filters]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <>
          {listIsEmpty && (
            <h2 className={classes["empty-message"]}>
              There is no {params.category.toLowerCase()}!
            </h2>
          )}
          {!listIsEmpty && (
            <>
              {productsArray.map((item) => {
                includesFilters = [];
                if (productFilters.length === 0) includesFilters.push(true);
                productFilters.map((filter) => {
                  if (filter.items.includes(item.technicalInfo[filter.filter]))
                    includesFilters.push(true);
                  else includesFilters.push(false);
                });

                if (cityFilter === "" || cityFilter === "Вся Україна") {
                  if (
                    includesFilters.length > 0 &&
                    includesFilters.every((filter) => filter === true)
                  ) {
                    console.log(
                      "ITEM ❗️❗️❗️❗️❗️❗️",
                      item.location.description
                    );
                    return (
                      <Link
                        to={item.id}
                        style={{ textDecoration: "none", color: "#000" }}
                        key={item.id}
                        state={item}
                      >
                        <GoodsItem
                          name={item.name}
                          image={item.images[0]}
                          adress={item.location.description}
                          technicalInfo={item.technicalInfo}
                          price={item.price}
                          phoneNumber={item.author.phoneNumber}
                          id={item.id}
                        />
                      </Link>
                    );
                  }
                } else {
                  if (
                    includesFilters.length > 0 &&
                    includesFilters.every((filter) => {
                      console.log(cityFilter);
                      return filter === true;
                    }) &&
                    cityFilter !== undefined &&
                    cityFilter.split(" (")[0] === item.location.description
                  ) {
                    return (
                      <Link
                        to={item.id}
                        style={{ textDecoration: "none", color: "#000" }}
                        key={item.id}
                        state={item}
                      >
                        <GoodsItem
                          name={item.name}
                          image={item.images[0]}
                          adress={item.location.description}
                          technicalInfo={item.technicalInfo}
                          price={item.price}
                          phoneNumber={item.author.phoneNumber}
                          id={item.id}
                        />
                      </Link>
                    );
                  }
                }
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GoodsList;
