import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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

  const photos = [
    {
      city: "buenos aires",
      country: "argentina",
      image: "../assets/cities/buenos-aires.jpg",
    },

    {
      city: "berlin",
      country: "Germany",
      image: "../assets/cities/berlin.jpg",
    },
    {
      city: "london",
      country: "England",
      image: "../assets/cities/london.jpg",
    },

    {
      city: "paris",
      country: "France",
      image: "../assets/cities/paris.jpg",
    },

    {
      city: "madrid",
      country: "spain",
      image: "../assets/cities/madrid.jpeg",
    },
  ];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/cities"
  );

  let mergedDataCities = [];

  for (let i = 0; i < data.length; i++) {
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
      <h2 className='margin-bottom-x-sm fs-x-huge text-dark bold'>
        Trending destinations
      </h2>
      <p className='margin-bottom-sm text-dark-lighten'>
        <FontAwesomeIcon className='icon' icon={faLocationDot} />
        Most popular choices for travellers from
        <span className='bold'> Bking</span>.
      </p>
      <ul className='featured-list reset-list padding-bottom-md' data-rule>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {mergedDataCities.map((item, index) => (
              <li
                className='featured-item'
                data-mov-scale
                key={index}
                onClick={() => {
                  setDestination(item.city);
                }}>
                <header className='featured-item-header '>
                  <h3 className='bold caps text-white'>{item.city}</h3>
                  <p className='margin-bottom-x-sm fs-tiny text-light caps'>
                    <FontAwesomeIcon className='icon' icon={faLocationDot} />
                    {item.country}
                  </p>
                  <div className='flex flex-column flex-a-start'>
                    {/*  <p className='badge inline-block  bg-success fs-x-tiny text-light bold margin-bottom-sm'>
                      {item.count} properties
                    </p> */}
                    <button className='button-small-outline fs-x-tiny bold text-white'>
                      See properties
                    </button>
                  </div>
                </header>
                {/* <div className='featured-item-icon icon-rounded fs-x-tiny text-white bg-accent'>
                  <FontAwesomeIcon icon={faStar} />
                </div> */}
                <p className='item-badge badge inline-block  bg-success fs-x-tiny text-light bold margin-bottom-sm'>
                  {item.count} properties
                </p>
                <img src={item.image} alt='' />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default FeaturedCities;
