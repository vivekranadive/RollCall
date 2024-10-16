import React from "react";
import { Outlet } from "react-router-dom";
import SubTabs from "../components/SubTabs";

const tabArr = [
  {
    name: "Marketing History",
    link: "marketing-history",
  },
  {
    name: "Marketing List",
    link: "marketing-list",
  },
  {
    name: "Notes",
    link: "notes",
  },
  {
    name: "Jobs",
    link: "jobs",
  },
];

const CandidMarketLayout = () => {
  return (
    <div>
      <div className="border-b border-stone-300 justify-start items-start inline-flex mt-5">
        {tabArr.map(({ name, link }) => (
          <SubTabs name={name} link={link} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default CandidMarketLayout;
