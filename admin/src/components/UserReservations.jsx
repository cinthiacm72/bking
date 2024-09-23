import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const UserReservations = ({ id }) => {
  const {
    data: data,
    loading: loading,
    error: error,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + `/reserves/${id}`);

  return loading ? (
    <Loader />
  ) : (
    <article style={{ flex: "1.5" }} className='widget'>
      <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
        <h2 className='fs-large bold caps'>Reservations</h2>
        <TurnedInNotOutlinedIcon />
      </div>
      {data.length === 0 ? (
        <p>You dont have reservations yet!</p>
      ) : (
        <ul className='reset-list'>
          {data.map((item) => (
            <li className=' margin-bottom-sm' key={item._id}>
              <Link
                className='button button-light'
                to={`/hotels/${item.hotelId}`}>
                <header>
                  <h3 className='margin-bottom-x-sm fs-normal bold upper'>
                    {item.reservesList.name}
                  </h3>
                  <p className='bold caps'>{item.reservesList.city}</p>
                  <p className=''>{item.reservesList.address}</p>
                </header>
                <h4 className='bold'>{item.reservesRooms.title} Room</h4>
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default UserReservations;
