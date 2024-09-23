import { useState } from "react";
import { uploadFile, deleteFile } from "../firebase/config";

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [mensageForm, setMensageForm] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

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
      const response = await res.json();
      if (res.status != 200) deleteFile(urlFile);
      setMensageForm(response);
    } catch (err) {
      setMensageForm(err);
    }
  };

  return (
    <section className='main-section'>
      <header className='margin-bottom-md'>
        <h1 className='fs-x-huge bold caps'>{title}</h1>
        <p className='fs-small'>Fill the for to add a new user to the app.</p>
      </header>

      <div>
        <img
          className='margin-bottom-sm'
          style={{ width: "60px", height: "60px", borderRadius: "100vmin" }}
          src={
            file ? URL.createObjectURL(file) : "/assets/imgs/default-avatar.png"
          }
          alt=''
        />

        <form>
          <div className='margin-bottom-sm'>
            <label htmlFor='file'>
              Upload image
              {/* Image: <DriveFolderUploadOutlinedIcon className='icon' /> */}
              <input
                type='file'
                id='file'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setFile(e.target.files[0])}
                /*   style={{ display: "none" }} */
              />
            </label>
          </div>

          {inputs.map((input) => (
            <label className='block' key={input.id}>
              {input.label}
              <input
                className='block margin-bottom-sm'
                onChange={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                id={input.id}
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

export default NewUser;
