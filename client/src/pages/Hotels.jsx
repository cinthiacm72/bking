import Menu from "../components/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Footer from "../components/Footer";
/* import MailList from "../components/MailList"; */
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import InnerHeadline from "../components/InnerHeadline";

const Hotels = () => {
  const location = useLocation();

  const { dispatch } = useContext(SearchContext);

  const [destination, setDestination] = useState(location.state.destination);

  const [dates, setDates] = useState(location.state.dates);

  const [options, setOptions] = useState(location.state.options);

  const [openDate, setOpenDate] = useState(false);

  const [min, setMin] = useState(undefined);

  const [max, setMax] = useState(undefined);

  const navigate = useNavigate();

  let newDestination;

  const handleDestinationChange = (e) => {
    newDestination = e.target.value;
  };

  const { data, loading, error, reFetch } = useFetch(
    import.meta.env.VITE_BACKEND_URL +
      `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDestination) {
      setDestination(newDestination);
    }
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });

    navigate("/hotels", { state: { destination, dates, options } });
    reFetch();
  };

  return (
    <>
      <header className='main-header'>
        <Menu />
        <InnerHeadline
          data={data}
          title={destination}
          textSuccess=' is your next destination!'
          textFailure=' does not have properties.'
        />
      </header>
      <main
        className='column-2 container-fluid-lg margin-top-md'
        data-translate-y-lg>
        <form
          className='inner-search-form box bg-white'
          data-box-shadow
          onSubmit={(e) => handleSubmit(e)}>
          <label>
            Destination
            <input
              id='destination'
              type='text'
              placeholder={destination}
              minLength='3'
              maxLength='15'
              className='bold margin-bottom-x-sm'
              onChange={handleDestinationChange}
            />
          </label>
          <label>
            Check-in Date
            <p
              onClick={() => setOpenDate(!openDate)}
              className='check-in-dates margin-bottom-x-sm date-rage'>{`${format(
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
          <fieldset>
            <legend className='bold'>Options</legend>
            <div className='inner-search-form-option-list'>
              <div className='inner-search-form-option-item'>
                <p className='fs-small'>
                  Min price <small>per night</small>
                </p>
                <input
                  onChange={(e) => setMin(e.target.value - 1)}
                  min={0}
                  type='number'
                  className='bold margin-bottom-x-sm'
                />
              </div>
              <div className='inner-search-form-option-item'>
                <p className='fs-small'>
                  Max price <small>per night</small>
                </p>
                <input
                  onChange={(e) => setMax(Number.parseInt(e.target.value) + 1)}
                  min={0}
                  type='number'
                  className='bold margin-bottom-x-sm'
                />
              </div>
              <div className='inner-search-form-option-item'>
                <p className='fs-small'>Adult</p>
                <input
                  type='number'
                  min={1}
                  placeholder={options.adult}
                  className='bold margin-bottom-x-sm'
                  onChange={(e) =>
                    setOptions({ ...options, adult: e.target.value })
                  }
                />
              </div>
              <div className='inner-search-form-option-item'>
                <p className='fs-small'>Children</p>
                <input
                  type='number'
                  min={0}
                  placeholder={options.children}
                  className='bold margin-bottom-x-sm'
                  onChange={(e) =>
                    setOptions({ ...options, children: e.target.value })
                  }
                />
              </div>
              <div className='inner-search-form-option-item'>
                <p className='fs-small'>Room</p>

                <input
                  type='number'
                  min={1}
                  placeholder={options.room}
                  className='bold margin-bottom-x-sm'
                  onChange={(e) =>
                    setOptions({ ...options, room: e.target.value })
                  }
                />
              </div>
            </div>
          </fieldset>

          <input
            type='submit'
            value='Search properties'
            className='margin-top-sm button button-accent-primary bold'
          />
        </form>
        <section>
          {data.length === 0 ? (
            <p className='badge inline-block fs-tiny bold upper text-white bg-warning'>
              Sorry, we don't have properties for your search right now.
              <br /> Try again!
            </p>
          ) : (
            ""
          )}
          <ul className='hotel-list reset-list'>
            {loading
              ? "Loading..."
              : data.map((item) => (
                  <li className='hotel-item' key={item._id}>
                    <img src={item.images[0]} alt='' />

                    <div className='hotel-item-info'>
                      <header>
                        <h2 className='fs-x-large text-dark bold'>
                          {item.name}
                        </h2>
                        <p className=' fs-small bold caps text-accent-primary'>
                          {item.type}
                        </p>
                        <p className='margin-bottom-sm fs-small caps'>
                          <FontAwesomeIcon
                            className='icon | text-dark'
                            icon={faLocationDot}
                          />
                          {item.city}
                        </p>
                        <span className='badge fs-x-tiny bold text-white bg-success'>
                          Free cancelation
                        </span>
                      </header>
                      <div className='hotel-item-price'>
                        {item.rating && (
                          <p className='bold'>
                            Excellent
                            <button className='fs-small bold text-light bg-accent-primary'>
                              {item.rating}
                            </button>
                          </p>
                        )}

                        <p className='fs-x-large bolder'>
                          ${item.cheapestPrice}
                        </p>
                        <p className='margin-bottom-sm fs-x-tiny bold'>
                          Includes leaves and fees
                        </p>
                        <Link to={`/hotels/${item._id}`}>
                          <button className='button button-accent-primary fs-small bold'>
                            See availiability
                          </button>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Hotels;
