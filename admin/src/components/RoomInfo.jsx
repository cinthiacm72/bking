import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import Loader from "../components/Loader";

const RoomInfo = ({ data, loading, path }) => {
  return loading ? (
    <Loader />
  ) : (
    <article style={{ flex: "1" }} className='widget'>
      <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
        <h2 className='fs-large bold caps'>{path} Info</h2>
        <HotelOutlinedIcon />
      </div>
      <p>
        <span className='bold'>Description: </span>
        {data.description}
      </p>
      <p>
        <span className='bold'>Max People: </span>
        {data.maxPeople}
      </p>
      <p>
        <span className='bold'>Price: </span>
        {data.price}
      </p>
    </article>
  );
};

export default RoomInfo;
