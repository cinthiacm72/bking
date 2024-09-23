import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MainHeadline from "../components/MainHeadline";
import MainMenu from "../components/MainMenu";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Footer from "../components/Footer";
import MailList from "../components/MailList";
import SecondayHeadline from "../components/SecondaryHeadline";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  //console.log("ERROR", error);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch("http://localhost:3000/login", {
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
        <MainMenu section='auth' />
        <SecondayHeadline
          title='My account'
          text='Welcome back! please login. 😎'
        />
      </header>
      <section className='container-fluid-sm'>
        <form
          className='form box flex flex-column flex-gap-md box-shadow bg-white'
          data-translate-sm
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
          <label>
            Password:
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              required
              onChange={handleChange}
            />
          </label>
          <input
            type='submit'
            value='Login'
            className='button button-accent'
            disabled={loading}
          />
          {error && (
            <div className='badge  | fs-tiny upper bold bg-danger text-white'>
              {error.message}
            </div>
          )}
        </form>
      </section>
      <MailList />
      <Footer />
    </>
  );
};

export default Login;
