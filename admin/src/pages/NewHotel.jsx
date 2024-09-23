import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { uploadFiles, deleteFiles } from "../firebase/config";

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [mensageForm, setMensageForm] = useState("");

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/rooms"
  );

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setRooms(value);
  };

  const uploadImages = async (filesToUpload) => {
    try {
      return await uploadFiles(filesToUpload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let urlFiles = [];

    try {
      urlFiles = files ? await uploadImages(files) : "";

      const newhotel = {
        ...info,
        rooms,
        images: urlFiles,
      };

      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/hotels", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(newhotel),
      });
      const response = await res.json();
      if (res.status != 200) deleteFiles(urlFiles);
      setMensageForm(response);
    } catch (err) {
      setMensageForm(err);
    }
  };

  return (
    <>
      <section className='main-section'>
        <header className='margin-bottom-md'>
          <h1 className='fs-x-huge bold caps'>{title}</h1>
          <p className='fs-small'>
            Fill the for to add a new hotel to the app.
          </p>
        </header>

        <div>
          <div className='flex flex-wrap flex-gap-sm'>
            {files.length > 0 ? (
              Object.values(files).map((item, index) => (
                <img
                  className='margin-bottom-sm'
                  key={index}
                  style={{ width: "80px", height: "80px" }}
                  src={URL.createObjectURL(files[index])}
                  alt=''
                />
              ))
            ) : (
              <img
                style={{ width: "80px", height: "80px" }}
                src='/assets/imgs/default-image.jpeg'
                alt=''
              />
            )}
          </div>

          <form className='form'>
            <div className='margin-bottom-sm'>
              <label htmlFor='file'>Upload images</label>
              <input
                type='file'
                id='file'
                multiple
                required
                onChange={(e) => setFiles(e.target.files)}
              />
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

            <label className='block'>Featured?</label>
            <select
              className='block margin-bottom-sm'
              id='featured'
              onChange={handleChange}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>

            <label className='block'>Select rooms for the property</label>
            <select
              className='block margin-bottom-sm'
              id='rooms'
              multiple
              onChange={handleSelect}>
              {loading
                ? "loading"
                : data &&
                  data.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.title}
                    </option>
                  ))}
            </select>

            <button className='button button-primary' onClick={handleClick}>
              Send
            </button>
          </form>
        </div>
        {mensageForm && (
          <div className='message message-neutral'>{mensageForm}</div>
        )}
      </section>
    </>
  );
};

export default NewHotel;
