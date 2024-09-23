import MainHeadline from "../components/MainHeadline";
import MainMenu from "../components/MainMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Footer from "../components/Footer";
import MailList from "../components/MailList";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const PropertiesByType = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  let propertyType = location.pathname.split("/")[2];

  let typeTitle = propertyType + "s";

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);

  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  console.log("Dispatch: ", destination);

  /* data: typePropertyData,
    loading: typePropertyLoading,
    error: typePropertyError, */

  /*  const {
    data,
    loading,
    error,
  } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/hotelsbytype/${propertyType}`
  );
 */
  // console.log("DES: ", destination);
  let url;

  !destination
    ? (url =
        import.meta.env.VITE_BACKEND_URL +
        `/propertytypes/${propertyType}?&min=${min || 0}&max=${max || 999}`)
    : (url =
        import.meta.env.VITE_BACKEND_URL +
        `/propertytypes/${propertyType}?city=${destination}&min=${
          min || 0
        }&max=${max || 999}`);

  const { data, loading, error, reFetch } = useFetch(
    url
    /*  import.meta.env.VITE_BACKEND_URL +
      `/propertytypes/${propertyType}? city=${destination}&min=${
        min || 0
      }&max=${max || 999}` */
  );

  console.log("Data:", data);

  // New destination input
  let newDestination;

  const handleDestinationChange = (e) => {
    newDestination = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate(`/properties-by-type/${propertyType}`, {
      state: { destination, dates, options },
    });
    reFetch();
  };

  //`/hotels/hotelsbytype/${propertyType}in=${min || 0}&max=${max || 999}`

  return (
    <>
      <header className='main-header'>
        <MainMenu />
        <section className='headline | container-fluid-lg padding-bottom-x-lg text-shadow'>
          <h1 className='margin-top-md fs-x-gigantic bolder text-secondary caps'>
            {typeTitle}
          </h1>
          <p className='fs-x-huge bolder text-white '>are the best to stay!</p>
        </section>
      </header>
      <section
        className='hotels container-fluid-lg margin-top-md'
        data-translate-sm>
        <form
          className='form box bg-light-darken box-shadow'
          onSubmit={handleSubmit}>
          <h2 className='margin-bottom-sm fs-large bolder text-dark-lighten'>
            Search
          </h2>
          <label>
            Destination
            <input
              id='destination'
              type='text'
              placeholder={destination}
              className='bold margin-bottom-sm'
              onChange={(e) => setDestination(e.target.value)}
            />
          </label>
          <label>
            Check-in Date
            <p
              onClick={() => setOpenDate(!openDate)}
              className='check-in-dates margin-bottom-sm date-rage bg-white'>{`${format(
              dates[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</p>
            {openDate && (
              <DateRange
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />
            )}
          </label>
          <label>
            Options
            <p className='fs-small'>
              Min price <small>per night</small>
            </p>
            <input
              onChange={(e) => setMin(e.target.value - 1)}
              min={0}
              type='number'
              className='bold margin-bottom-sm'
            />
            <p className='fs-small'>
              Max price <small>per night</small>
            </p>
            <input
              onChange={(e) => setMax(Number.parseInt(e.target.value) + 1)}
              min={0}
              type='number'
              className='bold margin-bottom-sm'
            />
            <p className='fs-small'>Adult</p>
            <input
              type='number'
              min={1}
              placeholder={options.adult}
              className='bold margin-bottom-sm'
            />
            <p className='fs-small'>Children</p>
            <input
              type='number'
              min={0}
              placeholder={options.children}
              className='bold margin-bottom-sm'
            />
            <p className='fs-small'>Room</p>
            <input
              type='number'
              min={1}
              placeholder={options.room}
              className='bold margin-bottom-sm'
            />
          </label>

          <input
            type='submit'
            value='Search properties'
            className='margin-top-md button button-accent'
          />
        </form>
        <section className='box bg-white box-shadow'>
          {!data ? (
            <h2 className='badge margin-bottom-md fs-large bg-warning'>
              Sorry, we don't have properties for your search right now.
            </h2>
          ) : (
            <h2 className='margin-bottom-md fs-x-large bolder caps text-dark-lighten '>
              Properties
            </h2>
          )}
          {/*   <h2 className='margin-bottom-md fs-x-large bolder caps text-dark-lighten '>
            {!typePropertyLoading
              ? "Sorry, we don't have properties for your search right now."
              : "Properties"}
          </h2> */}
          <ul className='hotels-list reset-list'>
            {loading
              ? "Loading..."
              : data.map((item) => (
                  <li className='hotel-item' key={item._id}>
                    <img src={item.images[0]} alt='' />

                    <header>
                      <h2 className='fs-large text-dark-lighten bolder'>
                        {item.name}
                      </h2>
                      <p className='margin-bottom-sm fs-small bold caps text-accent'>
                        {item.type}
                      </p>
                      <p className='margin-bottom-sm fs-small caps'>
                        <FontAwesomeIcon
                          className='icon | text-dark-lighten'
                          icon={faLocationDot}
                        />
                        {item.city}
                      </p>
                      <span className='button-small-outline fs-x-tiny upper bold text-accent'>
                        Free cancelation
                      </span>
                    </header>
                    <div>
                      {item.rating && (
                        <p className='bold'>
                          Excellent
                          <button className='fs-small bold text-light bg-accent'>
                            {item.rating}
                          </button>
                        </p>
                      )}

                      <p className='fs-large bolder text-accent'>
                        ${item.cheapestPrice}
                      </p>
                      <p className='margin-bottom-sm fs-x-tiny bold'>
                        Includes leaves and fees
                      </p>
                      <Link to={`/hotels/${item._id}`}>
                        <button className='button button-accent fs-small'>
                          See availiability
                        </button>
                      </Link>
                    </div>
                  </li>
                ))}
          </ul>
        </section>
      </section>
      <MailList />
      <Footer />
    </>
  );
};

export default PropertiesByType;
