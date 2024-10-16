import React from "react";
import { Link, NavLink } from "react-router-dom";

const SubNav = ({ name, link }) => {
  return (
    <>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? "p-2 bg-primary-500 rounded-tl-lg rounded-tr-lg justify-start items-start flex text-white text-sm font-normal  leading-tight tracking-tight"
            : "p-2 rounded-tl-lg rounded-tr-lg justify-start items-start flex text-neutral-500 text-sm font-normal  leading-tight tracking-tight"
        }
      >
        {name}
      </NavLink>
    </>
  );
};

export default SubNav;
