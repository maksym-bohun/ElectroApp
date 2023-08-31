import GoodsItem from "./GoodsItem";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./../AdvertismentsListPage.module.css";
import Spinner from "../../UI/Spinner";

const GoodsList = ({ filters, city }) => {
  const params = useParams();
  const [productFilters, setProductFilters] = useState([]);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [productsArray, setProductsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  let includesFilters;

  useEffect(() => {
    if (city) {
      if (city.props.children !== "Вся Україна") {
        setCityFilter(city.props.children);
      } else {
        setCityFilter("");
      }
    }

    fetch(
      `http://127.0.0.1:8000/api/v1/categories/${params.category.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductsArray(data.data.products);
        setLoading(false);
        if (data.data.products.length === 0) setListIsEmpty(true);
      });
  }, [city]);

  useEffect(() => {
    console.log(productsArray);
  }, [productsArray]);

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
                    return (
                      <NavLink
                        to={item.id}
                        style={{ textDecoration: "none", color: "#000" }}
                        key={item.id}
                      >
                        <GoodsItem
                          name={item.name}
                          image={item.images[0]}
                          technicalInfo={item.technicalInfo}
                          adress={item.location.description}
                          price={item.price}
                          phoneNumber={item.author.phoneNumber}
                          id={item.id}
                        />
                      </NavLink>
                    );
                  }
                } else {
                  if (
                    includesFilters.length > 0 &&
                    includesFilters.every((filter) => filter === true) &&
                    cityFilter === item.adress
                  ) {
                    return (
                      <NavLink
                        to={item.id}
                        style={{ textDecoration: "none", color: "#000" }}
                        key={item.id}
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
