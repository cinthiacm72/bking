import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // console.log("DES:", destination);

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
    <section className='headline | container-fluid-lg'>
      <h1 className='fs-x-gigantic margin-top-lg text-shadow'>
        Let's find your next stay!
      </h1>
      <p className='fs-large margin-top-sm'>
        Search low prices on hotels, homes and much more...
      </p>
      {!user && <button>Sing in / Register</button>}
      <div className='search-form margin-top-lg fs-normal'>
        <label>
          <FontAwesomeIcon className='search-form-icon' icon={faBed} />
          <input
            type='text'
            placeholder='Where are you going?'
            onChange={(e) => setDestination(e.target.value)}
            className='fs-normal'
            //onChange={(e) => setDestination(e.target.value).toLowerCase()}
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
            {`${options.adult} adult . ${options.children} children .
              ${options.room} room`}
          </span>
          {openOptions && (
            <ul className='search-form-options reset-list  bg-light'>
              <li className='search-form-options-item'>
                <span>Adult</span>

                <button
                  name='decrease adults'
                  type='button'
                  disabled={options.adult <= 1}
                  onClick={() => handleOptions("adult", "decrease")}>
                  -
                </button>
                <span>{options.adult}</span>
                <button
                  name='increase adults'
                  type='button'
                  onClick={() => handleOptions("adult", "increase")}
                  role='button'>
                  +
                </button>
              </li>

              <li className='search-form-options-item'>
                <span>Children</span>
                <button
                  name='decrease children'
                  type='button'
                  disabled={options.children <= 0}
                  onClick={() => handleOptions("children", "decrease")}
                  role='button'>
                  -
                </button>
                <span>{options.children}</span>
                <button
                  name='increase children'
                  type='button'
                  onClick={() => handleOptions("children", "increase")}
                  role='button'>
                  +
                </button>
              </li>

              <li className='search-form-options-item'>
                <span>Room</span>
                <button
                  name='decrease room'
                  type='button'
                  disabled={options.room <= 1}
                  onClick={() => handleOptions("room", "decrease")}
                  role='button'>
                  -
                </button>
                <span>{options.room}</span>
                <button
                  name='increase room'
                  type='button'
                  onClick={() => handleOptions("room", "increase")}
                  role='button'>
                  +
                </button>
              </li>
            </ul>
          )}
        </div>
        <button onClick={() => handleSearch()}>Search</button>
      </div>
    </section>
  );
};

export default MainHeadline;
