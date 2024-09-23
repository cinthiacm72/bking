import { useState } from "react";
import { uploadCityFile, deleteCityFile } from "../firebase/config";

const NewCity = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [mensageForm, setMensageForm] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const uploadCityImage = async (fileToUpload) => {
      try {
        return await uploadCityFile(fileToUpload);
      } catch (err) {
        console.log(err);
      }
    };

    let urlFile;

    try {
      urlFile = file ? await uploadCityImage(file) : "";

      const newCity = {
        ...info,
        image: urlFile,
      };

      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/cities", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(newCity),
      });
      const response = await res.json();
      if (res.status != 200) deleteCityFile(urlFile);
      setMensageForm(response.message);
    } catch (err) {
      setMensageForm(err);
    }
  };

  return (
    <section className='main-section'>
      <header className='margin-bottom-md'>
        <h1 className='fs-x-huge bold caps'>{title}</h1>
        <p className='fs-small'>Fill the for to add a new city to the app.</p>
      </header>
      <div>
        <img
          className='margin-bottom-sm'
          style={{ width: "80px", height: "80px" }}
          src={
            file ? URL.createObjectURL(file) : "/assets/imgs/default-image.jpeg"
          }
          alt=''
        />

        <form>
          <div className='margin-bottom-sm'>
            <label htmlFor='file'>
              Upload image
              <input
                type='file'
                id='file'
                accept='.jpg, .jpeg, .png'
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          {inputs.map((input) => (
            <label className='block' key={input.id}>
              {input.label}
              <input
                className='block margin-bottom-sm'
                id={input.id}
                onChange={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                required
              />
            </label>
          ))}

          <button className='button button-primary' onClick={handleClick}>
            Send
          </button>
        </form>
      </div>
      {mensageForm && (
        <div className='message message-neutral'>{mensageForm}</div>
      )}
    </section>
  );
};

export default NewCity;
