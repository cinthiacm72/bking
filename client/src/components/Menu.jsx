import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MenuAuth from "./MenuAuth";
import MenuNav from "./MenuNav";

const Menu = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <MenuAuth user={user} />
      <MenuNav />
    </>
  );
};

export default Menu;
