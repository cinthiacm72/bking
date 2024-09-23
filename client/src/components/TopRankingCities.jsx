import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";

const TopRankingCities = () => {
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
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/featuredCities"
  );

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
    <section>
      <h2 className='margin-top-lg margin-bottom-x-sm fs-x-large  bold'>
        Top 12 trending destinations
      </h2>
      <p>
        Our favorite destinations! Pick a vibe and explore the top destinations
        around the world.
      </p>
      <p className='margin-bottom-sm fs-tiny'>
        ⓘ Indicates the average price per day per person.
      </p>
      {loading ? (
        "Loading..."
      ) : (
        <ul className='grid-list reset-list'>
          {data.map((item, index) => (
            <li
              className='grid-item flex flex-j-content bg-white'
              key={index}
              onClick={() => {
                setDestination(item._id);
              }}>
              <header>
                <h3 className='fs-small bold text-accent'>
                  <FontAwesomeIcon className='icon' icon={faLocationDot} />
                  {item._id}
                </h3>
                <p className='fs-tiny'>{item.count} properties</p>
              </header>
              <div>
                <p className='fs-tiny'>Price:</p>
                <p className='badge fs-x-tiny bold text-white bg-success'>
                  from ${item.minPrice}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TopRankingCities;
