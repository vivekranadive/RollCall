import React from "react";
import SubTabs from "../components/SubTabs";
import { Outlet } from "react-router-dom";

const tabArr = [
  {
    name: "Basic",
    link: "basic",
  },
  {
    name: "Professional",
    link: "professional",
  },
  {
    name: "Profile",
    link: "profile",
  },
  {
    name: "Emergency Contacts",
    link: "emergency-contacts",
  },
];

const CandidPersonalLayout = () => {
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

export default CandidPersonalLayout;
