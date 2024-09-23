import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import Loader from "../components/Loader";

const Single = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/${path}/${id}`
  );

  const {
    data: dataReservation,
    loading: loadingReservation,
    error: errorReservation,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + `/reserves/${id}`);

  return (
    <section className='main-section'>
      {loading && loadingReservation ? (
        <Loader />
      ) : (
        <>
          <header className='margin-bottom-md flex flex-gap-sm flex-a-center flex-wrap'>
            <img
              style={{ borderRadius: "100vmin", width: "120px" }}
              src={data.image}
              alt=''
            />
            <div>
              <h1 className='fs-x-huge bold caps'>{data.username}</h1>
              <p className='fs-small'>{data.email}</p>
            </div>
          </header>
          <div className='flex flex-gap-md flex-wrap'>
            <article style={{ flex: "1" }} className='widget'>
              <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
                <h2 className='fs-large bold caps'>{path} Info</h2>
                <PersonOutlinedIcon />
              </div>
              <p>
                <span className='bold'>City: </span>
                {data.city}
              </p>
              <p>
                <span className='bold'>Country: </span>
                {data.country}
              </p>
              <p>
                <span className='bold'>Phone: </span>
                {data.phone}
              </p>
            </article>
            <article style={{ flex: "1.5" }} className='widget'>
              <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
                <h2 className='fs-large bold caps'>Reservations</h2>
                <TurnedInNotOutlinedIcon />
              </div>
              {dataReservation.length === 0 ? (
                <p>You dont have reservations yet!</p>
              ) : (
                <ul className='reset-list'>
                  {dataReservation.map((item, index) => (
                    <li key={item._id} data-rule>
                      <div>
                        <header>
                          <h3 className='fs-normal bold text-accent-primary'>
                            {item.reservesList.name}
                          </h3>
                          <p className=' bold caps'>{item.reservesList.city}</p>

                          <p className=''>{item.reservesList.address}</p>
                        </header>
                        <h4 className='bold'>
                          {item.reservesRooms.title} Room
                        </h4>
                        <p className='fs-small'>
                          <span className='bold'>Rooms: </span>
                          {item.selectedRooms.length}
                        </p>
                        <p className='fs-small margin-bottom-sm'>
                          <span className='bold'>Dates: </span>
                          <>
                            {item.allDates.map((date, index) => (
                              <span key={index}>
                                {new Date(date).toLocaleDateString()}
                              </span>
                            ))}
                          </>
                        </p>
                      </div>
                      <hr></hr>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </div>
        </>
      )}
    </section>
  );
};

export default Single;
