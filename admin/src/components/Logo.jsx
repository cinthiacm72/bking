import { Link } from "react-router-dom";
import aPanelLogo from "../assets/logo.svg";
const Logo = () => {
  return (
    <div className='logo'>
      <Link className='logo-link' to='/'>
        <img className='logo-img' src={aPanelLogo} alt='Logo A Panel' />
      </Link>
      <p className='fs-x-tiny text-dark-lighten'>Fast and Easy Admin</p>
    </div>
  );
};

export default Logo;
