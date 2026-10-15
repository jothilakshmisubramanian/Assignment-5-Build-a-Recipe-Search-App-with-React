
import { NavLink } from "react-router-dom";

function Navbar({ favouritesCount = 0 }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        🍲 Recipe Finder
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/recipes">
          Recipes
        </NavLink>

        <NavLink to="/favourites">
          Favourites ({favouritesCount})
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
