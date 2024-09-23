import { useState } from "react";
import useFetch from "../hooks/useFetch";

const NewRoom = ({ title, inputs }) => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [mensageForm, setMensageForm] = useState("");

  const {
    data: hotelData,
    loading: hotelLoading,
    error: hotelError,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    const newroom = {
      ...info,
      roomNumbers,
    };

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/rooms/${hotelId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
          },
          body: JSON.stringify(newroom),
        }
      );

      const response = await res.json();
      setMensageForm(response);
    } catch (err) {
      setMensageForm(err);
    }
  };
  return (
    <section className='main-section'>
      <header className='margin-bottom-md'>
        <h1 className='fs-x-huge bold caps'>{title}</h1>
        <p className='fs-small'>Fill the for to add a new room to the app.</p>
      </header>
      <form>
        {inputs.map((input) => (
          <label className='block' key={input.id}>
            {input.label}
            <input
              className='block margin-bottom-sm'
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              required
              onChange={handleChange}
            />
          </label>
        ))}
        <label className='block'>
          Rooms
          <textarea
            className='margin-bottom-sm block'
            placeholder='101, 102, 103 (Give comma between room numbers)'
            required
            onChange={(e) => setRooms(e.target.value)}
          />
        </label>
        <label className='block margin-bottom-sm'>
          Choose a hotel
          <select
            className='block margin-bottom-sm'
            id='hotelId'
            onChange={(e) => setHotelId(e.target.value)}>
            <option>Choose a hotel</option>
            {hotelLoading
              ? "loading..."
              : hotelData &&
                hotelData.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
          </select>
        </label>
        <button className='button button-primary' onClick={handleClick}>
          Send
        </button>
      </form>
      {mensageForm && (
        <div className='message message-neutral'>{mensageForm}</div>
      )}
    </section>
  );
};

export default NewRoom;
