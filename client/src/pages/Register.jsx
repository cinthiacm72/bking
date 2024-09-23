import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { uploadFile, deleteFile } from "../firebase/config";
/* import InnerHeader from "../components/InnerHeader"; */
import InnerHeadline from "../components/InnerHeadline";

const Register = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    const uploadUserImage = async (fileToUpload) => {
      try {
        return await uploadFile(fileToUpload);
      } catch (err) {
        console.log(err);
      }
    };

    let urlFile;

    try {
      urlFile = file ? await uploadUserImage(file) : "";

      const newUser = {
        ...info,
        image: urlFile,
      };

      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.status != 200) deleteFile(urlFile);

      if (res.status === 501) {
        setWarning(data);
        dispatch({ type: "LOGIN_WARNING", payload: data });
        dispatch({ type: "LOGIN_FAILURE", payload: null });
      } else {
        setSuccess(data);
        dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
        dispatch({ type: "LOGIN_WARNING", payload: null });
        setWarning("");
      }

      console.log("DATA", data);
    } catch (err) {
      console.log("ERR", err);
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };
  return (
    <>
      <header className='main-header'>
        <Menu />
        <InnerHeadline
          title='My account'
          textSuccess='Welcome, register to start!'
        />
      </header>
      <main
        className='container-fluid-sm margin-top-md'
        data-translate-y-lg
        data-rel-zindex-200>
        <form
          className='inner-search-form box flex flex-column flex-gap-md box-shadow bg-white'
          onSubmit={handleSubmit}>
          <div className='formInput'>
            <img
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "100vmin",
                marginBottom: "2rem",
              }}
              src={
                file
                  ? URL.createObjectURL(file)
                  : "/assets/imgs/default-avatar.png"
              }
              alt=''
            />
            <label htmlFor='file'>
              Upload image:
              <input
                type='file'
                id='file'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setFile(e.target.files[0])}
                /*   style={{ display: "none" }} */
              />
            </label>
          </div>
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
          <label>
            Email:
            <input
              type='email'
              placeholder='email@domain.com'
              id='email'
              /*  pattern='.+@example\.com' */
              size='30'
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type='tel'
              placeholder='+5911'
              id='phone'
              minLength='1'
              maxLength='20'
              required
              /* pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' */
              onChange={handleChange}
            />
          </label>
          <label>
            Country:
            <input
              type='text'
              placeholder='Enter your country'
              id='country'
              minLength='1'
              maxLength='20'
              required
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type='text'
              placeholder='Enter your city'
              id='city'
              minLength='1'
              maxLength='20'
              required
              onChange={handleChange}
            />
          </label>
          <input
            type='submit'
            value='Register'
            className='button button-accent-primary bold'
            disabled={loading}
          />
          {error && (
            <div className='badge | fs-tiny upper bold bg-danger text-white'>
              {error.message}
            </div>
          )}
          {success && (
            <>
              <div className='badge | fs-tiny upper bold bg-success text-white'>
                {success}
              </div>
              <p>
                Now you can Login, <Link to='/login'>please click here!</Link>
              </p>
            </>
          )}
          {warning && (
            <div className='badge | fs-tiny upper bold bg-warning text-white'>
              {warning.message}
            </div>
          )}
        </form>
      </main>
      {/*    <MailList />
      <Footer /> */}
    </>
  );
};

export default Register;
