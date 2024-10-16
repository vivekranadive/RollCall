import React from "react";
import SubNav from "../components/SubNav";
import { Outlet } from "react-router-dom";

const vendorArr = [
  {
    name: "Summary",
    link: "summary",
  },
  {
    name: "Details",
    link: "details",
  },
  {
    name: "Files",
    link: "files",
  },
];

const VendorsLayout = () => {
  return (
    <div className="px-5">
      <div className="border-b border-stone-300 flex gap-12 mt-5">
        {vendorArr.map(({ name, link }) => (
          <SubNav name={name} link={link} />
        ))}
      </div>
      <Outlet/>
    </div>
  );
};

export default VendorsLayout;
