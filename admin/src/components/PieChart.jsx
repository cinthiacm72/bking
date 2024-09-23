import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

const PieChart = () => {
  const {
    data: dataReservation,
    loading: loadingReservation,
    error: errorReservation,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + `/reserves`);

  const {
    data: dataRoom,
    loading: loadingRoom,
    error: errorRoom,
  } = useFetch(import.meta.env.VITE_BACKEND_URL + "/rooms");

  let pieAverage = 0;

  if (!loadingReservation && !loadingRoom) {
    pieAverage = Math.round((dataReservation.length * 100) / dataRoom.length);
  }

  return (
    <article style={{ flex: "1" }} className='widget '>
      {loadingReservation && loadingRoom ? (
        <Loader />
      ) : (
        <>
          <div className='margin-bottom-md'>
            <h2 className='fs-large bold'>Porperties booked</h2>
            <p>
              Rooms currently booked:
              <span className='bold'> {dataReservation.length}</span>
            </p>
            <p>
              Rooms listed:
              <span className='bold'> {dataRoom.length}</span>
            </p>
          </div>
          <div
            style={{
              width: "100%",
            }}
            className='margin-bottom-md'>
            <div
              style={{
                marginInline: "auto",
                background: `conic-gradient(#e8bbe8 , hsl(246, 76%, 63%) ${pieAverage}% ${pieAverage}%, hsla(224, 50%, 65%, 20%) ${pieAverage}%)`,
              }}
              className='pie hollow'>
              <p className='fs-x-huge bold'>{pieAverage}%</p>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default PieChart;
