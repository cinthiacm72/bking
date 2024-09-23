/* import { useLocation } from "react-router-dom";
import { useState } from "react"; */
import FeaturedCities from "../components/FeaturedCities";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
/* import MailList from "../components/MailList"; */
import Search from "../components/Search";
import Menu from "../components/Menu";
import PropertiesType from "../components/PropertiesType";
import HeaderSlider from "../components/HeaderSlide";

/* import { DateRange } from "react-date-range"; */
import TopRankingCities from "../components/TopRankingCities";
/* import Widgets from "../components/Widgets"; */

const Home = () => {
  return (
    <>
      <header className='main-header'>
        <Menu />
        <Search />
        <HeaderSlider />
      </header>

      <main className='container-fluid-lg margin-top-x-lg'>
        <FeaturedCities />
        <PropertiesType />
        <TopRankingCities />
        <FeaturedProperties />
      </main>
      <Footer />
    </>
  );
};

export default Home;
