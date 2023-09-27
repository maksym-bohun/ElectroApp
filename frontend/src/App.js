import MainPage from "./components/mainPage/MainPage";
import WalletPage from "./components/walletPage/WalletPage";
import AdvertismentPage from "./components/advertismentPage/AdvertismentPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdvertismentsList from "./components/advertismentsList/AdvertismentsListPage";
import CreateAdvertismentPage from "./components/newAdvertisment/CreateAdvertismentPage";
import DragAndDropImage from "./DragAndDropImage/DragAndDropImage";
import { useDispatch, useSelector } from "react-redux";
import AllAdvertismentsPage from "./components/AllAdvertisments/AllAdvertismentsPage";
import jwt_decode from "jwt-decode";

import PersonalOffice from "./components/Signin/Signin";
import Registration from "./components/Registration/Registration";
import SignIn from "./components/Signin/Signin";
import DnDImage from "./DragAndDropImage/DnDImage";
import UsersAdverts from "./components/UsersAdverts/UsersAdverts";
import { useEffect } from "react";
import { setUser } from "./store/currentUserReducer";
import { setProducts } from "./store/ProductsReducer";
import { setCategories } from "./store/СategoriesReducer";
import { setUsers } from "./store/UsersReducer";
import Test from "./Test";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/wallet", element: <WalletPage /> },
  {
    path: "/:category",
    element: <AdvertismentsList />,
  },
  { path: "/:category/:advertismentId", element: <AdvertismentPage /> },
  { path: "/createAdvertisment", element: <CreateAdvertismentPage /> },
  { path: "/allAdvertisments", element: <AllAdvertismentsPage /> },
  { path: "/registration", element: <Registration /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/users/:id", element: <UsersAdverts /> },
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
    console.log("START");
    // fetchData();

    // const intervalId = setInterval(fetchData, 100000);
    // return () => clearInterval(intervalId);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [files, setFiles] = useState([]);
//   const upload = () => {
//     const formData = new FormData();
//     const filesArray = Array.from(files);
//     console.log("files", files);
//     filesArray.forEach((file) => {
//       formData.append("file", file);
//     });
//     axios
//       .post("http://localhost:8000/api/v1/products", formData)
//       .then((res) => {})
//       .catch((er) => console.log(er));
//   };
//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         onChange={(e) => {
//           console.log(e.target.files);
//           setFiles(e.target.files);
//         }}
//       />
//       <button type="button" onClick={upload}>
//         Upload
//       </button>
//     </div>
//   );
// }

// export default App;
