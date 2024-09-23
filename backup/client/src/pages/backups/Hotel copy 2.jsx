import { useLocation, useNavigate, Link } from "react-router-dom";
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
  const location = useLocation();

  let hotelSelectedId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/find/${hotelSelectedId}`
  );

  console.log("Data", data);

  let imageGallery = [];

  data.images ? (imageGallery = data.images) : "";

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
      newImageIndex =
        imageIndex === 0 ? data.images.length - 1 : imageIndex - 1;
      setImageIndex(newImageIndex);
    } else {
      newImageIndex =
        imageIndex === data.images.length - 1 ? 0 : imageIndex + 1;
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

  const toIsoStringDates = allDates.map((date) => toIsoString(new Date(date)));

  const AllDatesParsed = allDates.map((d) => new Date(d));

  const handleReserveRoom = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            import.meta.env.VITE_BACKEND_URL + `/rooms/availability/${roomId}`,
            { dates: allDates }
          );
          return res.data;
        })
      );

      setOpenConfirmReserveModal(true);
    } catch (err) {}
  };

  const handleCofirmedReserve = () => {
    navigate("/");
  };

  const handleCancelReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            import.meta.env.VITE_BACKEND_URL +
              `/rooms/availability/delete/${roomId}`,
            {
              dates: AllDatesParsed,
            }
          );
          return res.data;
        })
      );
    } catch (err) {}
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
              dates: AllDatesParsed,
            }
          );
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
            <button
              className='modal-close | button button-dark-lighten | fs-small bold'
              onClick={() => setOpenImageModal(false)}>
              Close
            </button>
            <img src={data.images[imageIndex]} alt='' />
            <div className='modal-controllers'>
              <button
                className='button button-dark-lighten | fs-small bold'
                onClick={() => handleArrows("prev")}>
                Previous
              </button>
              <button
                className='button button-dark-lighten | fs-small bold'
                onClick={() => handleArrows("next")}>
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {openReserveModal && (
        <section className='modal'>
          <div className='modal-container text-dark-lighten'>
            <button
              className='modal-close | button button-dark-lighten | fs-small bold'
              onClick={() => setOpenReserveModal(false)}>
              Close
            </button>

            <h3 className='margin-bottom-md fs-x-large bolder'>
              Select your rooms:
            </h3>
            {dataHotelRooms.map((item) => (
              <div key={item._id}>
                <h3 className='fs-large bolder'>{item.title}</h3>
                <p className='margin-bottom-sm'>{item.description}</p>
                <p>
                  <span className='bold'>Max People: </span>
                  {item.maxPeople}
                </p>
                <p>
                  <span className='bold'>Price: </span>
                  {item.price}
                </p>
                <p className='bold'>Rooms:</p>
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
            <button
              style={{ alignSelf: "center" }}
              className='margin-top-md button button-accent'
              onClick={handleReserveRoom}>
              Reserve Now!
            </button>
          </div>
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
      <header className='main-header'>
        <MainMenu />
        <section className='headline container-fluid-lg padding-bottom-x-lg'>
          <h1
            className=' margin-bottom-md fs-x-gigantic bolder text-accent-secondary caps'
            data-text-shadow>
            {`${data.name}`}
          </h1>
          {/*         <button
            className='button button-dark-lighten | fs-x-tiny bold'
            style={{
              position: "relative",
              zIndex: "1000",
              left: "100%",
              transform: "translateX(-100%)",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}>
            Go back
          </button> */}
        </section>
      </header>
      {loading ? (
        "loading..."
      ) : (
        <section
          className='hotels column-2 container-fluid-lg '
          data-translate-sm
          data-box-shadow>
          <div className='box bg-white'>
            <h1 className='margin-bottom-sm fs-x-huge bold text-dark'>
              {data.title}
            </h1>

            <p className='badge inline-block margin-bottom-sm fs-tiny bold caps text-white bg-accent-primary'>
              {data.type} / {data.city}
            </p>

            <p
              className='margin-bottom-sm padding-bottom-sm fs-small'
              data-rule>
              <FontAwesomeIcon className='icon' icon={faLocationDot} />
              {data.address}
            </p>
            <p
              className='margin-bottom-sm padding-bottom-sm fs-small'
              data-rule>
              <span className='bold'>Excellent location:</span> {data.distance}{" "}
              from center.
            </p>
            <h3 className='bold'>Description:</h3>
            <p className='margin-bottom-md'>{data.description}</p>

            <button
              className='margin-bottom-md button button-accent-primary'
              onClick={handleReserve}>
              Reserve or Book now!
            </button>
          </div>
          <div>
            <ul className='gallery-list | reset-list'>
              {imageGallery.map((item, index) => (
                <li
                  className='gallery-item'
                  key={index}
                  onClick={() => handleClick(index)}>
                  <img src={item} />
                </li>
              ))}
            </ul>
            {/*     <article className='box | margin-top-md  bg-light-darken hotel-price'>
              <div className='bg-accent-2'>
                {days === 0 ? (
                  <h3 className='margin-bottom-sm fs-x-large bolder text-dark-lighten'>
                    Perfect {data.type} to stay!
                  </h3>
                ) : (
                  <h3 className='margin-bottom-sm fs-x-large bolder text-dark-lighten'>
                    Perfect for a {days} night stay!
                  </h3>
                )}
                <p className='margin-bottom-sm'>{data.description}</p>

                <div>
                  <p className='badge | inline-block margin-bottom-sm fs-large text-dark-lighten bolder bg-white'>
                    ${days * data.cheapestPrice * options.room}
                    <span className=' border'> / {days} nights</span>
                  </p>
                </div>

                <button
                  className='margin-bottom-md button button-accent'
                  onClick={handleReserve}>
                  Reserve or Book now!
                </button>
              </div>
            </article> */}
          </div>
        </section>
      )}

      {/*     <MailList />
      <Footer /> */}
    </>
  );
};

export default Hotel;
