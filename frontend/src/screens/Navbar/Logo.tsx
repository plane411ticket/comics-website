import LogoWeb from "@/assets/Logo_real.png";
import MobileLogo from "@/assets/mobilelogo.png";
import {Link} from "react-router-dom";
const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
    
      <img
        src={LogoWeb}
        alt="Logo"
        className="hidden sm:block"
        style={{ width: 150, height: 80 }}
      />
      <img
        src={MobileLogo}
        alt="Mobile Logo"
        className="sm:hidden"
        style={{ width: 75, height: 60 }}
      />

    </Link>
  );
};

export default Logo;
