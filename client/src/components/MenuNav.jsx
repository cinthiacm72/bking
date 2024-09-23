import { NavLink } from "react-router-dom";

const MenuNav = () => {
  return (
    <nav className='sub-menu container-fluid-lg margin-bottom-md'>
      <ul className='sub-menu-list reset-list '>
        <li className='sub-menu-item'>
          <NavLink to='/'>Stays</NavLink>
        </li>
        <li className='sub-menu-item'>
          <NavLink to='/flights'>Flights</NavLink>
        </li>
        <li className='sub-menu-item'>
          <NavLink to='/rental-cars'>Rental Cars</NavLink>
        </li>

        <li className='sub-menu-item'>
          <NavLink to='/taxis'>Taxis</NavLink>
        </li>
        <li className='sub-menu-item'>
          <NavLink to='/attractions'>Attractions</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MenuNav;
