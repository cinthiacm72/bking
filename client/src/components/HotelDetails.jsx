import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";

const HotelDetails = ({ data, handleReserve }) => {
  return (
    <article className='box bg-white'>
      <h2 className='margin-bottom-sm fs-x-huge bold text-dark'>
        {data.title}
      </h2>
      <div className='flex flex-a-center flex-gap-sm margin-bottom-sm'>
        <p className='badge fs-tiny bold caps text-white bg-accent-primary'>
          {data.type} / {data.city}
        </p>
        {data.featured ? (
          <div className='flex flex-gap-x-sm flex-a-center'>
            <FontAwesomeIcon
              className='icon-rounded fs-large text-white bg-danger'
              icon={faHeart}
              title='Featured property'
            />
            <p className='visually-hidden'>Featured property</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <p className='fs-small bold text-accent-primary'>{data.name}</p>

      <p className='margin-bottom-sm padding-bottom-sm fs-small' data-rule>
        <FontAwesomeIcon className='icon' icon={faLocationDot} />
        {data.address}
      </p>
      <p className='margin-bottom-sm padding-bottom-sm fs-small' data-rule>
        <span className='bold'>Excellent location:</span>
        {data.distance} from center.
      </p>
      <p className='margin-bottom-sm padding-bottom-sm fs-small' data-rule>
        <span className='bold'>Price: </span>
        <span className='badge bg-success bold text-white'>
          from ${data.cheapestPrice}
        </span>
      </p>

      <button
        className='margin-bottom-md button button-accent-primary bold'
        onClick={() => handleReserve()}>
        Reserve or Book now!
      </button>
    </article>
  );
};
export default HotelDetails;
