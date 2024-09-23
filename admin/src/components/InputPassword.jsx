import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const InputPassword = ({ handleChange }) => {
  const [type, setType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<VisibilityOffOutlinedIcon />);

  const handleToggleEye = () => {
    if (type === "password") {
      setEyeIcon(<VisibilityOutlinedIcon />);
      setType("text");
    } else {
      setEyeIcon(<VisibilityOffOutlinedIcon />);
      setType("password");
    }
  };

  return (
    <label style={{ position: "relative" }} className='block margin-bottom-sm'>
      Password:
      <input
        className='block'
        type={type}
        id='password'
        onChange={handleChange}
      />
      <span
        style={{ position: "absolute", top: "32px", right: "10px" }}
        onClick={handleToggleEye}>
        {eyeIcon}
      </span>
    </label>
  );
};

export default InputPassword;
