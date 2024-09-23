import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MailList from "../components/MailList";
import MainMenu from "../components/MainMenu";
import MainHeadline from "../components/MainHeadline";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const FeaturedProperty = () => {
  const location = useLocation();

  let hotelSelectedId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    import.meta.env.VITE_BACKEND_URL + `/hotels/find/${hotelSelectedId}`
  );

  let imageGallery = [];

  data.images ? (imageGallery = data.images) : "";

  const [imageIndex, setImageIndex] = useState(0);

  const [openImageModal, setOpenImageModal] = useState(false);

  const handleClick = (index) => {
    setImageIndex(index);
    setOpenImageModal(true);
  };

  const handleArrows = (arrow) => {
    let newImageIndex;

    if ((arrow = "prev")) {
      newImageIndex =
        imageIndex === 0 ? data.images.length - 1 : imageIndex - 1;
      setImageIndex(newImageIndex);
    } else {
      newImageIndex =
        imageIndex === data.images.length - 1 ? 0 : imageIndex + 1;
      setImageIndex(newImageIndex);
    }
  };

  //console.log("data", data);
  return (
    <>
      {openImageModal && (
        <section className='modal'>
          <div className='modal-container'>
            <button onClick={() => setOpenImageModal(false)}>Close</button>
            <img src={data.images[imageIndex]} alt='' />
            <button onClick={() => handleArrows("prev")}>Previous</button>
            <button onClick={() => handleArrows("next")}>Next</button>
          </div>
        </section>
      )}
      <MainMenu />
      {loading ? (
        "loading..."
      ) : (
        <section className='hotel-details container-fluid-lg margin-top-md'>
          <h1 className='fs-x-large bold'>{data.title}</h1>

          <Link to='/'>Go to Home to reseve!</Link>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            {data.address}
          </p>
          <p>Excellent location - {data.distance} from center</p>
          <p>{data.description} </p>
          <section className='hotel-gallery'>
            {imageGallery.map((item, index) => (
              <img src={item} key={index} onClick={() => handleClick(index)} />
            ))}
          </section>
          <article className='hotel-price'>
            <div>
              <h2 className='fs-large bold'>Stay in the heart of Krakoe</h2>
              <p>{data.description}</p>
            </div>

            <div className='bg-accent-2'>
              <h3 className='bold'>Perfect for a {/* {days} */} night stay!</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                quasi dicta ducimus ipsa odit delectus praesentium ullam alias
                minima doloremque natus, eos reprehenderit excepturi fuga!
                Suscipit perspiciatis voluptatum distinctio qui!
              </p>
              {/*   <p className='fs-x-large bold'>
                ${days * data.cheapestPrice * options.room}
                <span className='fs-normal'>- {days} nights</span>
              </p> */}
            </div>
          </article>
        </section>
      )}
      <MailList />
      <Footer />
    </>
  );
};

export default FeaturedProperty;
