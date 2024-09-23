import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Widget = ({ type }) => {
  let widgetData = {};

  const {
    data: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/users");

  const {
    data: dataCity,
    loading: loadingCity,
    error: errorCity,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/cities");

  const {
    data: dataHotel,
    loading: loadingHotel,
    error: errorHotel,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/hotels");

  const {
    data: dataRoom,
    loading: loadingRoom,
    error: errorRoom,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/rooms");

  switch (type) {
    case "user":
      widgetData = {
        title: "Users",
        total: dataUser.length,
        link: (
          <Link
            className='inline-block button-sm button-sm-light fs-x-tiny bold'
            to='/users'>
            See all users
          </Link>
        ),
        icon: <GroupOutlinedIcon />,
      };
      break;

    case "city":
      widgetData = {
        title: "Cities",
        total: dataCity.length,
        link: (
          <Link
            className='inline-block button-sm button-sm-light fs-x-tiny bold'
            to='/cities'>
            See all cities
          </Link>
        ),
        icon: <LocationOnOutlinedIcon />,
      };
      break;

    case "hotel":
      widgetData = {
        title: "Hotels",
        total: dataHotel.length,
        link: (
          <Link
            className='inline-block button-sm button-sm-light fs-x-tiny bold'
            to='/hotels'>
            See all hotels
          </Link>
        ),
        icon: <ApartmentOutlinedIcon />,
      };
      break;

    case "room":
      widgetData = {
        title: "Rooms",
        total: dataRoom.length,
        link: (
          <Link
            className='inline-block button-sm button-sm-light fs-x-tiny bold'
            to='/rooms'>
            See all rooms
          </Link>
        ),
        icon: <HotelOutlinedIcon />,
      };
      break;
    default:
      break;
  }
  return (
    <details className='widget' open>
      {loadingCity && loadingUser && loadingHotel && loadingRoom ? (
        <Loader />
      ) : (
        <>
          <summary className='fs-x-tiny upper bold text-dark-lighten'>
            {widgetData.title}
          </summary>
          <div className='widget-info flex flex-a-center flex-jc-between'>
            <div>
              <p className='margin-bottom-sm fs-small'>
                Number of {widgetData.title}
                <br />
                <span className='fs-x-huge bold'>{widgetData.total}</span>
              </p>

              {widgetData.link}
            </div>
            {widgetData.icon}
          </div>
        </>
      )}
    </details>
  );
};

export default Widget;
