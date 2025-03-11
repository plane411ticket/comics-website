import { Link } from "react-router-dom";
import { navbarItems } from "../../components/Navbarapi";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          My<span className="text-yellow-300">Manga</span>
        </Link>

        {/* Menu */}
        <ul className="flex space-x-6">
          {navbarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="hover:text-yellow-300 transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
