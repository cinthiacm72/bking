import useFetch from "../hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";

const PropertiesType = () => {
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState("");

  //console.log("propertyTypw: ", propertyType);

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

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/hotels/countByType"
  );

  useEffect(() => {
    if (propertyType) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
      navigate(`/properties-by-type/${propertyType}`, {
        state: { destination, dates, options },
      });
    }
  }, [propertyType]);

  /*   if (type) {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate(`/properties-by-type/${type}`, {
      state: { destination, dates, options },
    });
  } */

  const images = [
    "../assets/imgs/type-hotel.jpg",
    "../assets/imgs/type-apartment.jpg",
    "../assets/imgs/type-resort.jpg",
    "../assets/imgs/type-villa.jpg",
    "../assets/imgs/type-cabin.jpg",
  ];

  return (
    <>
      <h2 className='margin-top-lg fs-x-large text-dark bold'>
        Browse by property type
      </h2>
      {/* <p className='fs-large text-dark-lighten margin-bottom-sm'>
        Most popular choices for travellers from Bking.
      </p> */}
      <ul className='property-list reset-list padding-top-sm' data-rule>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((dat, i) => (
              <li
                className='property-item text-dark-lighten'
                data-mov-scale
                key={i}
                onClick={() => setPropertyType(data[i]?.type)}>
                <header>
                  <h3 className='caps bold'>{data[i]?.type}</h3>
                  <p className='fs-small text'>
                    {`${data[i]?.count} ${data[i]?.type}s`}
                  </p>
                  <button className='button-small-outline margin-bottom-md fs-x-tiny bold cursor'>
                    See properties
                  </button>
                </header>

                <img className='margin-bottom-sm' src={images[i]} alt='' />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default PropertiesType;
