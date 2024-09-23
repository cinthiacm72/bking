import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import SecondayHeadline from "../components/SecondaryHeadline";
import MainMenu from "../components/MainMenu";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Footer from "../components/Footer";
import MailList from "../components/MailList";
/* import useFetch from "../hooks/useFetch"; */

const HotelsByCity = () => {
  const location = useLocation();

  let city = location.pathname.split("/")[2];

  /*  setDestination(`${city}`); */

  /* console.log(destination); */

  /*  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/hotelsbycity/${city}`
  );  */

  const { data, loading, error, reFetch } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels?city=${city}`
  );

  const handleSubmit = () => {
    reFetch();
  };

  return (
    <>
      <header className='main-header'>
        <MainMenu />
        <section className='headline | container-fluid-lg padding-bottom-x-lg text-shadow'>
          <h1 className='fs-x-gigantic bolder margin-top-md text-secondary caps'>
            {`${city.replace("%20", " ")}`}
            {/*   {`${city[0].toUpperCase() + city.substring(1).replace("%20", " ")}`} */}
          </h1>
          <p className='fs-x-huge bolder text-white '>
            is one of our trending destination!
          </p>
        </section>
      </header>
      <section
        className='hotels container-fluid-lg margin-top-md'
        data-translate-sm>
        {/*      <form
          className='form box bg-light-darken box-shadow'
          onSubmit={handleSubmit}>
          <h2 className='margin-bottom-sm fs-large bolder text-dark-lighten'>
            Search
          </h2>
          <label>
            Destination
            <input
              type='text'
              placeholder={destination}
              className='bold margin-bottom-sm'
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
        </form> */}
        <section className='box bg-white box-shadow'>
          <h2 className='fs-x-large bolder text-dark-lighten margin-bottom-md'>
            Hotels
          </h2>
          <ul className='hotels-list reset-list'>
            {loading
              ? "Loading..."
              : data.map((item) => (
                  <li className='hotel-item' key={item._id}>
                    <img src={item.images[0]} alt='' />

                    <header>
                      <h2 className='margin-bottom-sm fs-large text-dark-lighten bolder'>
                        {item.name}
                      </h2>
                      <p className='margin-bottom-sm fs-small caps'>
                        {item.city}
                      </p>
                      {/* <p className='bold'>{item.description}</p> */}
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

export default HotelsByCity;
