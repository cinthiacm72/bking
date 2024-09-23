import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className='top-menu flex flex-a-center bg-white'>
      <button>Close</button>
      <Link className='logo fs-x-huge bold text-accent-primary' to='/'>
        Admin
      </Link>
      <div className='top-menu-container flex flex-a-center'>
        {/*   <form>
          <input type='search' placeholder='Search' />
          <input type='submit' value='Search' />
        </form> */}
        {/*   <ul className='user-menu flex flex-a-center flex-gap-md reset-list'>
          <li>
            <div className='flex flex-a-center flex-gap-sm'>
              <img
                src='../assets/imgs/default-avatar.png'
                alt='User image profile'
              />
              <p
                className='fs-tiny text-dark-lighten'
                style={{ lineHeight: "1" }}>
                Admin
                <br />
                <span className='fs-small bold text-dark'>{user.username}</span>
              </p>
            </div>
          </li>
          <li>Logout</li>
        </ul> */}
      </div>
    </nav>
  );
};

export default MainMenu;
