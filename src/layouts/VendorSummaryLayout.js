import React from "react";
import { Outlet } from "react-router-dom";
import SubTabs from "../components/SubTabs";

const summaryArr = [
  {
    name: "Account Information",
    link: "account-info",
  },
  {
    name: "Contact",
    link: "contact",
  },
  {
    name: "Billing Address",
    link: "billing",
  },
];

const VendorSummaryLayout = () => {
  return (
    <div>
      <div className="border-b border-stone-300 justify-start items-start inline-flex mt-5">
        {summaryArr.map(({ name, link }) => (
          <SubTabs name={name} link={link} />
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default VendorSummaryLayout;
