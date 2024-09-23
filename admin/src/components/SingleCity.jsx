import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import SingleHeader from "./SingleHeader";
import SingleGalleryImages from "./SingleGalleryImages";

const SingleCity = () => {
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
          <SingleHeader
            img={data.image}
            title={data.city}
            text={data.country}
          />
          <div className='flex flex-gap-md flex-wrap'>
            <SingleGalleryImages data={data} path={path} id={id} />
          </div>
        </>
      )}
      {error && <div className='message message-danger'>{error.message}</div>}
    </section>
  );
};

export default SingleCity;
