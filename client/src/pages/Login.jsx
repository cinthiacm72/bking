import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import InnerHeadline from "../components/InnerHeadline";
import InputPassToggleView from "../components/InputPassToggleView";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      const data = await res.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };
  return (
    <>
      <header className='main-header'>
        <Menu />
        <InnerHeadline
          title='My account'
          textSuccess='Welcome back! Please login.'
        />
      </header>
      <main
        className='container-fluid-sm margin-top-md'
        data-translate-y-lg
        data-rel-zindex-200>
        <form
          className='inner-search-form box flex flex-column flex-gap-md box-shadow bg-white'
          onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type='text'
              placeholder='Enter your username'
              id='username'
              minLength='1'
              maxLength='20'
              required
              onChange={handleChange}
            />
          </label>
          <InputPassToggleView handleChange={handleChange} />
          {/*  <label>
            Password:
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              required
              onChange={handleChange}
            />
          </label> */}
          <input
            type='submit'
            value='Login'
            className='button button-accent-primary bold'
            disabled={loading}
          />
          {error && (
            <div className='badge  | fs-tiny upper bold bg-danger text-white'>
              {error.message}
            </div>
          )}
        </form>
      </main>
      {/*      <MailList />
      <Footer /> */}
    </>
  );
};

export default Login;
