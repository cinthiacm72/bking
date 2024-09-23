import useFetch from "../hooks/useFetch";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Loader from "../components/Loader";

const RankingChart = () => {
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/featuredCities"
  );

  return (
    <div
      style={{ flex: "1" }}
      className='widget flex flex-a-center  flex-gap-md flex-wrap'>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div style={{ flex: "2" }}>
            <header className='margin-bottom-sm'>
              <h2 className='fs-large bold'>Top Cities </h2>
              <p>Total of properties per cities. </p>
            </header>

            <ul className='reset-list'>
              {data.map((item, index) => (
                <li
                  style={{ pointerEvents: "none" }}
                  className='flex flex-jc-between margin-bottom-x-sm button-sm button-sm-light'
                  key={index}>
                  <p className='caps bold'>{item._id}</p>
                  <p>{item.count}</p>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flexGrow: "1" }} className='widget-info text-center'>
            <FavoriteBorderOutlinedIcon />
            <p className=''>
              <span className='block fs-large bold caps'>{data[0]._id}</span>
              is the users favourite city
              <br />
              with <span className='bold'>{data[0].count}</span> properties.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RankingChart;
