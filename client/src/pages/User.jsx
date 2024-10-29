import Menu from "../components/Menu";
import InnerHeadline from "../components/InnerHeadline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import useFetch from "../hooks/useFetch";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const User = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const listRef = useRef();

  const { dispatch } = useContext(SearchContext);

  const [destination, setDestination] = useState("");

  const [hotelId, setHotelId] = useState();

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  useEffect(() => {
    if (hotelId) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
      navigate(`/hotels/${hotelId}`, {
        state: { destination, dates, options },
      });
    }
  }, [hotelId]);

  let userid;

  if (user._id === null) {
    navigate("/");
  }

  userid = user._id;

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/reserves/${userid}`
  );

  const [reservationsList, setReservationsList] = useState(data);

  let nodeList = [];
  let nodeItem = [];

  if (reservationsList.length > 0) {
    nodeList = listRef.current;
    nodeItem = nodeList.querySelectorAll("li");
  }

  useEffect(() => {
    nodeList = listRef.current;
    nodeItem = nodeList.querySelectorAll("li");
  }, [reservationsList.length]);

  useEffect(() => {
    setReservationsList(data);
  }, [data]);

  const handleCancelReserve = async (index, reservation) => {
    nodeItem[index].classList.add("hotel-item-cancel");
    try {
      const res = fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/reserves/delete/${reservation._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
          },
        }
      );
    } catch (err) {}

    /*     await Promise.all(
      reservation.selectedRooms.map((item) => {
        const res = axios.put(
          import.meta.env.VITE_BACKEND_URL +
            `/rooms/availability/delete/${item}`,
          {
            dates: reservation.allDates,
          }
        );

        return res.data;
      })
    ); */

    await Promise.all(
      reservation.selectedRooms.map(async (item) => {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/rooms/availability/delete/${item}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dates: reservation.allDates,
            }),
          }
        );

        if (!res.ok) {
          throw new Error(`Network response was not ok ${res.statusText}`);
        }

        return res.json();
      })
    );

    setTimeout(() => {
      setReservationsList(
        reservationsList.filter((item) => item._id !== reservation._id)
      );
    }, 1500);
  };

  return (
    <>
      <header className='main-header'>
        <Menu />
        {user && (
          <InnerHeadline
            title={"Hi " + user.username + "!"}
            textSuccess='Your account details and reservations.'
          />
        )}
      </header>
      <main
        className='container-fluid-lg margin-top-md'
        data-translate-y-md
        data-rel-zindex-200>
        <section className='column-2'>
          {user && (
            <div className='box bg-white flex flex-column flex-a-center'>
              <img
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "100vmin",
                  marginBottom: "1rem",
                }}
                src={user.image || "../assets/imgs/default-avatar.png"}
                alt='Profile user image'
              />
              <header
                className='text-center'
                style={{ width: "100%" }}
                data-rule>
                <h2 className='visually-hidden'>Profile</h2>

                <p className='fs-large bold text-accent-primary margin-bottom-x-sm'>
                  {user.username}
                </p>
                <p className='fs-small'>{user.email}</p>

                <p className='fs-small padding-bottom-sm'>{user.phone}</p>
              </header>
              <p className='padding-top-sm'>{user.city}</p>
              <p className='fs-small bold'> {user.country}</p>
            </div>
          )}
          <div>
            <h2 className='visually-hidden'>Your reservations</h2>
            <ul className='hotel-list reset-list' ref={listRef}>
              {reservationsList.length === 0 ? (
                <li className='hotel-item padding-top-md padding-bottom-md'>
                  <div className='hotel-item-info'>
                    <p className='fs-large bold text-center'>
                      There are not reservations.
                    </p>
                  </div>
                </li>
              ) : (
                reservationsList.map((item, index) => (
                  <li
                    key={item._id}
                    className='hotel-item '
                    style={{ position: "relative" }}
                    data-rule>
                    <img src={item.reservesList.images} alt='Hotel image' />
                    <div className='hotel-item-info'>
                      <header>
                        <h3 className='fs-x-large text-dark bold'>
                          {item.reservesList.name}
                        </h3>
                        <p className='fs-small bold text-accent-primary'>
                          {item.reservesList.address}
                        </p>

                        <p className='fs-small caps'>
                          <FontAwesomeIcon
                            className='icon | text-dark'
                            icon={faLocationDot}
                          />
                          {item.reservesList.city}
                        </p>
                      </header>
                      <h4 className='fs-large margin-top-sm margin-bottom-x-sm bold'>
                        {item.reservesRooms.title} Room
                      </h4>
                      <p className='fs-small'>
                        <span className='bold'>Rooms: </span>
                        {item.selectedRooms.length}
                      </p>
                      <p className='fs-small margin-bottom-sm'>
                        <span className='bold'>Dates: </span>
                        {item.allDates ? (
                          <>
                            {item.allDates.map((date, index) => (
                              <span key={index}>
                                {new Date(date).toLocaleDateString()}{" "}
                              </span>
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                      <div className='flex flex-gap-sm '>
                        <button
                          className='button button-dark-lighten fs-tiny text-center bold'
                          onClick={() => setHotelId(item.hotelId)}>
                          See property
                        </button>
                        <button
                          className='button button-danger fs-tiny bold'
                          onClick={() => {
                            handleCancelReserve(index, item);
                          }}>
                          Cancel reservation
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;
