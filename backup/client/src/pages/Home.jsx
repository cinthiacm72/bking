import { useLocation } from "react-router-dom";
import { useState } from "react";
import FeaturedCities from "../components/FeaturedCities";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import MailList from "../components/MailList";
import MainHeadline from "../components/MainHeadline";
import MainMenu from "../components/MainMenu";
import PropertiesType from "../components/PropertiesType";
import HeaderSlider from "../components/HeaderSlide";

import { DateRange } from "react-date-range";
import TopRankingCities from "../components/TopRankingCities";
import Widgets from "../components/Widgets";

const Home = () => {
  return (
    <>
      <header className='main-header'>
        <MainMenu />
        <MainHeadline />
        <HeaderSlider />
      </header>

      <section className='container-fluid-lg margin-top-x-lg'>
        <FeaturedCities />
        {/* <Widgets /> */}
        <PropertiesType />
        <TopRankingCities />
        <FeaturedProperties />
      </section>
      <MailList />
      <Footer />
    </>
  );
};

export default Home;
