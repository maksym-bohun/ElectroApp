import { useLocation, useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import classes from "./AdvertismentPage.module.css";
import AdvertismentDescription from "./AdvertismentDescription";
import AdvertismentPageSellersInfo from "./AdvertismentPageSellersInfo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";

const AdvertismentPage = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [toggler, setToggler] = useState(false);
  const location = useLocation();
  const params = useParams();
  console.log("PARAMS", params);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/products/${params.advertismentId}`)
      .then((res) => res.json())
      .then((data) => setCurrentProduct(data.data))
      .catch((err) => console.error(err));
  }, []);
  if (currentProduct) {
    if (params.category === "allAdvertisments") {
      const id =
        location.pathname.split("/")[location.pathname.split("/").length - 1];
    } else {
      console.log("CURRENT", currentProduct);
    }

    // console.log(params);
    console.log("currentProduct", currentProduct);

    return (
      <>
        <Navigation />
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
                      currentProduct.images[0] ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                    }
                    className={classes.image}
                  />
                </div>
                <FsLightbox toggler={toggler} sources={currentProduct.images} />
              </>
              <AdvertismentDescription {...currentProduct} />
            </div>
            <AdvertismentPageSellersInfo seller={currentProduct.author} />
          </div>
        </div>
      </>
    );
  }
};

export default AdvertismentPage;
