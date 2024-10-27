import React from "react";
import CircleProgressBar from "../../components/CircleProgressBar";
import ProgressBar from "../../components/ProgressBar";
import RangeSelector from "../../components/RangeSelector";

const Dashboard = () => {
  const percentage = 40;

  const radius = 70; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeWidth = 8; // Width of the circle bar
  const trackWidth = strokeWidth + 4; // Width of the outer border

  const trackDasharray = `${circumference} ${circumference}`;

  const barDasharray = `${circumference} ${circumference}`;
  const barDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="p-3">
      {/* <h5>Dashboard</h5> */}

      <div className="flex items-center bg-auxiliary-50 rounded-lg p-3 ">
        <h5 className="px-3 whitespace-nowrap">Active Trips</h5>

        <div className="grid grid-cols-3 gap-5 w-full  rounded-lg">
          <div className="h-60 bg-white col-span-1 p-5 flex flex-col justify-between rounded-lg w-full">
            <div>
              <span className="bg-blue-100 p-2 rounded-lg text-blue-900">
              Mrs. Q's 4th Grade Art Class
              </span>
              <h3 className="mt-3"></h3>
              <p className="text-sm text-gray-500 mt-1">
              </p>
            </div>
            <span className="text-gray-500">More</span>
          </div>
          <div className="h-60 bg-white col-span-1 p-5 flex flex-col justify-between rounded-lg w-full">
            <div>
              <span className="bg-blue-100 p-2 rounded-lg text-blue-900">
              Mr. J's 8th Grade History Class
              </span>
              <h3 className="mt-3"></h3>
              <p className="text-sm text-gray-500 mt-1">
              </p>
            </div>
            <span className="text-gray-500">More</span>
          </div>
          <div className="h-60 bg-white col-span-1 p-5 flex flex-col justify-between rounded-lg w-full">
            <div>
              <span className="bg-blue-100 p-2 rounded-lg text-blue-900">
                Mr. V's Band Class
              </span>
              <h3 className="mt-3"></h3>
              <p className="text-sm text-gray-500 mt-1">
              </p>
            </div>
            <span className="text-gray-500">More</span>
          </div>{" "}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="border border-1 p-3 rounded-lg flex flex-col justify-between ">
          <h5>Art Trip Permission Form Progress </h5>
          <div className="w-full flex justify-center items-center">
            {/* <CircleProgressBar progress={percentage} size={250} /> */}
            <CircleProgressBar
              progress={47}
              size={200}
              bgColor="bg-success-500"
              stroke="#36B37E"
              emptyStroke="#EBF7F2"
            />
          </div>
          <div className="w-full flex justify-around items-center">
            <div className="flex justify-center items-center gap-1">
              <span className="w-4 h-4 bg-success-500 rounded-full"></span>
              <p>Parents Signed</p>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="w-4 h-4 bg-success-50 rounded-full"></span>{" "}
              <p>Parents Have Not Signed</p>
            </div>
          </div>
          <div className="border border-1 p-3 rounded-lg">
            <h3>Mrs. Q's 4th Grade Art Class</h3>
            <p className="text-sm"></p>
          </div>
        </div>
        <div className="border border-1 p-3 rounded-lg flex flex-col justify-between">
          <h5>White House Permission Form Progress </h5>
          <div className="w-full flex justify-center items-center">
            {/* <CircleProgressBar progress={percentage} size={250} /> */}
            <CircleProgressBar
              progress={75}
              size={200}
              bgColor="bg-danger-500"
              stroke="#D03423"
              emptyStroke="#F6D6D3"
            />
          </div>
          <div className="w-full flex justify-around items-center">
            <div className="flex justify-center items-center gap-1">
              <span className="w-4 h-4 bg-danger-500 rounded-full"></span>
              <p>Parents Signed</p>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="w-4 h-4 bg-danger-50 rounded-full"></span>{" "}
              <p>Parents Have Not Signed</p>
            </div>
          </div>
          <div className="border border-1 p-3 rounded-lg">
            <h3>Mr. J's 8th Grade History Class</h3>
            <p className="text-sm"></p>
          </div>{" "}
        </div>
        <div className="">
          <div className="p-3 rounded-lg border border-1 mb-5">
            <h5 className="mb-5">Proposed Trips</h5>

            <div className="border border-1 p-3 rounded-lg mb-3 ">
              <h3>Music Department</h3>
              <p className="text-sm">Radio City Music Hall</p>
            </div>
            <div className="border border-1 p-3 rounded-lg">
              <h3>Mr. Doe's 10th Grade Science Class</h3>
              <p className="text-sm">Nature Preserve</p>
            </div>
          </div>
        </div>
        <div className="border border-1 p-3 rounded-lg flex flex-col justify-between ">
          <h5>Number of Trips per Grade </h5>
          <div className="w-full flex flex-col justify-between gap-6">
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between text-xs">
                <label for="basic-range-slider-usage" className="">
                Kindergarten
                </label>
                <p className="text-text-hint"></p>
              </div>
              <input
                type="range"
                className="w-full border-none outline-none rounded-full overflow-hidden cursor-pointer  disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                id="basic-range-slider-usage"
                // className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between text-xs">
                <label for="basic-range-slider-usage" className="">
                Grades 1-5
                </label>
                <p className="text-text-hint"></p>
              </div>
              <input
                type="range"
                className="w-full border-none outline-none rounded-full overflow-hidden cursor-pointer  disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                id="basic-range-slider-usage"
                // className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between text-xs">
                <label for="basic-range-slider-usage" className="">
                Grades 6-8
                </label>
                <p className="text-text-hint"></p>
              </div>
              <input
                type="range"
                className="w-full border-none outline-none rounded-full overflow-hidden cursor-pointer  disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                id="basic-range-slider-usage"
                // className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between text-xs">
                <label for="basic-range-slider-usage" className="">
                Grades 9-12
                </label>
                <p className="text-text-hint"></p>
              </div>
              <input
                type="range"
                className="w-full border-none outline-none rounded-full overflow-hidden cursor-pointer  disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                id="basic-range-slider-usage"
                // className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
              />
            </div>
          </div>
          <div className="flex justify-between items-center p-3">
            <h3 className="text-black text-4xl font-normal font-['Inter'] tracking-tight">
              
            </h3>
            <button className="text-white text-base font-normal font-['Inter'] tracking-tight bg-secondary-500 py-3 px-6 rounded-lg ">
              
            </button>
          </div>
        </div>
        <div className="border border-1 p-3 rounded-lg flex flex-col justify-between gap-3">
          <h5>Total School Budget Spendage </h5>
          <div className="w-full  flex justify-center">
            <ProgressBar percentage={57} />
          </div>
          <div className="border border-1 p-3 rounded-lg">
            <h3></h3>
            <p className="text-sm"></p>
          </div>
          <div className="border border-1 p-3 rounded-lg">
            <h3></h3>
            <p className="text-sm"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
