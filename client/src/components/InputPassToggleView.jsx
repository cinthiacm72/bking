import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const InputPassToggleView = ({ handleChange }) => {
  const [type, setType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<FontAwesomeIcon icon={faEyeSlash} />);

  const handleToggleEye = () => {
    if (type === "password") {
      setEyeIcon(<FontAwesomeIcon icon={faEye} />);
      setType("text");
    } else {
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
      setType("password");
    }
  };

  return (
    <label style={{ position: "relative" }} className='block margin-bottom-sm'>
      Password:
      <input
        className='block'
        type={type}
        placeholder='Enter your password'
        id='password'
        required
        onChange={handleChange}
      />
      <span
        style={{ position: "absolute", top: "35px", right: "10px" }}
        onClick={handleToggleEye}>
        {eyeIcon}
      </span>
    </label>
  );
};

{
  /* <label>
  Password:
  <input
    type='password'
    placeholder='Enter your password'
    id='password'
    required
    onChange={handleChange}
  />
</label>; */
}

export default InputPassToggleView;
