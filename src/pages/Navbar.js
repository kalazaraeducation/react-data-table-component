import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-yellow-500 w-100 p-5">
      <ul className="flex justify-center items-center gap-x-10">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/expanded-rows">E-Rows</NavLink>
        </li>
        <li>
          <NavLink to="/remote-pagination">R-Pagination</NavLink>
        </li>
        <li>
          <NavLink to="/filtering">Filtering</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
