import { NavLink } from "react-router-dom";
import Logout from "../pages/Logout";
import { useContext } from "react";
import { ReserveContext } from "../context/ReserveContext";

const MenuAuth = ({ user }) => {
  const { hotelId, selectedRooms, allDates } = useContext(ReserveContext);

  return (
    <nav className='main-menu container-fluid-x-lg padding-top-sm '>
      <ul className='menu-list reset-list margin-bottom-md'>
        <li className='menu-item'>
          <NavLink to='/'>
            <img
              src='./../assets/imgs/logo-bking.svg'
              alt='Logo Bking'
              style={{ width: "86px" }}
            />
            <span className='fs-x-tiny text-accent-primary-light'>
              Booking Holdings Inc
            </span>
          </NavLink>
        </li>
        {user ? (
          <div className='user-profile'>
            <NavLink to='/user' className='flex flex-a-center flex-gap-sm'>
              <img
                src={user.image || "../assets/imgs/default-avatar.png"}
                alt='Profile image'
              />
              <p className='fs-x-tiny text-white bold'>{user.username}</p>
            </NavLink>
            <Logout />
          </div>
        ) : (
          <>
            <li className='menu-item'>
              <NavLink
                to='/login'
                className='button button-accent-primary-dark fs-x-tiny bold'>
                Login
              </NavLink>
            </li>

            <li className='menu-item'>
              <NavLink
                to='/register'
                className='button button-accent-primary-dark fs-x-tiny bold'>
                Rergister
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MenuAuth;
