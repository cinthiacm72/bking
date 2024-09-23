import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faUser, faChildren } from "@fortawesome/free-solid-svg-icons";

const HotelReserveDetails = ({ data, days, handleReserve }) => {
  const { dates, options } = useContext(SearchContext);

  return (
    <article className='box bg-white'>
      <div>
        {days === 0 ? (
          <h3 className='margin-bottom-sm fs-x-huge bold'>
            Perfect {data.type} to stay!
          </h3>
        ) : (
          <h3 className='margin-bottom-sm fs-x-huge bold'>
            Perfect for a {days} night stay!
          </h3>
        )}
        <p className='margin-bottom-md'>{data.description}</p>

        <div className='flex flex-gap-md flex-wrap'>
          <div className='box flex-grow bg-light text-center'>
            <p className='margin-bottom-x-sm fs-x-large'>
              <span className='fs-x-huge bolder'>
                ${days * data.cheapestPrice * options.room}/{days}
              </span>{" "}
              nights
            </p>
            <p className='fs-small margin-bottom-md'>
              * Free cancelarion and it includes leaves and fees.
            </p>
            <button
              className='margin-bottom-md button button-accent-primary bold'
              onClick={() => handleReserve()}>
              Reserve or Book now!
            </button>
          </div>

          <div className='box flex-grow bg-light'>
            <p
              className='margin-bottom-sm padding-bottom-sm fs-small'
              data-rule>
              <FontAwesomeIcon className='icon' icon={faUser} />
              <span className=' bold'>Adults: </span>
              {options.adult}
            </p>
            <p
              className='margin-bottom-sm padding-bottom-sm fs-small'
              data-rule>
              <FontAwesomeIcon className='icon' icon={faChildren} />
              <span className=' bold'>Children: </span>
              {options.children}
            </p>
            <p
              className='margin-bottom-sm padding-bottom-sm fs-small'
              data-rule>
              <FontAwesomeIcon className='icon' icon={faBed} />
              <span className=' bold'>Rooms: </span>
              {options.room}
            </p>
            <p className='badge fs-tiny bold text-center text-white bg-success'>
              Reserve for {days} nights
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelReserveDetails;
