import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import SingleHeader from "./SingleHeader";
import UserInfo from "./UserInfo";
import UserReservations from "./UserReservations";

const SingleUser = () => {
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
        <SingleHeader
          img={data.image}
          title={data.username}
          text={data.email}
        />
      )}

      <div className='flex flex-gap-md flex-wrap'>
        <UserInfo data={data} loading={loading} path={path} />
        <UserReservations id={id} />
      </div>
      {error && <div className='message message-danger'>{error.message}</div>}
    </section>
  );
};

export default SingleUser;
