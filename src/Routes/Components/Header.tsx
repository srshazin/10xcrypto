import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  // const history = useLocation
  return (
    <nav>
      <Logo />
    </nav>
  );
};

export default Header;
