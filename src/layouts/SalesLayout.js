import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const SalesLayout = ({ children }) => {
  const location = useLocation();
  const segmentsArr = location.pathname.split("/");

  const endSegment = segmentsArr[segmentsArr.length - 1];
  // console.log(location);
  console.log(endSegment);

  return (
    <div>
      <div className="w-96 h-10 px-4 my-3 justify-start items-center gap-2 inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <div className="text-neutral-700 text-base font-medium font-['Inter'] tracking-tight">
            Sales
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

          <div className="text-slate-700 text-base font-medium font-['Inter'] tracking-tight capitalize">
            {endSegment}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SalesLayout;
