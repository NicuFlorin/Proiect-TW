import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/alimente" className="link">
            Alimentele mele
          </Link>
        </li>
        <li>
          <Link to="/prieteni" className="link">
            Prieteni
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};
export default Navbar;
