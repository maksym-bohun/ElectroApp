import MainPage from "./components/mainPage/MainPage";
import WalletPage from "./components/walletPage/WalletPage";
import AdvertismentPage from "./components/advertismentPage/AdvertismentPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdvertismentsList from "./components/advertismentsList/AdvertismentsListPage";
import CreateAdvertismentPage from "./components/newAdvertisment/CreateAdvertismentPage";
import DragAndDropImage from "./DragAndDropImage/DragAndDropImage";
import { useSelector } from "react-redux";
import AllAdvertismentsPage from "./components/AllAdvertisments/AllAdvertismentsPage";

import PersonalOffice from "./components/Signin/Signin";
import Registration from "./components/Registration/Registration";
import SignIn from "./components/Signin/Signin";
import DnDImage from "./DragAndDropImage/DnDImage";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
