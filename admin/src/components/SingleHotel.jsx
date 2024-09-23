import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import SingleHeader from "./SingleHeader";
import SingleGalleryImages from "./SingleGalleryImages";
import HotelInfo from "./HotelInfo";

const SingleHotel = () => {
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
          <SingleHeader img={data.images} title={data.name} text={data.city} />
          <div className='flex flex-gap-md flex-wrap'>
            <HotelInfo data={data} loading={loading} path={path} />
            <SingleGalleryImages data={data} path={path} id={id} />
          </div>
        </>
      )}
      {error && <div className='message message-danger'>{error.message}</div>}
    </section>
  );
};

export default SingleHotel;
