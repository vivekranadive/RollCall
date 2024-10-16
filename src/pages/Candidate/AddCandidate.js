import React from "react";
import SubNav from "../../components/SubNav";
import { Route, Routes } from "react-router-dom";

const AddCandidate = () => {
  return (
    <div className="p-5">
      
        {/* <div className="w-full h-10 justify-between items-center inline-flex my-3">
          <div className="justify-start items-center gap-2 flex">
            <div className="text-neutral-700 text-base font-medium font-['Inter'] tracking-tight">
              Candidate
            </div>
            <div className="w-6 h-6 relative" />
            <div className="text-slate-700 text-base font-medium font-['Inter'] tracking-tight">
              Add Candidate
            </div>
          </div>
          <div className="w-[287px] px-4 justify-start items-center gap-4 flex">
            <div className="flex-col justify-center items-start inline-flex">
              <div className="text-center text-neutral-500 text-sm font-normal font-['Poppins'] leading-tight tracking-tight">
                Trainee
              </div>
              <div className="text-center text-stone-300 text-xs font-normal font-['Poppins'] leading-none">
                Type{" "}
              </div>
            </div>
            <div className="w-px self-stretch py-4 flex-col justify-start items-center inline-flex">
              <div className="w-2 grow shrink basis-0 origin-top-left rotate-90 border border-stone-300"></div>
            </div>
            <div className="flex-col justify-center items-start inline-flex">
              <div className="text-center text-neutral-500 text-sm font-normal font-['Poppins'] leading-tight tracking-tight">
                Inactive
              </div>
              <div className="text-center text-stone-300 text-xs font-normal font-['Poppins'] leading-none">
                Status
              </div>
            </div>
            <div className="w-px self-stretch py-4 flex-col justify-start items-center inline-flex">
              <div className="w-2 grow shrink basis-0 origin-top-left rotate-90 border border-stone-300"></div>
            </div>
            <div className="flex-col justify-center items-start inline-flex">
              <div className="text-center text-neutral-500 text-sm font-normal font-['Poppins'] leading-tight tracking-tight">
                Kelly Martin
              </div>
              <div className="text-center text-stone-300 text-xs font-normal font-['Poppins'] leading-none">
                Owner
              </div>
            </div>
          </div>
        </div>
      
      <SubNav /> */}

    <Routes>
      <Route path="" />
    </Routes>

    </div>
  );
};

export default AddCandidate;
