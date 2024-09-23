import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MainHeadline from "./MainHeadline";

const MainMenu = ({ section }) => {
  return (
    <header
      className={
        section === "hotels"
          ? "main-header padding-top-sm padding-bottom-sm"
          : "main-header padding-top-sm padding-bottom-lg"
      }>
      <div className='container-fluid-lg'>
        <nav className='main-menu margin-bottom-md'>
          <ul className='menu-items reset-list '>
            <li className='menu-item'>
              <p className='logo fs-large bold'>HolaBooking</p>
            </li>
            <li className='menu-item'>
              <button>Register</button>
            </li>
            <li className='menu-item'>
              <button>Login</button>
            </li>
          </ul>
        </nav>
        <nav className='sub-menu margin-bottom-md'>
          <ul className='sub-menu-items reset-list '>
            <li className='sub-menu-item active'>
              <FontAwesomeIcon icon={faBed} />
              <span className='fs-small'>Stays</span>
            </li>
            <li className='sub-menu-item'>
              <FontAwesomeIcon icon={faPlane} />
              <span className='fs-small'>Flights</span>
            </li>
            <li className='sub-menu-item'>
              <FontAwesomeIcon icon={faCar} />
              <span className='fs-small'>Car rentals</span>
            </li>
            <li className='sub-menu-item'>
              <FontAwesomeIcon icon={faBed} />
              <span className='fs-small'>Attractions</span>
            </li>
            <li className='sub-menu-item'>
              <FontAwesomeIcon icon={faTaxi} />
              <span className='fs-small'>Airport taxis</span>
            </li>
          </ul>
        </nav>
        {/* {section !== "hotels" && <MainHeadline />} */}
      </div>
    </header>
  );
};

export default MainMenu;
