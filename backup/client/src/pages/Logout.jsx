import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    dispatch({ type: "LOGIN_START" });

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
      navigate("/");
      return data;
    } catch (err) {}
  };

  return (
    <button onClick={handleLogout} className='button-none button-none-white'>
      <span className='visually-hidden'>Logout</span>
      <FontAwesomeIcon title='Logout' icon={faArrowRightFromBracket} />
    </button>
  );
};

{
  /* <Link to='/login'>
  <button onClick={handleLogout}>LogOut</button>
</Link>; */
}
export default Logout;
