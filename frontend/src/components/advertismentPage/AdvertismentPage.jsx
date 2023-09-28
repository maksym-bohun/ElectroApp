import { useLocation, useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./AdvertismentPage.module.css";
import AdvertismentDescription from "./AdvertismentDescription";
import AdvertismentPageSellersInfo from "./AdvertismentPageSellersInfo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import Spinner from "../UI/Spinner";

const AdvertismentPage = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const location = useLocation();
  const params = useParams();
  const products = useSelector((state) => state.productsReducer.products);
  let seller = null;

  useEffect(() => {
    console.log("LOCATION IN ADVPAGE", location.state);
    if (products === null) {
      setIsLoading(true);
      fetch(`http://127.0.0.1:8000/api/v1/products/${params.advertismentId}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentProduct(data.data);
          seller =
            location.state === null ? data.data.author : location.state.author;
          setIsLoading(false);
        });
    } else {
      const product = products.filter(
        (prod) => prod.id === params.advertismentId
      )[0];
      setCurrentProduct(product);
      seller = location.state === null ? product : location.state.author;
      setIsLoading(false);
    }
  }, [products]);

  useEffect(() => {
    console.log(currentProduct);
    if (currentProduct) {
      currentProduct.images.forEach((img) => {
        setImages((prevImage) => [
          ...prevImage,
          require(`../../../../backend/images/products/${img}`),
        ]);
      });
    }
  }, [currentProduct]);

  // const img = require(`../../../../backend/images/products/${currentProduct.images[0]}`);

  if (currentProduct) {
    if (params.category === "allAdvertisments") {
      const id =
        location.pathname.split("/")[location.pathname.split("/").length - 1];
    } else {
      console.log("CURRENT", currentProduct);
    }

    return (
      <>
        <Navigation />
        {isLoading && <Spinner className={classes.spinner} />}
        {!isLoading && (
          <div className={classes["advertisment-page"]}>
            <div className={classes.container}>
              <div>
                <>
                  <div
                    className={classes["image-container"]}
                    onClick={() => setToggler(!toggler)}
                  >
                    <img
                      src={
                        images[0] ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                      }
                      className={classes.image}
                    />
                  </div>
                  <FsLightbox toggler={toggler} sources={images} />
                </>
                <AdvertismentDescription {...currentProduct} />
              </div>
              <AdvertismentPageSellersInfo
                seller={seller || currentProduct.author}
              />
            </div>
          </div>
        )}
      </>
    );
  }
};

export default AdvertismentPage;
