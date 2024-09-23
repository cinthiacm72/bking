import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import SingleHeader from "./SingleHeader";
import RoomInfo from "./RoomInfo";

const SingleRoom = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/${path}/${id}`
  );

  return (
    <section className='main-section'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SingleHeader title={data.title} text={data.country} />
          <div className='flex flex-gap-md flex-wrap'>
            <RoomInfo data={data} loading={loading} path={path} />
          </div>
        </>
      )}
      {error && <div className='message message-danger'>{error.message}</div>}
    </section>
  );
};

export default SingleRoom;
