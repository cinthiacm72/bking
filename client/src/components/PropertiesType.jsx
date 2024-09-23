import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";

const PropertiesType = () => {
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState("");

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
    import.meta.env.VITE_BACKEND_URL + "/hotels/find/countbytype"
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

  const images = [
    "../assets/imgs/type-hotel.jpg",
    "../assets/imgs/type-apartment.jpg",
    "../assets/imgs/type-resort.jpg",
    "../assets/imgs/type-villa.jpg",
    "../assets/imgs/type-cabin.jpg",
  ];

  return (
    <>
      <h2 className='margin-top-lg margin-bottom-x-sm fs-x-large text-dark bold'>
        Browse by property type
      </h2>
      <p className='text-dark-lighten margin-bottom-sm'>
        Most popular choices for travellers from Bking.
      </p>
      <ul className='property-list reset-list padding-top-sm'>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((dat, i) => (
              <li
                style={{ overflow: "hidden", width: "auto" }}
                className='property-item'
                key={i}
                onClick={() => setPropertyType(data[i]?.type)}>
                <header>
                  <h3 className='margin-top-x-sm caps bold'>{data[i]?.type}</h3>

                  <p
                    style={
                      {
                        /* lineHeight: "20px", */
                      }
                    }>
                    {`${data[i]?.count} ${data[i]?.type}s`}
                  </p>

                  <button className='button-outline margin-bottom-x-sm fs-x-tiny bold text-dark-lighten'>
                    See properties
                  </button>

                  {/* <button className='button-outline margin-bottom-x-sm fs-x-tiny bold text-dark-lighten'>
                    See properties
                  </button> */}
                </header>

                <div className='property-item-img'>
                  <img src={images[i]} alt='Property image' />
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default PropertiesType;
