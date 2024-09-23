import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MailList from "../components/MailList";
import MainMenu from "../components/MainMenu";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Hotel = () => {
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576409.jpg?k=509532d7d70d8c1f274fb371ccc8605c6147db919622f12afa2b726ae02bef37&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576406.jpg?k=362f811f1c207326d957973b56fc881e8ced5f5f0604754970d8810e7e39dae6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576422.jpg?k=03c8ca8fec16fe5b3b3576658f18a18fc4e6a368edb386af26f10cbd4cfb90c4&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576409.jpg?k=509532d7d70d8c1f274fb371ccc8605c6147db919622f12afa2b726ae02bef37&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576447.jpg?k=29bb4d3bd2c4e3086a545196696d683e1c79e65a0b7ac305754c0dae593cb547&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576409.jpg?k=509532d7d70d8c1f274fb371ccc8605c6147db919622f12afa2b726ae02bef37&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418576409.jpg?k=509532d7d70d8c1f274fb371ccc8605c6147db919622f12afa2b726ae02bef37&o=&hp=1",
    },
  ];

  const location = useLocation();

  let hotelSelectedId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/find/${hotelSelectedId}`
  );

  const { dates, options } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0].startDate, dates[0].endDate);

  const [imageIndex, setImageIndex] = useState(0);

  const [openImageModal, setOpenImageModal] = useState(false);

  const [openReserveModal, setOpenReserveModal] = useState(false);

  const [openConfirmReserveModal, setOpenConfirmReserveModal] = useState(false);

  const handleClick = (index) => {
    setImageIndex(index);
    setOpenImageModal(true);
  };

  const handleArrows = (arrow) => {
    let newImageIndex;

    if ((arrow = "prev")) {
      newImageIndex = imageIndex === 0 ? photos.length - 1 : imageIndex - 1;
      setImageIndex(newImageIndex);
    } else {
      newImageIndex = imageIndex === photos.length - 1 ? 0 : imageIndex + 1;
      setImageIndex(newImageIndex);
    }
  };

  const {
    data: dataHotelRooms,
    loading: loadingHotelRooms,
    error: errorHotelRooms,
  } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/rooms/${hotelSelectedId}`
  );

  const handleReserve = () => {
    if (user) {
      setOpenReserveModal(true);
    } else {
      navigate("/login");
    }
  };

  // Habitaciones seleccionados
  const [selectedRooms, setSelectedRooms] = useState([]);
  //console.log("selectedRooms: ", selectedRooms);
  const handleSelectedRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  //console.log("Selected Rooms: ", selectedRooms);

  const getDatesInRage = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRage(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        return (num < 10 ? "0" : "") + num;
      };

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ":" +
      pad(Math.abs(tzo) % 60)
    );
  }

  //var dt = new Date();

  const toIsoStringDates = allDates.map((date) => toIsoString(new Date(date)));
  // console.log(toIsoStringDates);

  // 2024-03-30T03:00:00.000+00:00

  //console.log("ALlDates:", allDates);

  const ALlDatesParse = allDates.map((d) => new Date(d));
  //console.log("ALlDatesParse", ALlDatesParse);

  const handleReserveRoom = async () => {
    // console.log("hola Reserva!");
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          //console.log(roomId);
          const res = axios.put(
            import.meta.env.VITE_BACKEND_URL + `/rooms/availability/${roomId}`,
            { dates: allDates }
          );
          return res.data;
        })
      );

      setOpenConfirmReserveModal(true);
    } catch (err) {}
    /* try {
  await Promise.all(selectedRooms.map(roomId => { const res = await fetch(import.meta.env.VITE_BACKEND_URL + `/rooms/availability/${roomId}`,{
    method:"PUT",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
    },
    body: JSON.stringify(credentials)
  })}))
} catch (err) {
  
} */
  };

  //console.log("allDates:", allDates);
  // 2024-03-29T03:00:00.000+00:00

  const handleCofirmedReserve = () => {
    navigate("/");
  };

  const handleCancelReserve = async () => {
    //console.log("hola Cancelacion!");
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            import.meta.env.VITE_BACKEND_URL +
              `/rooms/availability/delete/${roomId}`,
            {
              dates: ALlDatesParse,
            }
          );
          //roomId.prop("checked", false);
          //console.log("Data: ", dates);
          //checkbox.prop("checked", false);
          return res.data;
        })
      );
    } catch (err) {}
    /*  try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/rooms/availability/${selectedRooms[0]}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
          },
          body: JSON.stringify(allDates),
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    } */

    setOpenConfirmReserveModal(false);
    setOpenReserveModal(false);
  };

  const handleCancelRoomReserved = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            import.meta.env.VITE_BACKEND_URL +
              `/rooms/availability/delete/${roomId}`,
            {
              dates: ALlDatesParse,
            }
          );
          //roomId.prop("checked", false);
          //console.log("Data: ", dates);
          //checkbox.prop("checked", false);
          return res.data;
        })
      );
    } catch (err) {}
  };

  return (
    <>
      {openImageModal && (
        <section className='modal'>
          <div className='modal-container'>
            <button onClick={() => setOpenImageModal(false)}>Close</button>
            <img src={photos[imageIndex].src} alt='' />
            <button onClick={() => handleArrows("prev")}>Previous</button>
            <button onClick={() => handleArrows("next")}>Next</button>
          </div>
        </section>
      )}

      {openReserveModal && (
        <section className='modal bg-light'>
          <div>
            <button onClick={() => setOpenReserveModal(false)}>Close</button>
            <p>Select your rooms:</p>
            {dataHotelRooms.map((item) => (
              <div key={item._id}>
                <h3 className='bold'>{item.title}</h3>
                <p>{item.description}</p>
                <p>Max People: {item.maxPeople}</p>
                <p>Price: {item.price}</p>
                <p>Rooms:</p>
                {item.roomNumbers.map((roomNumber) => (
                  <div key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type='checkbox'
                      value={roomNumber._id}
                      onChange={handleSelectedRoom}
                      disabled={!isAvailable(roomNumber)}
                    />
                    {!isAvailable(roomNumber) && (
                      <button onClick={handleCancelRoomReserved}>
                        Cancel Reserve
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={handleReserveRoom}>Reserve Now!!!</button>
        </section>
      )}

      {openConfirmReserveModal && (
        <div className='modal bg-light'>
          <p>Reserved Dates for :{days} nights</p>
          <div>
            {allDates.map((date, index) => (
              <p key={index}>{new Date(date).toLocaleDateString()}</p>
            ))}
          </div>
          <button onClick={handleCofirmedReserve}>
            Confirm and got to home section
          </button>
          <button onClick={handleCancelReserve}>Cancel</button>
        </div>
      )}
      <MainMenu />
      {loading ? (
        "loading..."
      ) : (
        <section className='hotel-details container-fluid-lg margin-top-md'>
          <h1 className='fs-x-large bold'>{data.title}</h1>
          <button onClick={handleReserve}>Reserve or Book now!</button>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            {data.address}
          </p>
          <p>Excellent location - {data.distance} from center</p>
          <p>{data.description} </p>
          <section className='hotel-gallery'>
            {photos.map((photo, index) => (
              <img
                src={photo.src}
                key={index}
                onClick={() => handleClick(index)}
              />
            ))}
          </section>
          <article className='hotel-price'>
            <div>
              <h2 className='fs-large bold'>Stay in the heart of Krakoe</h2>
              <p>{data.description}</p>
            </div>

            <div className='bg-accent-2'>
              <h3 className='bold'>Perfect for a {days} night stay!</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                quasi dicta ducimus ipsa odit delectus praesentium ullam alias
                minima doloremque natus, eos reprehenderit excepturi fuga!
                Suscipit perspiciatis voluptatum distinctio qui!
              </p>
              <p className='fs-x-large bold'>
                ${days * data.cheapestPrice * options.room}
                <span className='fs-normal'>- {days} nights</span>
              </p>
              <button onClick={() => setOpenReserveModal(true)}>
                Reserve or Book Now!
              </button>
            </div>
          </article>
        </section>
      )}

      <MailList />
      <Footer />
    </>
  );
};

export default Hotel;
