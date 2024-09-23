import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
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
import SearchHeader from "./SearchHeader";

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
      <SearchHeader />
      <div className='search-form-wrapper'>
        <form className='search-form fs-normal' onSubmit={() => handleSearch()}>
          <div>
            <label>
              <FontAwesomeIcon
                className='search-form-icon '
                icon={faLocationDot}
              />
              <input
                type='text'
                placeholder='* Where are you going?'
                minLength='3'
                maxLength='15'
                required
                onChange={(e) => setDestination(e.target.value)}
                className='fs-normal'
              />
            </label>
          </div>
          <div>
            <FontAwesomeIcon
              className='search-form-icon'
              icon={faCalendarDays}
            />
            <span
              onClick={() => {
                setOpenDate(!openDate);
                openOptions ? setOpenOptions(false) : "";
              }}
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
            <FontAwesomeIcon className='search-form-icon' icon={faUser} />
            <span
              onClick={() => {
                setOpenOptions(!openOptions);
                openDate ? setOpenDate(false) : "";
              }}>
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
                    className='button-sm button-sm-dark'
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
                    className='button-sm button-sm-dark'
                    onClick={() => handleOptions("adult", "increase")}
                    role='button'>
                    +
                  </button>
                </li>

                <li className='search-form-options-item fs-small'>
                  <span className='search-form-options-item-title'>
                    Children
                  </span>
                  <button
                    name='decrease children'
                    type='button'
                    disabled={options.children <= 0}
                    className='button-sm button-sm-dark'
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
                    className='button-sm button-sm-dark'
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
                    className='button-sm button-sm-dark'
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
                    className='button-sm button-sm-dark'
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
            className='button button-accent-primary bold'
          />
        </form>
        <p className='fs-tiny margin-top-sm'>
          <span className='text-danger'>*</span> Location is required.
        </p>
      </div>
    </section>
  );
};

export default MainHeadline;
