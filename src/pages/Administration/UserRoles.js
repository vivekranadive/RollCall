import React, { useState } from "react";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiDelete, FiSearch } from "react-icons/fi";
import { RiSoundModuleLine } from "react-icons/ri";
import StarRating from "../../components/StarRating";
import { Link } from "react-router-dom";
import Modal from "../../components/ModalComponents/Modal";
import { userRoleSeleceted } from "../../data";
import { createUserRole } from "../../api/administration";

const UserRoles = () => {
  const initialUserRole = {
    company: "",
    role: "",
    description: "",
    access: "",
    userStatus: "",
  };

  const [buttonId, setButtonId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(initialUserRole);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewPermission = () => {
    setButtonId("new-permission");
    openModal();
  };
  const handleEditPermission = () => {
    setButtonId("edit-permission");
    openModal();
  };
  const handleAddUserRole = () => {
    setButtonId("add-user-role");
    openModal();
  };

  console.log(buttonId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRole((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  console.log(userRole);

  const handleSubmit = async () => {
    const response = await createUserRole(userRole);
    closeModal();
    setUserRole(initialUserRole);
  };

  return (
    <div className="px-5">
      {buttonId === "new-permission" ? (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col gap-4">
            <div className="w-full ">
              <h3 className="text-base bg-neutral-50 px-4 font-bold">
                User Role : Admin
              </h3>
            </div>
            <div className="flex justify-between items-center p-2">
              <h3 className="text-base font-medium">Permissions</h3>
              <div className="flex">
                <div className="flex flex-col">
                  <label>Add</label>
                  <div className="flex items-center gap-3">
                    <input
                      className="w-56 outline-none border rounded-lg focus:ring-0"
                      type="text"
                      placeholder="add"
                    />
                    <button className="py-2 px-6 bg-secondary-700 text-white rounded-full ">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full my-3">
              <h3 className="text-base bg-neutral-50 px-4 font-normal p-3">
                Menu Options : Control
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {userRoleSeleceted.map((role, index) => {
                return (
                  <h5
                    key={index}
                    className="text-text-hint w-64 p-3 text-sm capitalize"
                  >
                    {role}
                  </h5>
                );
              })}
            </div>
            <div className="flex justify-between items-center p-2">
              <h3 className="text-base font-medium">Functionalty</h3>
              <div className="flex">
                <div className="flex flex-col">
                  <label>Add</label>
                  <div className="flex items-center gap-3">
                    <input
                      className="w-56 outline-none border rounded-lg focus:ring-0"
                      type="text"
                      placeholder="add"
                    />
                    <button className="py-2 px-6 bg-secondary-700 text-white rounded-full ">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full my-3">
              <h3 className="text-base bg-neutral-50 px-4 font-normal p-3">
                Functionality Access Control
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {userRoleSeleceted.map((role, index) => {
                return (
                  <h5
                    key={index}
                    className="text-text-hint w-64 p-3 text-sm capitalize"
                  >
                    {role}
                  </h5>
                );
              })}
            </div>
            <div className="flex justify-between p-6 mt-6">
              <button
                onClick={closeModal}
                className="border border-secondary-800 text-secondary-800 py-2 px-5 rounded-full"
              >
                Close
              </button>
              <button
                onClick={closeModal}
                className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      ) : buttonId === "edit-permission" ? (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col gap-4">
            <div className="w-full ">
              <h3 className="text-base bg-neutral-50 px-4 font-bold">
                User Role : Admin
              </h3>
            </div>
            <div className="flex justify-between items-center p-2">
              <h3 className="text-base font-medium">Permissions</h3>
              <div className="flex">
                <div className="flex flex-col">
                  <label>Add</label>
                  <div className="flex items-center gap-3">
                    <input
                      className="w-56 outline-none border rounded-lg focus:ring-0"
                      type="text"
                      placeholder="add"
                    />
                    <button className="py-2 px-6 bg-secondary-700 text-white rounded-full ">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full my-3">
              <h3 className="text-base bg-neutral-50 px-4 font-normal p-3">
                Menu Options : Control
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {userRoleSeleceted.map((role, index) => {
                return (
                  <div key={index} className="w-64 p-3">
                    <input
                      type="checkbox"
                      value={role}
                      className="focus:ring-0 rounded-sm outline-none "
                    />
                    <label className="text-text-hint capitalize pl-3">
                      {role}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center p-2">
              <h3 className="text-base font-medium">Functionalty</h3>
              <div className="flex">
                <div className="flex flex-col">
                  <label>Add</label>
                  <div className="flex items-center gap-3">
                    <input
                      className="w-56 outline-none border rounded-lg focus:ring-0"
                      type="text"
                      placeholder="add"
                    />
                    <button className="py-2 px-6 bg-secondary-700 text-white rounded-full ">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full my-3">
              <h3 className="text-base bg-neutral-50 px-4 font-normal p-3">
                Functionality Access Control
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {userRoleSeleceted.map((role, index) => {
                return (
                  <div key={index} className="w-64 p-3">
                    <input
                      type="checkbox"
                      value={role}
                      className="focus:ring-0 rounded-sm outline-none "
                    />
                    <label className="text-text-hint capitalize pl-3">
                      {role}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between p-6 mt-6">
              <button
                onClick={closeModal}
                className="border border-secondary-800 text-secondary-800 py-2 px-5 rounded-full"
              >
                Close
              </button>
              <button
                onClick={closeModal}
                className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      ) : buttonId === "add-user-role" ? (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="">
            <form className="flex flex-col gap-7 ">
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col w-72">
                  <label htmlFor="company" className="text-text-hint mb-1">
                    Company
                  </label>
                  <input
                    onChange={handleChange}
                    value={userRole.company}
                    name="company"
                    type="text"
                    placeholder="Company"
                    id="company"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label htmlFor="role" className="text-text-hint mb-1">
                    Role
                  </label>
                  <input
                    onChange={handleChange}
                    value={userRole.role}
                    name="role"
                    type="text"
                    placeholder="Role"
                    id="role"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col col-span-3 ">
                  <label htmlFor="description" className="text-text-hint mb-1">
                    Description
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={userRole.description}
                    name="description"
                    placeholder="Description"
                    id="description"
                    className="focus:outline-none border  rounded-lg "
                    rows={4}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col col-span-3 ">
                  <label htmlFor="access" className="text-text-hint mb-1">
                    Access
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={userRole.access}
                    name="access"
                    placeholder="Access"
                    id="access"
                    className="focus:outline-none border  rounded-lg "
                    rows={4}
                  />
                </div>
              </div>
              <div className="w-64">
                <label className="text-text-hint ">Job Type</label>
                <ul className="grid grid-cols-3 mt-1">
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={userRole.userStatus === "active"}
                      className="sr-only peer"
                      type="radio"
                      value="active"
                      name="userStatus"
                      id="active"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="active"
                    >
                      Active
                    </label>
                  </li>

                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={userRole.userStatus === "iaActive"}
                      className="sr-only peer"
                      type="radio"
                      value="iaActive"
                      name="userStatus"
                      id="inactive"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="inactive"
                    >
                      InActive
                    </label>
                  </li>
                </ul>
              </div>
            </form>
            <div className="flex justify-between p-6 mt-6">
              <button
                onClick={closeModal}
                className="border border-secondary-800 text-secondary-800 py-2 px-5 rounded-full"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      ) : null}

      <div className="border  border-gray-300 mt-5 rounded-lg  ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex items-center gap-3">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={handleNewPermission}
              className=" bg-secondary-50 text-secondary-800 rounded-full py-2 px-6"
            >
              New Permissions
            </button>
            <button
              onClick={handleEditPermission}
              id="add_jobs"
              className=" border border-secondary-700 text-secondary-700 bg-white py-2 px-5 rounded-full font-normal "
            >
              Edit Permissions
            </button>
            <button
              onClick={handleAddUserRole}
              id="add_new_interview"
              className=" bg-secondary-700 text-white py-2 px-5 rounded-full font-normal"
            >
              <span className="text-lg mr-3">+</span>
              Add User Role
            </button>
          </div>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-8 gap-1 text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th>Role</th>
                <th>Company</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Date Created</th>
                <th>Updated By</th>
                <th>Updated Date</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center  overflow-y-scroll w-full h-screen"
              // style={{ height: "90vh" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <tr
                  className={`grid grid-cols-8 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm  
                  `}
                  // ${
                  //   isActive ? "bg-auxiliary-50" : "bg-white"
                  // }
                >
                  <td className="flex gap-2 ">
                    <div>
                      <input
                        type="checkbox"
                        className="rounded form-checkbox focus:outline-none focus-visible:outline-none  "
                        // onClick={(e) => handleCheck(e.target.checked)}
                      />
                    </div>
                    <div>
                      <h3 className="text-auxiliary-800 text-base">
                        Sales Tech
                      </h3>
                    </div>
                  </td>
                  <td className="">Type</td>
                  <td className="">Sales</td>
                  <td className="">Sam</td>
                  <td className="">10/10/10</td>
                  <td className="">Jhon</td>
                  <td className="">10/10/10</td>

                  <td className="flex justify-between items-center">
                    <p className="py-2 px-5 border border-success-700 text-success-700 text-xs rounded-full ">
                      Remote
                    </p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icon">
                        <g id="Icon">
                          <path
                            d="M10 2.25403C9.58579 2.25403 9.25 2.58981 9.25 3.00403V3.75403H5C4.58579 3.75403 4.25 4.08981 4.25 4.50403C4.25 4.91824 4.58579 5.25403 5 5.25403H19C19.4142 5.25403 19.75 4.91824 19.75 4.50403C19.75 4.08981 19.4142 3.75403 19 3.75403H14.75V3.00403C14.75 2.58981 14.4142 2.25403 14 2.25403H10Z"
                            fill="#00ABB6"
                          />
                          <path
                            d="M10 10.654C10.4142 10.654 10.75 10.9898 10.75 11.404L10.75 18.404C10.75 18.8182 10.4142 19.154 10 19.154C9.58579 19.154 9.25 18.8182 9.25 18.404L9.25 11.404C9.25 10.9898 9.58579 10.654 10 10.654Z"
                            fill="#00ABB6"
                          />
                          <path
                            d="M14.75 11.404C14.75 10.9898 14.4142 10.654 14 10.654C13.5858 10.654 13.25 10.9898 13.25 11.404V18.404C13.25 18.8182 13.5858 19.154 14 19.154C14.4142 19.154 14.75 18.8182 14.75 18.404V11.404Z"
                            fill="#00ABB6"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.99143 7.9212C6.03363 7.54138 6.35468 7.25403 6.73684 7.25403H17.2632C17.6453 7.25403 17.9664 7.54138 18.0086 7.9212L18.2087 9.72255C18.5715 12.9879 18.5715 16.2833 18.2087 19.5487L18.189 19.726C18.045 21.0222 17.0405 22.0557 15.7489 22.2365C13.2618 22.5847 10.7382 22.5847 8.25108 22.2365C6.95954 22.0557 5.955 21.0222 5.81098 19.726L5.79128 19.5487C5.42846 16.2833 5.42846 12.9879 5.79128 9.72255L5.99143 7.9212ZM7.40812 8.75403L7.2821 9.8882C6.93152 13.0434 6.93152 16.2278 7.2821 19.383L7.30181 19.5603C7.37011 20.1751 7.84652 20.6652 8.45905 20.751C10.8082 21.0799 13.1918 21.0799 15.5409 20.751C16.1535 20.6652 16.6299 20.1751 16.6982 19.5604L16.7179 19.383C17.0685 16.2278 17.0685 13.0434 16.7179 9.8882L16.5919 8.75403H7.40812Z"
                            fill="#00ABB6"
                          />
                          <path
                            d="M10 2.25403C9.58579 2.25403 9.25 2.58981 9.25 3.00403V3.75403H5C4.58579 3.75403 4.25 4.08981 4.25 4.50403C4.25 4.91824 4.58579 5.25403 5 5.25403H19C19.4142 5.25403 19.75 4.91824 19.75 4.50403C19.75 4.08981 19.4142 3.75403 19 3.75403H14.75V3.00403C14.75 2.58981 14.4142 2.25403 14 2.25403H10Z"
                            stroke="#00ABB6"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 10.654C10.4142 10.654 10.75 10.9898 10.75 11.404L10.75 18.404C10.75 18.8182 10.4142 19.154 10 19.154C9.58579 19.154 9.25 18.8182 9.25 18.404L9.25 11.404C9.25 10.9898 9.58579 10.654 10 10.654Z"
                            stroke="#00ABB6"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.75 11.404C14.75 10.9898 14.4142 10.654 14 10.654C13.5858 10.654 13.25 10.9898 13.25 11.404V18.404C13.25 18.8182 13.5858 19.154 14 19.154C14.4142 19.154 14.75 18.8182 14.75 18.404V11.404Z"
                            stroke="#00ABB6"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.99143 7.9212C6.03363 7.54138 6.35468 7.25403 6.73684 7.25403H17.2632C17.6453 7.25403 17.9664 7.54138 18.0086 7.9212L18.2087 9.72255C18.5715 12.9879 18.5715 16.2833 18.2087 19.5487L18.189 19.726C18.045 21.0222 17.0405 22.0557 15.7489 22.2365C13.2618 22.5847 10.7382 22.5847 8.25108 22.2365C6.95954 22.0557 5.955 21.0222 5.81098 19.726L5.79128 19.5487C5.42846 16.2833 5.42846 12.9879 5.79128 9.72255L5.99143 7.9212ZM7.40812 8.75403L7.2821 9.8882C6.93152 13.0434 6.93152 16.2278 7.2821 19.383L7.30181 19.5603C7.37011 20.1751 7.84652 20.6652 8.45905 20.751C10.8082 21.0799 13.1918 21.0799 15.5409 20.751C16.1535 20.6652 16.6299 20.1751 16.6982 19.5604L16.7179 19.383C17.0685 16.2278 17.0685 13.0434 16.7179 9.8882L16.5919 8.75403H7.40812Z"
                            stroke="#00ABB6"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </g>
                    </svg>
                  </td>
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

export default UserRoles;
