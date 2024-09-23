import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const SideMenu = ({ children }) => {
  const { user, dispatch } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (e) => {
    dispatch({ type: "LOGIN_START" });

    navigate("/");

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      dispatch({ type: "LOGOUT", payload: data.details });

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header
        className={isOpen ? "side-menu" : "side-menu side-menu-collapsed"}>
        <nav>
          <div className='user margin-top-md margin-bottom-md'>
            <img
              className='margin-bottom-x-sm'
              src={user.image || "../assets/imgs/default-avatar.png"}
              alt='User image profile'
            />
            <p className='user-info fs-x-tiny text-white text-center'>
              <span className='fs-small bold'>{user.username}</span>
              <br />
              {user.email}
            </p>
          </div>
          <h3 className='side-menu-title'>Main</h3>
          <ul className='side-menu-list  padding-bottom-md'>
            <li className='side-menu-item'>
              <NavLink to='/'>
                <DashboardOutlinedIcon />
                Dashboard
              </NavLink>
            </li>
          </ul>
          <h3 className='side-menu-title'>Lists</h3>
          <ul className='side-menu-list  padding-bottom-md'>
            <li className='side-menu-item'>
              <NavLink to='/users'>
                <GroupOutlinedIcon />
                Users
              </NavLink>
            </li>
            <li className='side-menu-item'>
              <NavLink to='/cities'>
                <LocationOnOutlinedIcon />
                Cities
              </NavLink>
            </li>
            <li className='side-menu-item'>
              <NavLink to='/hotels'>
                <ApartmentOutlinedIcon />
                Hotels
              </NavLink>
            </li>
            <li className='side-menu-item'>
              <NavLink to='/rooms'>
                <HotelOutlinedIcon />
                Rooms
              </NavLink>
            </li>
          </ul>
          <h3 className='side-menu-title'>User</h3>
          <ul className='side-menu-list padding-bottom-md'>
            <li className='side-menu-item'>
              <NavLink to={`/users/${user._id}`}>
                <PersonOutlinedIcon />
                Profile
              </NavLink>
            </li>
            <li className='side-menu-item'>
              <button onClick={handleLogout}>
                <ExitToAppOutlinedIcon />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main
        className={
          isOpen
            ? "main-container main-container-expanded"
            : "main-container main-container-collapsed"
        }>
        <nav className={isOpen ? "top-menu" : "top-menu top-menu-expanded"}>
          <button className='hamburger' onClick={handleToggle}>
            <MenuOutlinedIcon />
          </button>
          <Logo />
        </nav>

        {children}
      </main>
    </>
  );
};

export default SideMenu;
