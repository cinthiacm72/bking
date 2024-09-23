import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const FeaturedProperties = () => {
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

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

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/hotels?featured=true&limit=5"
  );

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

  return (
    <>
      <h2 className='margin-top-lg margin-bottom-x-sm fs-x-large  bold'>
        Homes guests love
      </h2>
      <p>The favourites choices of our guests!</p>
      <p className='margin-bottom-sm fs-tiny'>
        ⓘ Indicates the average price per day per person.
      </p>
      <ul className='fav-list reset-list padding-top-sm padding-bottom-sm'>
        {loading ? (
          "loading"
        ) : (
          <>
            {data.map((item) => (
              <li
                className='fav-item'
                key={item._id}
                onClick={() => setHotelId(item._id)}>
                <header className='fav-item-header text-white'>
                  <h3 className='fav-item-title caps bold'>{item.name}</h3>
                  <p className='margin-bottom-x-sm fs-small caps'>
                    <FontAwesomeIcon className='icon' icon={faLocationDot} />
                    {item.city}
                  </p>
                  <p className='margin-bottom-x-sm fs-tiny bold text-accent-primary-light'>
                    Starting from ${item.cheapestPrice}
                  </p>
                  {item.raiting && (
                    <div>
                      <button>{item.raiting}</button>
                      <span className='fs-small'>Excellent</span>
                    </div>
                  )}

                  <button className='button-outline fs-x-tiny bold text-white cursor'>
                    See property
                  </button>
                </header>
                <div className='item-badge icon-rounded fs-small text-white bg-danger'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <img src={item.images[0]} alt='Property image' />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default FeaturedProperties;
