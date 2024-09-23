import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const ModalGallery = ({
  setOpenGalleryModal,
  handleArrows,
  imageGallery,
  imageIndex,
}) => {
  return (
    <section className='modal'>
      <div className='modal-container modal-container-full'>
        <button
          style={{ placeSelf: "start end" }}
          className='button-sm button-sm-dark modal-close-button'
          onClick={() => setOpenGalleryModal(false)}>
          <FontAwesomeIcon icon={faXmark} />
          <span className='visually-hidden'>Close image modal window</span>
        </button>
        {imageGallery[imageIndex] ? (
          <img src={imageGallery[imageIndex]} alt='Property detail image' />
        ) : (
          <img src='/assets/loader.svg' alt='Loader image' />
        )}

        <div style={{ placeSelf: "end center" }} className='modal-controllers'>
          <button
            className='modal-prev-button button-sm button-sm-dark'
            onClick={() => handleArrows("prev")}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className='visually-hidden'>Previous image</span>
          </button>
          <p className='fs-small bold text-center'>
            {imageGallery.length} / {imageIndex}
          </p>
          <button
            className='button-sm button-sm-dark'
            onClick={() => handleArrows("next")}>
            <FontAwesomeIcon icon={faArrowRight} />
            <span className='visually-hidden'>Next image</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModalGallery;
