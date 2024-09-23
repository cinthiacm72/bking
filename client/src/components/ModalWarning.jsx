import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalWarning = ({ setOpenWarningModal }) => {
  const navigate = useNavigate();

  return (
    <section className='modal'>
      <div className='modal-container modal-container-min'>
        <div className='margin-bottom-sm text-right'>
          <button
            className='button-sm button-sm-dark'
            onClick={() => setOpenWarningModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
            <span className='visually-hidden'>Close modal window</span>
          </button>
        </div>
        <div className='text-center' style={{ width: "340px" }}>
          <p className='badge margin-bottom-md text-white bg-warning bold'>
            Days cannot be zero (0). Please go to search form and selecte a days
            range.
          </p>
          <button
            className='go-back-button button button-dark margin-bottom-x-sm | fs-x-tiny bold'
            onClick={() => navigate(-1)}>
            Go to Hotel section Search form.
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModalWarning;
