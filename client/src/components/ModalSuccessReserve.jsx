import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalSuccessReserve = ({
  days,
  allDates,
  selectedRooms,
  setOpenSuccessReserveModal,
  setOpenReserveModal,
}) => {
  const { dates, options } = useContext(SearchContext);

  return (
    <section className='modal'>
      <div className='modal-container modal-container-min'>
        <div className='text-right'>
          <button
            className='button-sm button-sm-dark'
            onClick={() => {
              setOpenSuccessReserveModal(false);
              setOpenReserveModal(false);
            }}>
            <FontAwesomeIcon icon={faXmark} />
            <span className='visually-hidden'>Close modal window</span>
          </button>
        </div>
        <div>
          <div style={{ width: "340px" }}>
            <p className='badge margin-bottom-md margin-top-sm text-white bg-success bold'>
              You have successfully reserved for:
              <br /> {days} nights!
            </p>
            <h4 className='margin-bottom-sm fs-x-huge bold'>
              Reservation details
            </h4>
            <div className='margin-bottom-sm padding-bottom-sm' data-rule>
              <p className='bold'>Reserve dates:</p>
              {allDates.map((date, index) => (
                <p key={index}>{new Date(date).toLocaleDateString()}</p>
              ))}
            </div>
            <p className=' margin-bottom-md padding-bottom-sm' data-rule>
              <span className='bold'>Your options: </span> Adults:
              {options.adult} - Children: {options.children} - Rooms:
              {options.room}
            </p>
            {selectedRooms.map((item) => item.room)}
          </div>
          <Link className='button button-dark fs-tiny text-center' to='/'>
            Close window and go to Home page
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ModalSuccessReserve;
