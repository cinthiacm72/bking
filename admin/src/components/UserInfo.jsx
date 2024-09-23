import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Loader from "../components/Loader";

const UserInfo = ({ data, loading, path }) => {
  return loading ? (
    <Loader />
  ) : (
    <article style={{ flex: "1" }} className='widget'>
      <div className='widget-info flex flex-a-center flex-jc-between margin-bottom-sm'>
        <h2 className='fs-large bold caps'>{path} Info</h2>
        <PersonOutlinedIcon />
      </div>
      <p>
        <span className='bold'>City: </span>
        {data.city}
      </p>
      <p>
        <span className='bold'>Country: </span>
        {data.country}
      </p>
      <p>
        <span className='bold'>Phone: </span>
        {data.phone}
      </p>
    </article>
  );
};

export default UserInfo;
