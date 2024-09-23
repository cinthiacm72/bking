import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/hotels?featured=true&limit=4"
  );

  //console.log("Dat", data);

  return (
    <>
      <h2 className='margin-top-lg margin-bottom-x-sm fs-x-large text-dark bold'>
        Homes guests love
      </h2>
      <p className='text-dark-lighten'>The favourites choices of our guests!</p>
      <p className='margin-bottom-sm fs-tiny text-dark-lighten'>
        ⓘ Indicates the average price per day per person.
      </p>
      <ul className='fav-list reset-list padding-top-sm padding-bottom-lg'>
        {loading ? (
          "loading"
        ) : (
          <>
            {data.map((item) => (
              <li className='fav-item' data-mov-scale key={item._id}>
                <header className='fav-item-header text-white'>
                  <h3 className='fav-item-title caps bold'>{item.name}</h3>
                  <p className='margin-bottom-x-sm fs-small caps'>
                    <FontAwesomeIcon className='icon' icon={faLocationDot} />
                    {item.city}
                  </p>
                  <p className='margin-bottom-x-sm fs-small bold text-accent-light'>
                    Starting from ${item.cheapestPrice}
                  </p>
                  {item.raiting && (
                    <div>
                      <button>{item.raiting}</button>
                      <span className='fs-small'>Excellent</span>
                    </div>
                  )}
                  {/* </Link> */}
                  <button className='button-small-outline fs-x-tiny bold text-white cursor'>
                    See property
                  </button>
                </header>
                <div className='item-badge icon-rounded fs-x-tiny text-danger bg-white'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <img src={item.images[0]} alt='Property image' />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default FeaturedProperties;
