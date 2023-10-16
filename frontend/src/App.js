import MainPage from "./components/mainPage/MainPage";
import WalletPage from "./components/walletPage/WalletPage";
import AdvertismentPage, {
  advertismentPageLoader,
} from "./components/advertismentPage/AdvertismentPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdvertismentsList from "./components/advertismentsList/AdvertismentsListPage";
import CreateAdvertismentPage from "./components/newAdvertisment/CreateAdvertismentPage";
import { useDispatch, useSelector } from "react-redux";
import AllAdvertismentsPage, {
  AllAdvertismentsLoader,
} from "./components/AllAdvertisments/AllAdvertismentsPage";
import jwt_decode from "jwt-decode";

import Registration from "./components/Registration/Registration";
import SignIn from "./components/Signin/Signin";
import UsersAdverts from "./components/UsersAdverts/UsersAdverts";
import { useEffect } from "react";
import { setUser } from "./store/currentUserReducer";
import { setProducts } from "./store/ProductsReducer";
import { setCategories } from "./store/СategoriesReducer";
import { setUsers } from "./store/UsersReducer";
import WalletPageEdit from "./components/walletPage/WalletPageEdit";
import Chat from "./components/Chat/Chat";
import JoinChatForm from "./components/Chat/JoinChatForm";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  {
    path: "/wallet",
    element: <WalletPage />,
    loader: async () => {
      const token = localStorage.getItem("token");
      if (token !== "") {
        const res = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("wallet loader", data.data.user);
        return data.data.user || null;
      }
    },
  },
  { path: "/editProfile", element: <WalletPageEdit /> },
  {
    path: "/:category",
    element: <AdvertismentsList />,
  },
  {
    path: "/:category/:advertismentId",
    element: <AdvertismentPage />,
    loader: advertismentPageLoader,
  },
  { path: "/createAdvertisment", element: <CreateAdvertismentPage /> },
  {
    path: "/allAdvertisments",
    element: <AllAdvertismentsPage />,
    loader: AllAdvertismentsLoader,
  },
  { path: "/registration", element: <Registration /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/users/:id", element: <UsersAdverts /> },
  { path: "/chat/:id", element: <Chat /> },
]);

function App() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const productsRes = await fetch("http://127.0.0.1:8000/api/v1/products");
    const categoriesRes = await fetch(
      `http://127.0.0.1:8000/api/v1/categories`
    );
    const usersRes = await fetch("http://127.0.0.1:8000/api/v1/users");

    const products = await productsRes.json();
    const categories = await categoriesRes.json();
    const users = await usersRes.json();

    await dispatch(setProducts(products.data));
    await dispatch(setCategories(categories.data));
    await dispatch(setUsers(users.data.users));

    if (localStorage.getItem("token") !== "") {
      const token = localStorage.getItem("token");
      const id = jwt_decode(token).id;
      const meRes = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const me = await meRes.json();
      await dispatch(setUser(me.data.user));
      console.log("USER LOADED");
    }
  };

  useEffect(() => {
    // fetchData();
    // const intervalId = setInterval(fetchData, 100000);
    // return () => clearInterval(intervalId);
  }, []);

  return <RouterProvider router={router} />;
  // return <JoinChatForm></JoinChatForm>;
}

export default App;
