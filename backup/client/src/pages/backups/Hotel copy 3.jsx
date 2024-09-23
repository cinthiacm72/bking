import { useLocation, useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import MailList from "../components/MailList";
import MainMenu from "../components/Menu";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHeart,
  faBed,
  faCalendarDays,
  faPerson,
  faUser,
  faChildren,
  faXmark,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ModalImageGallery from "../components/ModalImageGallery";

const Hotel = () => {
  const location = useLocation();

  let hotelSelectedId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/find/${hotelSelectedId}`
  );

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

  console.log(dataHotelRooms);

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
        <ModalImageGallery
          setOpenImageModal={setOpenImageModal}
          handleArrows={handleArrows}
          data={data}
          imageIndex={imageIndex}
        />
      )}

      {openReserveModal && (
        <section className='modal'>
          <div className='modal-container modal-container-min'>
            <button
              className='button-sm button-sm-dark modal-close-button'
              onClick={() => setOpenReserveModal(false)}>
              <FontAwesomeIcon icon={faXmark} />
              <span className='visually-hidden'>Close image modal window</span>
            </button>

            <h3 className='margin-bottom-sm fs-x-large bold'>
              Select your rooms:
            </h3>
            <p className='margin-bottom-x-sm fs-small'>
              Reserved dates for:
              <span className='badge bold text-white bg-success'>
                {days} nights
              </span>
            </p>
            <p className='margin-bottom-x-sm fs-tiny bold'>
              {allDates.map((date, index) => (
                <span key={index}>{new Date(date).toLocaleDateString()}, </span>
              ))}
            </p>
            <p className='badge fs-small margin-bottom-md text-white bg-accent-primary'>
              <span className='bold'>Your options: </span> Adults:{" "}
              {options.adult} - Children: {options.children} - Rooms:
              {options.room}
            </p>

            <ul className='grid-list reset-list'>
              {dataHotelRooms.map((item) => (
                <li className='grid-item bg-white' key={item._id}>
                  <h3
                    className='margin-bottom-sm padding-bottom-sm fs-large bold'
                    data-rule>
                    {item.title}
                  </h3>
                  <p className='margin-bottom-sm fs-small'>
                    {item.description}
                  </p>
                  <p className='fs-small'>
                    <span className='bold'>Max People: </span>
                    {item.maxPeople}
                  </p>
                  <p className='margin-bottom-sm fs-small'>
                    <span className='bold'>Price: </span>${item.price}
                  </p>
                  <p className='fs-small bold'>Rooms:</p>
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
                </li>
              ))}
            </ul>
            {/* <button
              className='margin-top-md button button-accent-primary'
              onClick={handleReserveRoom}>
              Reserve Now!
            </button> */}
            <div className='flex flex-gap-sm '>
              <button
                className='margin-top-md button button-accent-primary bold'
                onClick={handleCofirmedReserve}>
                Confirm reservation!
              </button>
              <button
                className='margin-top-md button button-dark bold'
                onClick={handleCancelReserve}>
                Cancel
              </button>
            </div>
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
            className='margin-bottom-sm fs-x-gigantic bolder text-accent-secondary caps'
            data-text-shadow>
            {`${data.name}`}
          </h1>

          <p className='padding-bottom-md fs-large text-white'>
            <FontAwesomeIcon className='icon' icon={faLocationDot} />
            {data.address}
          </p>
        </section>
      </header>
      {loading ? (
        "loading..."
      ) : (
        <main
          className='container-fluid-lg'
          data-translate-y-md
          data-rel-zindex-200>
          {/*   <button
            className='go-back-button button button-accent-primary-dark margin-bottom-x-sm | fs-x-tiny bold'
            onClick={() => navigate(-1)}>
            Go back
          </button> */}
          <ul className='gallery-list translate-y-sm | reset-list'>
            {imageGallery.map((item, index) => (
              <li
                className={
                  imageGallery.length > 6
                    ? "gallery-item-odd"
                    : "gallery-item-even"
                }
                key={index}
                onClick={() => handleClick(index)}>
                <img src={item} />
              </li>
            ))}
          </ul>
          <section
            className='translate-y-sm column-2'
            data-translate-sm
            data-box-shadow>
            <div className='box bg-white'>
              <h2 className='margin-bottom-sm fs-x-huge bold text-dark'>
                {data.title}
              </h2>
              <div className='flex flex-a-center flex-gap-sm margin-bottom-sm'>
                <p className='badge fs-tiny bold caps text-white bg-accent-primary'>
                  {data.type} / {data.city}
                </p>
                {data.featured ? (
                  <div className='flex flex-gap-x-sm flex-a-center'>
                    <FontAwesomeIcon
                      className='icon-rounded fs-large text-white bg-danger'
                      icon={faHeart}
                      title='Featured property'
                    />
                    <p className='visually-hidden'>Featured property</p>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <p className='fs-small bold text-accent-primary'>{data.name}</p>

              <p
                className='margin-bottom-sm padding-bottom-sm fs-small'
                data-rule>
                <FontAwesomeIcon className='icon' icon={faLocationDot} />
                {data.address}
              </p>
              <p
                className='margin-bottom-sm padding-bottom-sm fs-small'
                data-rule>
                <span className='bold'>Excellent location:</span>{" "}
                {data.distance} from center.
              </p>
              <p
                className='margin-bottom-sm padding-bottom-sm fs-small'
                data-rule>
                <span className='bold'>Price: </span>
                <span className='badge bg-success bold text-white'>
                  from ${data.cheapestPrice}
                </span>
              </p>
              {/*   <h3 className='bold'>Description:</h3>
              <p className='margin-bottom-md'>{data.description}</p> */}

              <button
                className='margin-bottom-md button button-accent-primary bold'
                onClick={handleReserve}>
                Reserve or Book now!
              </button>
            </div>
            <div>
              {/*   <ul className='gallery-list | reset-list'>
              {imageGallery.map((item, index) => (
                <li
                  className='gallery-item'
                  key={index}
                  onClick={() => handleClick(index)}>
                  <img src={item} />
                </li>
              ))}
            </ul> */}
              <article className='box bg-white'>
                <div>
                  {days === 0 ? (
                    <h3 className='margin-bottom-sm fs-x-huge bold'>
                      Perfect {data.type} to stay!
                    </h3>
                  ) : (
                    <h3 className='margin-bottom-sm fs-x-huge bold'>
                      Perfect for a {days} night stay!
                    </h3>
                  )}
                  <p className='margin-bottom-md'>{data.description}</p>

                  <div className='flex flex-gap-md flex-wrap'>
                    <div className='box flex-grow bg-light text-center'>
                      <p className='margin-bottom-x-sm fs-x-large'>
                        <span className='fs-x-huge bolder'>
                          ${days * data.cheapestPrice * options.room}/{days}
                        </span>{" "}
                        nights
                      </p>
                      <p className='fs-small margin-bottom-md'>
                        * Free cancelarion and it includes leaves and fees.
                      </p>
                      <button
                        className='margin-bottom-md button button-accent-primary bold'
                        onClick={handleReserve}>
                        Reserve or Book now!
                      </button>
                    </div>

                    <div className='box flex-grow bg-light'>
                      <p
                        className='margin-bottom-sm padding-bottom-sm fs-small'
                        data-rule>
                        <FontAwesomeIcon className='icon' icon={faUser} />
                        <span className=' bold'>Adult: </span>
                        {options.adult}
                      </p>
                      <p
                        className='margin-bottom-sm padding-bottom-sm fs-small'
                        data-rule>
                        <FontAwesomeIcon className='icon' icon={faChildren} />
                        <span className=' bold'>Children: </span>
                        {options.children}
                      </p>
                      <p
                        className='margin-bottom-sm padding-bottom-sm fs-small'
                        data-rule>
                        <FontAwesomeIcon className='icon' icon={faBed} />
                        <span className=' bold'>Rooms: </span>
                        {options.room}
                      </p>
                      <p className='badge fs-tiny bold text-center text-white bg-success'>
                        Reserve for {days} nights
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
      )}

      {/*     <MailList />
      <Footer /> */}
    </>
  );
};

export default Hotel;
