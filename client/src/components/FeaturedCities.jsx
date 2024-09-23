import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";

const FeaturedCities = () => {
  const [destination, setDestination] = useState("");

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

  const navigate = useNavigate();

  const {
    data: photos,
    loading: loadinPhotos,
    error: errorPhotos,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/cities");

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/featuredCities"
  );

  let mergedDataCities = [];

  for (let i = 0; i < 4; i++) {
    mergedDataCities.unshift({
      ...data.find((el) => el._id === photos[i].city),
      ...photos[i],
    });
  }

  mergedDataCities.sort((a, b) => a.count - b.count).reverse();

  const { dispatch } = useContext(SearchContext);

  useEffect(() => {
    if (destination) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
      navigate("/hotels", { state: { destination, dates, options } });
    }
  }, [destination]);

  return (
    <>
      <h2 className='margin-bottom-x-sm fs-x-huge bold'>
        Last trending cities
      </h2>
      <p className='margin-bottom-sm '>
        <FontAwesomeIcon className='icon' icon={faLocationDot} />
        Inspiring most popular choices for travellers from across the world.
      </p>
      <ul className='featured-list reset-list padding-bottom-sm'>
        {loading ? (
          <img src='/assets/loader.svg' alt='Loader image' />
        ) : (
          <>
            {mergedDataCities.map((item, index) => (
              <li
                className='featured-item'
                key={index}
                onClick={() => {
                  setDestination(item.city);
                }}>
                <header className='featured-item-header '>
                  <h3 className='fs-x-large bold caps text-white'>
                    {item.city}
                  </h3>
                  <p className='margin-bottom-x-sm fs-tiny text-light caps'>
                    <FontAwesomeIcon className='icon' icon={faLocationDot} />
                    {item.country}
                  </p>
                  <div className='flex flex-column flex-a-start'>
                    <button className='button-outline fs-x-tiny bold text-white'>
                      See properties
                    </button>
                  </div>
                </header>
                <p className='item-badge badge inline-block bg-success fs-x-tiny text-light bold margin-bottom-sm'>
                  {item.count} properties
                </p>

                <img src={item.image} alt='City image' />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default FeaturedCities;
