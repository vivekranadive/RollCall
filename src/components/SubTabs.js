import React from "react";
import { NavLink } from "react-router-dom";

const SubTabs = ({ name, link }) => {
  return (
    <>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? "p-1 border-b-2 border-primary-500  flex px-4 py-2 text-primary-500 justify-start items-start gap-2  text-xs font-bold leading-none"
            : "p-1  flex px-4 py-2 justify-start items-start gap-2 text-text-hint text-xs font-normal leading-none"
        }
      >
        {name}
      </NavLink>
    </>
  );
};

export default SubTabs;
