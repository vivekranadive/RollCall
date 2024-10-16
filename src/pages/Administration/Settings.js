import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

const Settings = () => {
  return (
    <div className="p-5">
      {" "}
      <div className="border border-gray-300 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>

          <button
            disabled
            // onClick={openModal}
            className="py-3 px-6 bg-neutral-50 text-text-muted rounded-full"
          >
            <span className="mr-3">+</span>
            Add Settings
          </button>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-9 h-12 text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                {/* <th>Name (User ID)</th>
                <th>Email ID</th>
                <th>Login Type</th>
                <th>Role</th>
                <th>Created By</th>
                <th>Date Created</th>
                <th>Updated By</th>
                <th>Updated Date</th>
                <th>Status</th> */}
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col  items-center  overflow-y-scroll w-full h-screen"
              // style={{ height: "90vh" }}
            >
              {[1, 2, 3].map(() => (
                <tr className="grid grid-cols-9 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full h-12 text-sm">
                  {/* <td className="">
                    <h3 className="text-base text-auxiliary-800">Some Name</h3>
                    <p className="text-text-hint text-xs">salesforce</p>
                  </td>
                  <td className="">
                    <p className="truncate">bessiecooper@gmail.com</p>
                  </td>
                  <td className="">Type</td>
                  <td className="">Sales</td>
                  <td className="">Sam</td>
                  <td className="">10/10/10</td>
                  <td className="">Jhon</td>
                  <td className="">10/10/10</td>

                  <td className="flex">
                    <p className="border border-success-700 text-success-700 py-2 px-6 rounded-full">
                      Active
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

export default Settings;
