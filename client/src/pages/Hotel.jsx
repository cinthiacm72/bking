import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MainMenu from "../components/Menu";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import { ReserveContext } from "../context/ReserveContext";
import ModalGallery from "../components/ModalGallery";
import ModalReserve from "../components/ModalReserve";
import ModalWarning from "../components/ModalWarning";
import ModalSuccessReserve from "../components/ModalSuccessReserve";
import HotelGallery from "../components/HotelGallery";
import HotelDetails from "../components/HotelDetails";
import HotelReserveDetails from "../components/HotelReserveDetails";
//Services
import dayDifference from "../services/dayDifference.js";
import getDatesInRage from "../services/getDatesInRange.js";

const Hotel = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const [openGalleryModal, setOpenGalleryModal] = useState(false);

  const [openReserveModal, setOpenReserveModal] = useState(false);

  const [openSuccessReserveModal, setOpenSuccessReserveModal] = useState(false);

  const [openWarningModal, setOpenWarningModal] = useState(false);

  const location = useLocation();

  //Url
  let hotelSelectedId = location.pathname.split("/")[2];

  const { dates, options } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/${hotelSelectedId}`
  );

  //Image gallery
  let imageGallery = [];

  data.images ? (imageGallery = data.images) : "";

  const handleClick = (index) => {
    setImageIndex(index);
    setOpenGalleryModal(true);
  };

  const handleArrows = (arrow) => {
    let newImageIndex;
    if ((arrow = "prev")) {
      newImageIndex =
        imageIndex === 0 ? imageGallery.length - 1 : imageIndex - 1;
      setImageIndex(newImageIndex);
    } else {
      newImageIndex =
        imageIndex === imageGallery.length - 1 ? 0 : imageIndex + 1;
      setImageIndex(newImageIndex);
    }
  };

  const days = dayDifference(dates[0].startDate, dates[0].endDate);

  //Rooms
  const {
    data: dataHotelRooms,
    loading: loadingHotelRooms,
    error: errorHotelRooms,
  } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/rooms/${hotelSelectedId}`
  );

  const handleReserve = () => {
    if (days === 0) {
      setOpenWarningModal(true);
      return;
    }

    if (user) {
      setOpenReserveModal(true);
    } else {
      navigate("/login");
    }
  };

  //Habitaciones seleccionados
  const [selectedRooms, setSelectedRooms] = useState([]);
  const handleSelectedRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const allDates = getDatesInRage(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const [hotelId, setHotelId] = useState(hotelSelectedId);

  const [roomId, setRoomId] = useState("");

  let userId;

  if (!user === null) {
    userId = user._id;
  }

  const { dispatch } = useContext(ReserveContext);

  const handleReserveRoom = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = fetch(
            import.meta.env.VITE_BACKEND_URL + `/rooms/availability/${roomId}`,
            {
              method: "PUT",
              credentials: "include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
              },
              body: JSON.stringify({ dates: allDates }),
            }
          );
        })
      );
      setOpenSuccessReserveModal(true);

      dispatch({
        type: "NEW_RESERVE",
        payload: { userId, hotelId, roomId },
      });
    } catch (err) {
      console.log(err);
    }

    const newreserve = {
      userId,
      hotelId,
      roomId,
      selectedRooms,
      allDates,
    };

    try {
      const res = fetch(import.meta.env.VITE_BACKEND_URL + `/reserves`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
        },
        body: JSON.stringify(newreserve),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {openGalleryModal && (
        <ModalGallery
          setOpenGalleryModal={setOpenGalleryModal}
          handleArrows={handleArrows}
          imageGallery={imageGallery}
          imageIndex={imageIndex}
        />
      )}

      {openWarningModal && (
        <ModalWarning setOpenWarningModal={setOpenWarningModal} />
      )}

      {openReserveModal && (
        <ModalReserve
          setOpenReserveModal={setOpenReserveModal}
          days={days}
          allDates={allDates}
          dataHotelRooms={dataHotelRooms}
          handleSelectedRoom={handleSelectedRoom}
          isAvailable={isAvailable}
          handleReserveRoom={handleReserveRoom}
          getDatesInRage={getDatesInRage}
          setRoomId={setRoomId}
        />
      )}

      {openSuccessReserveModal && (
        <ModalSuccessReserve
          days={days}
          allDates={allDates}
          selectedRooms={selectedRooms}
          setOpenSuccessReserveModal={setOpenSuccessReserveModal}
          setOpenReserveModal={setOpenReserveModal}
        />
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
        <img src='/assets/loader.svg' alt='Loader image' />
      ) : (
        <main
          className='container-fluid-lg'
          data-translate-y-md
          data-rel-zindex-200>
          <HotelGallery imageGallery={imageGallery} handleClick={handleClick} />

          <section
            className='translate-y-sm column-2'
            data-translate-sm
            data-box-shadow>
            <HotelDetails data={data} handleReserve={handleReserve} />
            <HotelReserveDetails
              data={data}
              days={days}
              handleReserve={handleReserve}
            />
          </section>
        </main>
      )}

      <Footer />
    </>
  );
};

export default Hotel;
