import React from "react";
import SubNav from "../components/SubNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const navArr = [
  {
    name: "Personal",
    link: "/candidate/add-candidate/personal",
  },
  {
    name: "Notes",
    link: "/candidate/add-candidate/notes",
  },
  {
    name: "Marketing",
    link: "/candidate/add-candidate/marketing",
  },
  {
    name: "Interviews",
    link: "/candidate/add-candidate/interviews",
  },
  {
    name: "Projects",
    link: "/candidate/add-candidate/projects",
  },
  {
    name: "Trainings",
    link: "/candidate/add-candidate/trainings",
  },
  {
    name: "Documents",
    link: "/candidate/add-candidate/documents",
  },
];

const CandidateLayout = ({ children }) => {
  const candidateId = useSelector(state => state.personal.candidateId);
  const basic = useSelector(state => state.personal.basic);

  return (
    <div className="p-5">
      <div className="w-full h-10 justify-between items-center inline-flex my-3">
        <div className="justify-start items-center gap-2 flex">
          <div className="text-neutral-700 text-base font-medium font-['Inter'] tracking-tight">
            Candidate
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="icon">
              <path
                id="Vector 9"
                d="M16 3.00195L7 12.002L16 21.002"
                stroke="#6E6E6E"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </g>
          </svg>
          <div className="text-slate-700 text-base font-medium font-['Inter'] tracking-tight">
            {!candidateId ? 'Add Candidate' : `${basic.firstName} ${basic.lastName}`}
          </div>
        </div>
        <div className="w-[287px] px-4 justify-start items-center gap-4 flex">
          <div className="flex-col justify-center items-start inline-flex">
            <div className="text-center text-neutral-500 text-sm font-normal  leading-tight tracking-tight">
              Trainee
            </div>
            <div className="text-center text-stone-300 text-xs font-normal  leading-none">
              Type{" "}
            </div>
          </div>
          <div className="w-px self-stretch py-4 flex-col justify-start items-center inline-flex">
            <div className="w-2 grow shrink basis-0 origin-top-left rotate-90 border border-stone-300"></div>
          </div>
          <div className="flex-col justify-center items-start inline-flex">
            <div className="text-center text-neutral-500 text-sm font-normal  leading-tight tracking-tight">
              Inactive
            </div>
            <div className="text-center text-stone-300 text-xs font-normal  leading-none">
              Status
            </div>
          </div>
          <div className="w-px self-stretch py-4 flex-col justify-start items-center inline-flex">
            <div className="w-2 grow shrink basis-0 origin-top-left rotate-90 border border-stone-300"></div>
          </div>
          <div className="flex-col justify-center items-start inline-flex">
            <div className="text-center text-neutral-500 text-sm font-normal  leading-tight tracking-tight">
              Kelly Martin
            </div>
            <div className="text-center text-stone-300 text-xs font-normal  leading-none">
              Owner
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-9 border-b flex justify-between items-start ">
        {navArr.map(({ name, link }) => (
          <SubNav name={name} link={link} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default CandidateLayout;
