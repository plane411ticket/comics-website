import LogoWeb from "@/assets/logo.png";
import MobileLogo from "@/assets/mobilelogo.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
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
    </div>
  );
};

export default Logo;
