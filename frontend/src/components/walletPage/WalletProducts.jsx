import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import classes from "./WalletPage.module.css";
import { AiOutlineEdit, AiOutlineFrown } from "react-icons/ai";
import GoodsItem from "../advertismentsList/Goods/GoodsItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WalletProducts = ({ usersAdverts, user, likedProducts }) => {
  const [likedAdverts, setLikedAdverts] = useState([]);

  useEffect(() => {
    likedProducts.map((prodId) => {
      fetch(`http://127.0.0.1:8000/api/v1/products/${prodId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setLikedAdverts((prevAdverts) => [...prevAdverts, data.data]);
          }
        });
    });
  }, []);

  return (
    <Accordion
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <AccordionItem w="80vw">
        <h2>
          <AccordionButton
            bg="#fff"
            border="1px solid #000"
            p="0.5rem"
            borderRadius={5}
          >
            <Box as="span" flex="1" textAlign="left">
              <Text m={0} p={0} as="h2" fontSize={22}>
                Ваші оголошення
              </Text>
            </Box>
            <AccordionIcon fontSize={20} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} display="flex" flexDir="column" gap="10px">
          {usersAdverts && usersAdverts.length === 0 ? (
            <div className={classes["emptyAds"]}>
              <p>У вас ще немає оголошень</p>
              <span>
                <AiOutlineFrown size={24} />
              </span>
            </div>
          ) : (
            usersAdverts.map((product) => {
              return (
                <GoodsItem
                  key={product.id}
                  image={product.images[0]}
                  name={product.name}
                  technicalInfo={product.technicalInfo}
                  price={product.price}
                  adress={product.location.description}
                  phoneNumber={user.phoneNumber}
                  id={product.id}
                  type="wallet"
                  stats={{
                    views: product.views,
                    phoneNumberViews: product.phoneNumberViews,
                    likes: product.likes,
                  }}
                />
              );
            })
          )}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem w="80vw">
        <h2>
          <AccordionButton
            bg="#fff"
            border="1px solid #000"
            p="0.5rem"
            borderRadius={5}
          >
            <Box as="span" flex="1" textAlign="left">
              <Text m={0} p={0} as="h2" fontSize={22}>
                Обрані оголошення
              </Text>
            </Box>
            <AccordionIcon fontSize={20} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} display="flex" flexDir="column" gap="10px">
          {likedAdverts && likedAdverts.length === 0 ? (
            <div className={classes["emptyAds"]}>
              <p>У вас ще немає оголошень</p>
              <span>
                <AiOutlineFrown size={24} />
              </span>
            </div>
          ) : (
            likedAdverts.map((product) => {
              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className={classes.link}
                >
                  <GoodsItem
                    image={product.images[0]}
                    name={product.name}
                    technicalInfo={product.technicalInfo}
                    price={product.price}
                    adress={product.location.description}
                    phoneNumber={user.phoneNumber}
                    id={product.id}
                  />
                </Link>
              );
            })
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default WalletProducts;
