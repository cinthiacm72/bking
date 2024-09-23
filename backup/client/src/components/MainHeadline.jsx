import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const MainHeadline = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increase" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <section className='headline container-fluid-lg'>
      <h1
        className='fs-x-gigantic bolder margin-top-md margin-bottom-sm text-shadow'
        data-text-shadow>
        Let's find
        <br />
        <span className='text-secondary'>your next stay!</span>
      </h1>
      <p className='fs-large margin-top-sm'>
        Search low prices on{" "}
        <span className='bold'>hotels, homes and much more...</span>
      </p>
      {!user && (
        <Link
          to='/register'
          className='button button-dark-lighten margin-top-md bold'>
          <span className='fs-large'>👋 </span> Let's start!
        </Link>
      )}
      <form
        className='search-form margin-top-md fs-normal'
        onSubmit={() => {
          handleSearch();
        }}>
        <label>
          <FontAwesomeIcon className='search-form-icon ' icon={faLocationDot} />
          <input
            type='text'
            placeholder='Where are you going?'
            minLength='3'
            maxLength='15'
            /* pattern='[a-zA-Z0-9-]+' */
            required
            onChange={(e) => setDestination(e.target.value)}
            className='fs-normal'
          />
        </label>
        <div>
          <FontAwesomeIcon className='search-form-icon' icon={faCalendarDays} />
          <span
            onClick={() => setOpenDate(!openDate)}
            className='fs-normal'>{`${format(
            dates[0].startDate,
            "dd/MM/yyyy"
          )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              minDate={new Date()}
              className='search-form-date '
            />
          )}
        </div>
        <div>
          <FontAwesomeIcon className='search-form-icon' icon={faPerson} />
          <span onClick={() => setOpenOptions(!openOptions)}>
            {`${options.adult}  adult . ${options.children} children .
              ${options.room} room`}
          </span>
          {openOptions && (
            <ul className='search-form-options reset-list'>
              <li className='search-form-options-item fs-small'>
                <span className='search-form-options-item-title'>Adult</span>

                <button
                  name='decrease adults'
                  type='button'
                  className='button-round button-round-dark-lighten'
                  disabled={options.adult <= 1}
                  onClick={() => handleOptions("adult", "decrease")}>
                  -
                </button>
                <span className='search-form-options-item-figure'>
                  {options.adult}
                </span>
                <button
                  name='increase adults'
                  type='button'
                  className='button-round button-round-dark-lighten'
                  onClick={() => handleOptions("adult", "increase")}
                  role='button'>
                  +
                </button>
              </li>

              <li className='search-form-options-item fs-small'>
                <span className='search-form-options-item-title'>Children</span>
                <button
                  name='decrease children'
                  type='button'
                  disabled={options.children <= 0}
                  className='button-round button-round-dark-lighten'
                  onClick={() => handleOptions("children", "decrease")}
                  role='button'>
                  -
                </button>
                <span className='search-form-options-item-figure'>
                  {options.children}
                </span>
                <button
                  name='increase children'
                  type='button'
                  className='button-round button-round-dark-lighten'
                  onClick={() => handleOptions("children", "increase")}
                  role='button'>
                  +
                </button>
              </li>

              <li className='search-form-options-item fs-small'>
                <span className='search-form-options-item-title'>Room</span>
                <button
                  name='decrease room'
                  type='button'
                  disabled={options.room <= 1}
                  className='button-round button-round-dark-lighten'
                  onClick={() => handleOptions("room", "decrease")}
                  role='button'>
                  -
                </button>
                <span className='search-form-options-item-figure'>
                  {options.room}
                </span>
                <button
                  name='increase room'
                  type='button'
                  className='button-round button-round-dark-lighten'
                  onClick={() => handleOptions("room", "increase")}
                  role='button'>
                  +
                </button>
              </li>
            </ul>
          )}
        </div>
        <input
          type='submit'
          value='Search new Stay!'
          className='button button-accent'
        />
      </form>
    </section>
  );
};

export default MainHeadline;
