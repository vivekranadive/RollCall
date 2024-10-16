import React, { createFactory, useState } from "react";
import Modal from "../../components/ModalComponents/Modal";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createFaculty } from "../../api/training";

const Faculty = () => {
  const initialFaculty = {
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    mobileNum: "",
    email: "",
    skills: "",
    notes: "",
    status: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [faculty, setFaculty] = useState(initialFaculty);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFaculty((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  console.log(faculty);
  const handleSubmit = async () => {
    const response = await createFaculty(faculty);
    closeModal();
    setFaculty(initialFaculty);
  };

  return (
    <div className="p-5">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <form className="flex flex-col gap-6 text-text-hint">
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="first_name" className="text-text-hint mb-1">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  value={faculty.firstName}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  id="first_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black   "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="middle_name" className="text-text-hint mb-1">
                  Middle Name
                </label>
                <input
                  onChange={handleChange}
                  value={faculty.middleName}
                  name="middleName"
                  type="text"
                  placeholder="Middle Name"
                  id="middle_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black   "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="last_name" className="text-text-hint mb-1">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  value={faculty.lastName}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  id="last_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black   "
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="last_name" className="text-text-hint mb-1">
                  Preferred Name<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={faculty.preferredName}
                  name="preferredName"
                  type="text"
                  placeholder="Last Name"
                  id="last_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black   "
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="mobile_number" className="text-text-hint mb-1">
                  Mobile Numbner<span className="text-danger-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={faculty.mobileNum}
                  name="mobileNum"
                  type="text"
                  placeholder="Mobile Numbner"
                  id="mobile_number"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black "
                />
              </div>
              <div className="">
                <label className="">
                  Email ID<span className="text-danger-500">*</span>
                </label>
                <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                  <input
                    onChange={handleChange}
                    value={faculty.email}
                    name="email"
                    placeholder="youremail@gmail.com"
                    required
                    className="outline-none w-full text-black "
                  />
                  {/* <img src text-black={Pencil} alt="pencil" /> */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-3 ">
                <label htmlFor="document_type" className="text-text-hint mb-1">
                  Skills
                </label>
                <textarea
                  onChange={handleChange}
                  value={faculty.skills}
                  name="skills"
                  type="text"
                  placeholder="Skills"
                  id="document_type"
                  className="focus:outline-none border  rounded-lg  text-black "
                  rows={4}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-3 ">
                <label htmlFor="document_type" className="text-text-hint mb-1">
                  Notes
                </label>
                <textarea
                  onChange={handleChange}
                  value={faculty.notes}
                  name="notes"
                  type="text"
                  placeholder="Notes"
                  id="document_type"
                  className="focus:outline-none border  rounded-lg text-black   "
                  rows={4}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="">
                <label>
                  Status<span className="text-red-500">*</span>
                </label>
                <ul className="grid grid-cols-3 mt-1">
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={faculty.status === "active"}
                      className="sr-only peer"
                      type="radio"
                      value="active"
                      name="status"
                      id="active"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="active"
                    >
                      Active
                    </label>
                  </li>

                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={faculty.status === "inactive"}
                      className="sr-only peer"
                      type="radio"
                      value="inactive"
                      name="status"
                      id="inactive"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 bg-white  border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="inactive"
                    >
                      Inavtive
                    </label>
                  </li>
                </ul>
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
            Add Faculty
          </button>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-5  text-left py-3 pl-3 pr-6 bg-secondary-50 text-base">
                <th>Faculty Name</th>
                <th>Technologies</th>
                <th>Mobile Number</th>
                <th>Email Address</th>

                <th>Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center  overflow-y-scroll w-full h-screen"
              // style={{ height: "90vh" }}
            >
              {[1, 2, 3].map(() => (
                <tr className="grid grid-cols-5  items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full ">
                  <td className="">
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

export default Faculty;
