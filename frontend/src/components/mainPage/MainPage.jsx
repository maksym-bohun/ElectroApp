import Navigation from "../navigation/Navigation";
import CategoriesList from "./CategoriesList";
import MainPageInput from "./MainPageInput";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <MainPageInput />
      <CategoriesList />
    </>
  );
};

export default MainPage;
