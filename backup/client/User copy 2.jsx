import Menu from "../components/Menu";
import InnerHeadline from "../components/InnerHeadline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ReserveContext } from "../context/ReserveContext";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const listRef = useRef();

  if (user._id === null) {
    navigate("/");
  }

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/reserves/${user._id}`
  );

  const [reservationsList, setReservationsList] = useState(data);

  const [indexItem, setIndexItem] = useState("");

  let nodeList = [];
  let nodeItem = [];

  if (reservationsList.length > 0) {
    nodeList = listRef.current;
    nodeItem = nodeList.querySelectorAll("li");
  }

  //console.log("nodeItem", nodeItem);

  useEffect(() => {
    setReservationsList(data);
  }, [data]);

  const handleFiltrar = (index) => {
    console.log("index: ", index);
    nodeItem[index].classList.add("hotel-item-cancel");
    /*  nodeItem.current.style.backgroundColor = "red"; */

    /*     console.log("ReservationId: ", item._id);
    item.selectedRooms.map((item) =>
      console.log(
        "import.meta.env.VITE_BACKEND_URL/rooms/availability/delete/",
        item
      )
    );
    console.log("allDates: ", item.allDates); */
  };

  const handleCancelReserve = async (index, reservation) => {
    console.log("index", index);

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
    } catch (err) {
      console.log(err);
    }
    await Promise.all(
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
            textSuccess='Your account details'
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
                      There is not reservation yet!
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
                        <Link
                          className='button button-dark-lighten fs-tiny text-center bold'
                          to={`/hotels/${item.hotelId}`}>
                          See property
                        </Link>
                        <button
                          className='button button-danger fs-tiny bold'
                          onClick={() => {
                            /*  setIndexItem(index); */
                            handleCancelReserve(index, item);
                          }}>
                          Cancel reservation
                        </button>
                        <button
                          onClick={() => {
                            setIndexItem(index);
                            handleFiltrar(index);
                          }}>
                          Filtrar
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
      {/*  .map((date, index) => (
      <span key={index}>{new Date(date).toLocaleDateString()}, </span>
      )) */}
      {/*      <MailList />
      <Footer /> */}
    </>
  );
};

export default User;

/*  Formato no compatible con la DB
 let allDatesParsed = reservationsList.map((item) =>
    item.allDates.map((date) => new Date(date).getTime())
  ); */
