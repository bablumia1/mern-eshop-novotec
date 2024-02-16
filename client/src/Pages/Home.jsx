import { Fragment } from "react";
import Banner from "../components/Home/Banner";
import CategoriesSlider from "../components/Home/CategoriesSlider";
import HomeProducts from "../components/Home/HomeProducts";

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <CategoriesSlider />
      <HomeProducts />
    </Fragment>
  );
};

export default Home;
