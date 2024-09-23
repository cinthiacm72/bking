import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faStar,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import MainHeadline from "./MainHeadline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import Logout from "../pages/Logout";

const MainMenu = ({ section }) => {
  const { user } = useContext(AuthContext);
  //console.log("USER:", user);

  const { dates, options } = useContext(SearchContext);

  const navigate = useNavigate();

  /*   const getDatesInRage = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }; */

  //const allDates = getDatesInRage(dates[0].startDate, dates[0].endDate);

  //console.log(allDates);

  /*   const handleCancelReservation = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/rooms/availability/${roomId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
          },
          body: JSON.stringify(allDates),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }; */

  return (
    <>
      {section === "auth" ? (
        ""
      ) : (
        <section className='banner fs-tiny text-light-darken bg-dark'>
          <p>
            <span className='bold'>
              Save 10% or more on over 100,000 hotels with Member Prices.
            </span>
            Also, members save up to 30% when you add a hotel to a flight.
          </p>
        </section>
      )}

      <section className='menu container-fluid-x-lg'>
        <nav
          className={
            section === "auth"
              ? "main-menu margin-bottom-md padding-top-sm padding-bottom-md"
              : "main-menu padding-top-sm "
          }>
          <ul className='menu-list reset-list margin-bottom-sm'>
            <li className='menu-item '>
              <NavLink
                to='/'
                style={{
                  display: "block",
                  overflow: "hidden",
                  transform: "scale(0.8)  rotate(-12deg)",
                  transformOrigin: "bottom left",
                }}>
                <img
                  src='./../assets/imgs/logo-bking.svg'
                  alt='Logo Bking'
                  style={{ width: "100px" }}
                />
                <span className='fs-x-tiny text-light'>
                  Booking Holdings Inc
                </span>
              </NavLink>
            </li>
            {user ? (
              <div className='user-profile'>
                <img
                  src={user.image || "../assets/imgs/default-avatar.png"}
                  alt='Profile image'
                />
                <p className='fs-x-tiny'>{user.username}</p>
                <Logout />
              </div>
            ) : (
              <>
                <li className='menu-item'>
                  <NavLink
                    to='/login'
                    className='button-small-accent fs-tiny bold text-white'>
                    Login
                  </NavLink>
                </li>

                <li className='menu-item'>
                  <NavLink
                    to='/register'
                    className='button-small-accent fs-tiny bold text-white'>
                    Rergister
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        {section === "auth" ? (
          " "
        ) : (
          <nav className='sub-menu margin-bottom-x-lg'>
            <ul className='sub-menu-list reset-list '>
              <li className='sub-menu-item'>
                <NavLink to='/'>
                  <FontAwesomeIcon icon={faBed} />
                  Stays
                </NavLink>
              </li>
              <li className='sub-menu-item'>
                <NavLink to='/flights'>
                  <FontAwesomeIcon icon={faPlane} />
                  Flights
                </NavLink>
              </li>
              <li className='sub-menu-item'>
                <NavLink to='/flights'>
                  <FontAwesomeIcon icon={faCar} />
                  Car rentals
                </NavLink>
              </li>
              <li className='sub-menu-item'>
                <NavLink to='/flights'>
                  <FontAwesomeIcon icon={faStar} />
                  Attractions
                </NavLink>
              </li>
              <li className='sub-menu-item'>
                <NavLink to='/flights'>
                  <FontAwesomeIcon icon={faTaxi} />
                  Taxis
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </section>
    </>
  );
};

export default MainMenu;
