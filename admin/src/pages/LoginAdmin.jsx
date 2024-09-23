import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import InputPassword from "../components/InputPassword";

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  return (
    <>
      <main className='grid-center'>
        <div className='widget flex flex-column flex-a-center'>
          <div className='margin-top-sm margin-bottom-sm'>
            <Logo />
          </div>

          <h1 className='fs-x-large bold'>Welcome back!</h1>
          <p className='margin-bottom-md'>Log in to your aPanel account.</p>

          <form className='flex flex-column'>
            <label className='block '>
              Username:
              <input
                className='block margin-bottom-sm'
                type='text'
                id='username'
                required
                onChange={handleChange}
              />
            </label>
            <InputPassword handleChange={handleChange} />
            <button
              className='button button-primary margin-top-sm margin-bottom-sm'
              disabled={loading}
              onClick={handleLogin}>
              Login
            </button>
            <Link className='fs-small text-center'>Forget My Password</Link>
          </form>
          {error && (
            <div className='message message-danger'>{error.message}</div>
          )}
        </div>
      </main>
    </>
  );
};

export default LoginAdmin;
