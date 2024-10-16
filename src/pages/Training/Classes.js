import React, { useEffect, useState } from "react";
import Modal from "../../components/ModalComponents/Modal";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createClasses } from "../../api/training";
import axiosInstance from "../../api/axiosInstance";
import { getUserInfoDetails } from "../../utlis";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";

const { companyId, clientId } = getUserInfoDetails();

const options = [
  { value: "", text: "--Choose an option--" },
  { value: "option1", text: "option1" },
  { value: "option2", text: "option2" },
  { value: "option3", text: "option3" },
  { value: "option4", text: "option4" },
  { value: "option5", text: "option5" },
];

const enrolledCandidates = ["Alexender", "devon", "jhon", "hawkins"];

const Classes = () => {
  const [isLoading, setLoading] = useState(false);
  const [classesData, setClassesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const getClasses = async (page) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/class', {
        params: { company: companyId, client: clientId, pageNum: page, pageSize: 10 }
      });
      setClassesData(res.data.data.records);
      setTotalPages(res.data.data.totalRecords);
    } catch (err) {
      console.log(err, 'in Api call');
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = page => {
    getClasses(page);
    setCurrentPage(page);
  }

  useEffect(() => { getClasses(1) }, [])

  const initialClass = {
    className: "",
    facultyName: "",
    technologies: "",
    startDate: "",
    endDate: "",
    minEnrollment: "",
    maxEnrollment: "",
    classStatus: "",
  };
  const [buttonId, setButtonId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState(initialClass);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openClassModal = () => {
    setButtonId("add-class");
    openModal();
  };
  const openEnrollmentModal = () => {
    setButtonId("current-enroll");
    openModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClasses((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  console.log(classes);

  const handleSubmit = async () => {
    const response = await createClasses(classes);
    closeModal();
    setClasses(initialClass);
  };

  return (
    <div className="p-5">
      {isLoading && <Loader />}
      {buttonId === "add-class" ? (
        // class modal
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="">
            <form className="flex flex-col gap-6 text-text-hint">
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col w-72">
                  <label htmlFor="first_name" className="text-text-hint mb-1">
                    Class Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={classes.className}
                    name="className"
                    type="text"
                    placeholder="Class Name"
                    id="first_name"
                    className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                  />
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="middle_name" className="text-text-hint mb-1">
                    Faculty Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={classes.facultyName}
                    name="facultyName"
                    type="text"
                    placeholder="Faculty Name"
                    id="middle_name"
                    className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                  />
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="last_name" className="text-text-hint mb-1">
                    Technologies
                  </label>
                  <select
                    onChange={handleChange}
                    value={classes.technologies}
                    name="technologies"
                    className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full text-black"
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
                  <label htmlFor="date" className="text-text-hint mb-1">
                    Start Date
                  </label>
                  <input
                    onChange={handleChange}
                    value={classes.startDate}
                    name="startDate"
                    type="date"
                    id="date"
                    className="outline-none border-2 border-text-hint rounded-lg text-black"
                  />
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="date" className="text-text-hint mb-1">
                    End Date
                  </label>
                  <input
                    onChange={handleChange}
                    value={classes.endDate}
                    name="endDate"
                    type="date"
                    id="date"
                    className="outline-none border-2 border-text-hint rounded-lg text-black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col w-72">
                  <label htmlFor="first_name" className="text-text-hint mb-1">
                    MIN Enrollment
                  </label>
                  <input
                    onChange={handleChange}
                    value={classes.minEnrollment}
                    name="minEnrollment"
                    type="text"
                    placeholder="MIN"
                    id="first_name"
                    className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                  />
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="middle_name" className="text-text-hint mb-1">
                    MAX Enrollment
                  </label>
                  <input
                    onChange={handleChange}
                    value={classes.maxEnrollment}
                    name="maxEnrollment"
                    type="text"
                    placeholder="MAX"
                    id="middle_name"
                    className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                  />
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="middle_name" className="text-gray-300 mb-1">
                    Current Enrollment
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="Current"
                    id="middle_name"
                    className="outline-none border-2 border-secondary-500 rounded-lg disabled:border-gray-300 placeholder:text-gray-300 "
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-sm">
                  <label>
                    Class Status<span className="text-red-500">*</span>
                  </label>
                  <ul className="grid grid-cols-3 mt-1">
                    <li className="relative">
                      <input
                        onChange={handleChange}
                        checked={classes.classStatus === "enrollment"}
                        className="sr-only peer"
                        type="radio"
                        value="enrollment"
                        name="classStatus"
                        id="active"
                      />
                      <label
                        className="flex justify-center items-center py-2 px-3 bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                        htmlFor="active"
                      >
                        Enrollment
                      </label>
                    </li>
                    <li className="relative">
                      <input
                        onChange={handleChange}
                        checked={classes.classStatus === "closed"}
                        className="sr-only peer"
                        type="radio"
                        value="closed"
                        name="classStatus"
                        id="in_active"
                      />
                      <label
                        className="flex justify-center items-center py-2 px-3 bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                        htmlFor="in_active"
                      >
                        Closed
                      </label>
                    </li>

                    <li className="relative">
                      <input
                        onChange={handleChange}
                        checked={classes.classStatus === "completed"}
                        className="sr-only peer"
                        type="radio"
                        value="completed"
                        name="classStatus"
                        id="fraud"
                      />
                      <label
                        className="flex justify-center items-center py-2 px-3 bg-white  border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                        htmlFor="fraud"
                      >
                        Completed
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
      ) : (
        // current enrollment modal
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col gap-6 ">
            <form className="flex flex-col gap-6 text-text-hint ">
              <div className="flex gap-5 w-auto">
                <div className="flex flex-col w-72">
                  <label htmlFor="first_name" className="text-gray-300 mb-1">
                    Class Name
                  </label>
                  <input
                    disabled
                    onChange={handleChange}
                    value={classes.className}
                    name="className"
                    type="text"
                    placeholder="Class Name"
                    id="first_name"
                    className="outline-none border-2 border-secondary-500 rounded-lg text-black disabled:border-gray-300 placeholder:text-gray-300"
                  />
                </div>

                <div className="flex flex-col ">
                  <label htmlFor="last_name" className="text-text-hint mb-1">
                    Technologies
                  </label>
                  <div className="flex gap-3 w-96">
                    <select
                      onChange={handleChange}
                      value={classes.technologies}
                      name="technologies"
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
                    <button className="text-xs text-white bg-secondary-700 py-2 px-6 rounded-full">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div>
              <h2 className="text-text-hint py-3 ">Candidate Enrolled</h2>
              <ul>
                {enrolledCandidates.map((candidate) => (
                  <div className="flex justify-between p-2 border border-neutral-200 first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg  ">
                    <li className="capitalize">{candidate}</li>
                    <button className="flex items-center text-xs border border-gray-500 rounded-lg px-3">
                      Remove{" "}
                      <span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="add">
                            <path
                              id="Vector"
                              d="M5.17188 10.8284L10.8287 5.17151"
                              stroke="#2F2F2F"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_2"
                              d="M10.8287 10.8285L5.17188 5.17163"
                              stroke="#2F2F2F"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                ))}
              </ul>
            </div>
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
      )}

      <div className="border border-gray-300 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>

          <button
            onClick={openClassModal}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add Class
          </button>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-9  text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th>Class Name</th>
                <th>Faculty Type</th>
                <th>Technologies</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>MIN Enrollment</th>
                <th>MAX Enrollment</th>
                <th>Current Enrollment</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center  overflow-y-scroll w-full h-screen"
            // style={{ height: "90vh" }}
            >
              {classesData.map((r) => (
                <tr className="grid grid-cols-9  items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm">
                  <td className="">
                    <h3 className="text-base text-auxiliary-800">Sales Tech</h3>
                  </td>
                  <td className="">{r.client}</td>
                  <td className="">{r.company}</td>
                  <td className="">10/10/10</td>
                  <td className="">10/10/10</td>
                  <td className="flex">
                    <p className="bg-secondary-50 text-success-800 py-2 px-5 rounded-full">
                      12
                    </p>
                  </td>
                  <td className="flex">
                    <p className="bg-secondary-100 text-secondary-800-800 text-xs py-2 px-5 rounded-full">
                      12
                    </p>
                  </td>

                  <td onClick={openEnrollmentModal} className="cursor-pointer">
                    12
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

        <Pagination currentPage={currentPage} totalRecords={totalPages} pageSize={10} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Classes;
