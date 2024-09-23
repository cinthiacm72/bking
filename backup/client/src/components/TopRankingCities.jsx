import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const TopRankingCities = () => {
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + "/cities"
  );

  return (
    <section className='padding-bottom-md' data-rule>
      <h2 className='margin-top-lg margin-bottom-x-sm fs-x-large text-dark bold'>
        Top 15 trending destinations
      </h2>
      <p className='text-dark-lighten'>
        Our favorite destinations! Pick a vibe and explore the top destinations
        around the world.
      </p>
      <p className='margin-bottom-sm fs-tiny text-dark-lighten'>
        ⓘ Indicates the average price per day per person.
      </p>
      {loading ? (
        "Loading..."
      ) : (
        <ul className='ranking-grid-list reset-list'>
          {data.map((item, index) => (
            <li
              className='ranking-grid-item flex flex-j-content bg-white'
              key={index}>
              <header>
                <h3 className='fs-small bold text-accent'>
                  <FontAwesomeIcon className='icon' icon={faLocationDot} />
                  {item._id}
                </h3>
                <p className='fs-tiny'>{item.count} properties</p>
              </header>
              <div>
                <p className='fs-tiny'>Price:</p>
                <p className='badge fs-x-tiny bold text-white bg-success'>
                  from ${item.minPrice}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TopRankingCities;
