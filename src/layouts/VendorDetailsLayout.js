import React from "react";
import SubTabs from "../components/SubTabs";
import { Outlet } from "react-router-dom";

const detailsArr = [
  {
    name: "Company Profile",
    link: "company-profile",
  },
  {
    name: "Company Preference",
    link: "company-preference",
  },
  {
    name: "Billing Terms",
    link: "billing-terms",
  },
  {
    name: "Description",
    link: "description",
  },
];

const VendorDetailsLayout = () => {
  return (
    <div>
      <div className="border-b border-stone-300 justify-start items-start inline-flex mt-5">
        {detailsArr.map(({ name, link }) => (
          <SubTabs name={name} link={link} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default VendorDetailsLayout;
