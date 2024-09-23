import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

const ModalReserve = ({
  setOpenReserveModal,
  days,
  allDates,
  dataHotelRooms,
  handleSelectedRoom,
  isAvailable,
  handleReserveRoom,
  setRoomId,
}) => {
  const { dates, options } = useContext(SearchContext);

  return (
    <section className='modal'>
      <div className='modal-container modal-container-min'>
        <div className='text-right'>
          <button
            className='button-sm button-sm-dark'
            onClick={() => setOpenReserveModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
            <span className='visually-hidden'>Close modal window</span>
          </button>
        </div>
        {dataHotelRooms.length === 0 ? (
          <p
            style={{ width: "340px" }}
            className='badge bold text-white bg-warning'>
            Sorry, there are not rooms at this moment. Please, try later.
          </p>
        ) : (
          <>
            <div style={{ width: "340px" }}>
              <h3 className='margin-bottom-sm fs-x-huge bold'>
                Select your rooms:
              </h3>
              <p className='margin-bottom-x-sm fs-small'>
                Reserved dates for:
                <span className='badge bold text-white bg-success'>
                  {days} nights
                </span>
              </p>
              <p className='margin-bottom-x-sm fs-tiny bold'>
                {allDates.map((date, index) => (
                  <span key={index}>
                    {new Date(date).toLocaleDateString()},{" "}
                  </span>
                ))}
              </p>
              <p className='badge fs-small margin-bottom-md text-white bg-accent-primary'>
                <span className='bold'>Your options: </span> Adults:{" "}
                {options.adult}- Children: {options.children} - Rooms:
                {options.room}
              </p>
              <ul className='grid-list reset-list'>
                {dataHotelRooms.map((item) => (
                  <li className='grid-item bg-white' key={item._id}>
                    <h3
                      className='margin-bottom-sm padding-bottom-sm fs-large bold'
                      data-rule>
                      {item.title}
                    </h3>
                    <p className='margin-bottom-sm fs-small'>
                      {item.description}
                    </p>
                    <p className='fs-small'>
                      <span className='bold'>Max People: </span>
                      {item.maxPeople}
                    </p>
                    <p className='margin-bottom-sm fs-small'>
                      <span className='bold'>Price: </span>${item.price}
                    </p>
                    <p className='fs-small bold'>Rooms:</p>
                    {item.roomNumbers.map((roomNumber) => (
                      <div className='flex' key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input
                          type='checkbox'
                          value={roomNumber._id}
                          onChange={handleSelectedRoom}
                          disabled={!isAvailable(roomNumber)}
                          onClick={() => setRoomId(item._id)}
                        />
                        {!isAvailable(roomNumber) && (
                          <div className='badge fs-x-tiny bold text-white bg-light-darken'>
                            Unvailabled
                          </div>
                        )}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-gap-sm '>
              <button
                className='margin-top-md button button-accent-primary bold'
                onClick={() => {
                  handleReserveRoom();
                }}>
                Confirm reservation!
              </button>
              <button
                className='margin-top-md button button-dark bold'
                onClick={() => setOpenReserveModal(false)}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default ModalReserve;
