import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ name, path }) => {
  return (
    <Link
      to={path}
      className="inline-flex items-center px-1 pt-1 mr-3
      font-semibold text-3xl leading-5
      text-white"
    >
      {name}
    </Link>
  );
};

export default NavItem;
