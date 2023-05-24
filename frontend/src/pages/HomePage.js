import React from "react";
import styles from "../style/styles";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Hero from "../components/main/Hero/Hero";
import Categories from "../components/main/categories/Categories";
import BestDeals from "../components/main/bestdeals/BestDeals";
import FeaturedProduct from "../components/main/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events.js";
import Sponsored from "../components/main/Sponsored/Sponsored.js";
const HomePage = () => {
  return (
    <div>
      <Header activeHeader={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
