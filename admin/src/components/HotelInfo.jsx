import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import Loader from "../components/Loader";

const HotelInfo = ({ data, loading, path }) => {
  return loading ? (
    <Loader />
  ) : (
    <article style={{ flex: "1" }} className='widget'>
      <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
        <h2 className='fs-large bold caps'>{path} Info</h2>
        <ApartmentOutlinedIcon />
      </div>
      <p className='caps'>
        <span className='bold'>City: </span>
        {data.city}
      </p>
      <p className='caps'>
        <span className='bold'>Address: </span>
        {data.address}
      </p>
      <p className='caps'>
        <span className='bold'>Type: </span>
        {data.type}
      </p>
      <p>
        <span className='bold'>Distance from city </span>
        {data.distance} mts
      </p>
      <p>
        <span className='bold'>Cheapest Price </span>${data.cheapestPrice}
      </p>
    </article>
  );
};

export default HotelInfo;
