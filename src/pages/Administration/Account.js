import React, { useState } from "react";
import Modal from "../../components/ModalComponents/Modal";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createAccount } from "../../api/administration";

const options = [
  { value: "", text: "--Choose an option--" },
  { value: "option1", text: "option1" },
  { value: "option2", text: "option2" },
  { value: "option3", text: "option3" },
  { value: "option4", text: "option4" },
  { value: "option5", text: "option5" },
];

const Account = () => {
  const initialAccount = {
    businessName: "",
    email: "",
    phone: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    accountStatus: "",
    activatedDate: "",
    activatedBy: "",
    userLicensesRequested: "",
    licensesActive: "",
    remainingLicenses: "",
    totalUsers: "",
    activeUsers: "",
    inActiveUsers: "",
    businessName: "",
    businessName: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState(initialAccount);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAccount((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  console.log(account);

  const handleSubmit = async () => {
    const response = await createAccount(account);
    closeModal();
    setAccount(initialAccount);
  };

  return (
    <div className="p-5">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <form className="flex flex-col gap-6 text-text-hint">
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="last_name" className="text-text-hint mb-1">
                  Business Name<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.businessName}
                  name="businessName"
                  type="text"
                  placeholder="Business Name"
                  id="last_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="">
                <label className="">
                  Email<span className="text-danger-500">*</span>
                </label>
                <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                  <input
                    onChange={handleChange}
                    value={account.email}
                    name="email"
                    placeholder="youremail@gmail.com"
                    required
                    className="outline-none w-full text-black"
                  />
                  {/* <img src={Pencil} alt="pencil" /> */}
                </div>
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="job_title" className="text-text-hint mb-1">
                  Phone<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.phone}
                  name="phone"
                  type="number"
                  placeholder="phone"
                  id="first_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="first_name" className="text-text-hint mb-1">
                  First Name<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.firstName}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  id="first_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="middle_name" className="text-text-hint mb-1">
                  Middle Name<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.middleName}
                  name="middleName"
                  type="text"
                  placeholder="Middle Name"
                  id="middle_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="last_name" className="text-text-hint mb-1">
                  Last Name<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.lastName}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  id="last_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="address_line_1" className="text-text-hint mb-1">
                  Address Line 1<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.address1}
                  name="address1"
                  type="text"
                  placeholder="Address Line 1"
                  id="address_line_1"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="address_line_2" className="text-text-hint mb-1">
                  Address Line 2<span className="text-danger-500"></span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.address2}
                  name="address2"
                  type="text"
                  placeholder="Address Line 2"
                  id="address_line_2"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="state" className="text-text-hint mb-1">
                  State<span className="text-danger-500">*</span>
                </label>
                <select
                  onChange={handleChange}
                  value={account.state}
                  name="state"
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none  text-black w-72"
                >
                  {options.map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="city" className="text-text-hint mb-1">
                  City<span className="text-danger-500">*</span>
                </label>
                <select
                  onChange={handleChange}
                  value={account.city}
                  name="city"
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none  text-black w-72"
                >
                  {options.map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="zip_code" className="text-text-hint mb-1">
                  Postal Code<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.postalCode}
                  name="postalCode"
                  type="text"
                  placeholder="postal code"
                  id="zip_code"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="">
                <label>
                  Account Status<span className="text-red-500">*</span>
                </label>
                <ul className="grid grid-cols-3 mt-1">
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={account.accountStatus === "enrollment"}
                      className="sr-only peer"
                      type="radio"
                      value="enrollment"
                      name="accountStatus"
                      id="enrollment"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="enrollment"
                    >
                      Enrollment
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={account.accountStatus === "closed"}
                      className="sr-only peer"
                      type="radio"
                      value="closed"
                      name="accountStatus"
                      id="closed"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="closed"
                    >
                      Closed
                    </label>
                  </li>

                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={account.accountStatus === "completed"}
                      className="sr-only peer"
                      type="radio"
                      value="completed"
                      name="accountStatus"
                      id="completed"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 bg-white  border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="completed"
                    >
                      Completed
                    </label>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Activated Date
                </label>
                <input
                  onChange={handleChange}
                  value={account.activatedDate}
                  name="activatedDate"
                  type="date"
                  id="date"
                  className="outline-none border-2 border-text-hint rounded-lg text-black"
                />
              </div>

              <div className="flex flex-col w-72">
                <label htmlFor="created_by" className="text-text-hint mb-1">
                  Activated By
                </label>
                <input
                  onChange={handleChange}
                  value={account.activatedBy}
                  name="activatedBy"
                  type="text"
                  placeholder="Activated By"
                  id="created_by"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="first_name" className="text-text-hint mb-1">
                  User Licenses' Requested
                  <span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.userLicensesRequested}
                  name="userLicensesRequested"
                  type="text"
                  placeholder="User Licenses"
                  id="first_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="middle_name" className="text-text-hint mb-1">
                  Licenses Active <span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.licensesActive}
                  name="licensesActive"
                  type="text"
                  placeholder="Active Licenses"
                  id="middle_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="last_name" className="text-text-hint mb-1">
                  Remaining Licenses<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.remainingLicenses}
                  name="remainingLicenses"
                  type="text"
                  placeholder="Remaining Licenses"
                  id="last_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="first_name" className="text-text-hint mb-1">
                  Total Users
                  <span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.totalUsers}
                  name="totalUsers"
                  type="text"
                  placeholder="Total Users"
                  id="first_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="middle_name" className="text-text-hint mb-1">
                  Active User <span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={account.activeUsers}
                  name="activeUsers"
                  type="text"
                  placeholder="Active User"
                  id="middle_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="last_name" className="text-text-hint mb-1">
                  Inactive Users<span className="text-danger-500">*</span>
                </label>
                <select
                  onChange={handleChange}
                  value={account.inActiveUsers}
                  name="inActiveUsers"
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none  text-black w-72"
                >
                  {options.map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-gray-300 mb-1">
                  Created On
                </label>
                <input
                  disabled
                  type="date"
                  id="date"
                  className="outline-none border-2 border-text-hint rounded-lg disabled:border-gray-300 placeholder:text-gray-300 text-gray-300 "
                />
              </div>

              <div className="flex flex-col w-72">
                <label htmlFor="created_by" className="text-gray-300 mb-1">
                  Created By
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Activated By"
                  id="created_by"
                  className="outline-none border-2 border-secondary-500 rounded-lg disabled:border-gray-300 placeholder:text-gray-300 text-gray-300 "
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-gray-300 mb-1">
                  Updated On
                </label>
                <input
                  disabled
                  type="date"
                  id="date"
                  className="outline-none border-2 border-text-hint rounded-lg disabled:border-gray-300 placeholder:text-gray-300 text-gray-300 "
                />
              </div>

              <div className="flex flex-col w-72">
                <label htmlFor="created_by" className="text-gray-300 mb-1">
                  Updated By
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Activated By"
                  id="created_by"
                  className="outline-none border-2 border-secondary-500 rounded-lg disabled:border-gray-300 placeholder:text-gray-300 text-gray-300 "
                />
              </div>
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
      <div className="border border-gray-300 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>

          <button
            onClick={openModal}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add Account
          </button>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-7  text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th>Business Name</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date Created</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center  overflow-y-scroll w-full h-screen"
              // style={{ height: "90vh" }}
            >
              {[1, 2, 3].map(() => (
                <tr className="grid grid-cols-7 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm">
                  <td className="">
                    <h3 className="text-base text-auxiliary-800">Some Name</h3>
                  </td>
                  <td className="">
                    <p className="">bessiecooper@gmail.com</p>
                  </td>
                  <td className="">+91 9999999999</td>
                  <td className="">Sam</td>
                  <td className="">Jhon</td>
                  <td className="">10/10/10</td>
                  <td className="flex">
                    <p className="border border-success-700 text-success-700 py-2 px-6 rounded-full">
                      Active
                    </p>
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

export default Account;
