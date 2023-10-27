import { useLoaderData, useLocation, useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./AdvertismentPage.module.css";
import AdvertismentDescription from "./AdvertismentDescription";
import AdvertismentPageSellersInfo from "./AdvertismentPageSellersInfo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import Spinner from "../UI/Spinner";
import { setProducts } from "../../store/ProductsReducer";

const AdvertismentPage = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const location = useLocation();
  const params = useParams();
  const products = useSelector((state) => state.productsReducer.products);
  let seller = null;
  const product = useLoaderData();

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/v1/products/viewAdvertisment/${params.advertismentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });

  useEffect(() => {
    setCurrentProduct(product);
    setIsLoading(false);

    // if (products === null) {
    //   setIsLoading(true);
    //   fetch(`http://127.0.0.1:8000/api/v1/products/${params.advertismentId}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setCurrentProduct(data.data);
    //       seller =
    //         location.state === null ? data.data.author : location.state.author;
    //       setIsLoading(false);
    //     });
    // } else {
    //   const product = products.filter(
    //     (prod) => prod.id === params.advertismentId
    //   )[0];
    //   setCurrentProduct(product);
    //   seller = location.state === null ? product : location.state.author;
    //   setIsLoading(false);
    // }
  }, [products]);

  useEffect(() => {
    if (currentProduct) {
      currentProduct.images.forEach((img) => {
        setImages((prevImage) => [
          ...prevImage,
          require(`../../../../backend/images/products/${img}`),
        ]);
      });
    }
  }, [currentProduct]);

  if (currentProduct) {
    if (params.category === "allAdvertisments") {
      const id =
        location.pathname.split("/")[location.pathname.split("/").length - 1];
    } else {
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
                <AdvertismentDescription
                  {...currentProduct}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>
              <AdvertismentPageSellersInfo
                seller={seller || currentProduct.author}
                advertisementId={params.advertismentId}
              />
            </div>
          </div>
        )}
      </>
    );
  }
};

export default AdvertismentPage;

export const advertismentPageLoader = async ({ params }) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/v1/products/${params.advertismentId}`
  );
  const data = await res.json();
  return data.data;
};
