import React from "react";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";

const Trainings = () => {
  return (
    <div className="p-5">
      <div className="border border-gray-300 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>

          <button
            // onClick={openModal}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add Trainings
          </button>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-5  text-left py-3 pl-3 pr-6 bg-secondary-50 text-base h-12">
                {/* <th>Faculty Name</th>
                <th>Technologies</th>
                <th>Mobile Number</th>
                <th>Email Address</th>
                <th>Status</th> */}
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center  overflow-y-scroll w-full h-screen"
              // style={{ height: "90vh" }}
            >
              {[1, 2, 3].map(() => (
                <tr className="grid grid-cols-5  items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full h-8">
                  {/* <td className="">
                    <h3 className="text-base text-auxiliary-800">
                      Cody Fisher
                    </h3>
                  </td>
                  <td className="">Technology</td>
                  <td className="">+91 9999999999</td>
                  <td className="">
                    <p>emailadd@gmail.com</p>
                  </td>

                  <td className="flex">
                    <p className="border border-danger-500 text-danger-500 text-xs py-2 px-6 rounded-full">
                      Not Selected
                    </p>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full h-14 py-2 bg-secondary-50 justify-end items-center gap-4 inline-flex">
          <div className="w-24 bg-white flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-10 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch h-10 px-4 py-2 rounded-lg border border-neutral-500 justify-between items-center inline-flex">
                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal font-['Poppins'] leading-tight">
                  15
                </div>
                <div className="w-6 h-6 relative" />
              </div>
            </div>
          </div>
          <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-normal">
            1-15{" "}
          </div>
          <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-normal">
            of
          </div>
          <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-normal">
            126
          </div>
          <div className="w-6 h-6 relative" />
          <div className="w-6 h-6 relative" />
        </div>
      </div>
    </div>
  );
};

export default Trainings;
