import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import Modal from "../../components/ModalComponents/Modal";
import { createProject, fetchProjectList } from "../../api/candidiate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

const Projects = () => {
  const initialProject = {
    jobTitle: "",
    job: "",
    vendor: "",
    client: "",
    city: "",
    startDate: "",
    endDate: "",
    statusReason: "",
    projectStatus: "",
  };

  const [project, setProject] = useState(initialProject);

  const [projectListData, setProjectListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const candidateId = useSelector(state => state.personal.candidateId);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProject((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createProject(project, candidateId);
      toast.success('Project Created Succesfully');
      closeModal();
      setProject(initialProject);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const getProjectList = async (page) => {
    setLoading(true);
    try {
      const res = await fetchProjectList({ pageNum: page, pageSize: 10 });
      console.log(res.data.response.data, 'Check the list');
      setProjectListData(res.data.response.data);
      //setTotalPages(res.data.data.totalRecords);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Fetch Marketing List Data');
    } finally {
      setLoading(false)
    }
  }


  const handlePageChange = page => {
    getProjectList(page);
    setCurrentPage(page);
  }

  useEffect(() => { getProjectList(1) }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading && <Loader />}
        <div className="">
          <form className="flex flex-col gap-6 ">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="job_title" className="text-text-hint mb-1">
                  Job Title
                </label>
                <input
                  onChange={handleChange}
                  value={project.jobTitle}
                  name="jobTitle"
                  type="text"
                  placeholder="Job title"
                  id="job_title"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="job" className="text-text-hint mb-1">
                  Job
                </label>
                <input
                  onChange={handleChange}
                  value={project.job}
                  name="job"
                  type="text"
                  placeholder="Job"
                  id="job"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="vendor" className="text-text-hint mb-1">
                  Vendor
                </label>
                <input
                  onChange={handleChange}
                  value={project.vendor}
                  name="vendor"
                  type="text"
                  placeholder="Vendor"
                  id="vendor"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="client" className="text-text-hint mb-1">
                  Client
                </label>
                <input
                  onChange={handleChange}
                  value={project.client}
                  name="client"
                  type="text"
                  placeholder="Client"
                  id="client"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col w-72">
                <label htmlFor="city" className="text-text-hint mb-1">
                  City
                </label>
                <input
                  onChange={handleChange}
                  value={project.city}
                  name="city"
                  type="text"
                  placeholder="LA"
                  id="city"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="start_date" className="text-text-hint mb-1">
                  Start Date
                </label>
                <input
                  onChange={handleChange}
                  value={project.startDate}
                  name="startDate"
                  type="date"
                  id="start_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
              </div>

              <div className="flex flex-col w-72">
                <label htmlFor="end_date" className="text-text-hint mb-1">
                  End Date
                </label>
                <input
                  onChange={handleChange}
                  value={project.endDate}
                  name="endDate"
                  type="date"
                  id="end_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col w-72">
                <label htmlFor="status_reason" className="text-text-hint mb-1">
                  Status Reason
                </label>
                <input
                  onChange={handleChange}
                  value={project.statusReason}
                  name="statusReason"
                  type="text"
                  placeholder="status reason"
                  id="status_reason"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>
            <div className="">
              <div className="w-96">
                <label className="text-text-hint ">Project Status</label>
                <ul className="grid grid-cols-3 mt-1">
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={project.projectStatus === "Not Completed"}
                      name="projectStatus"
                      className="sr-only peer"
                      type="radio"
                      value="Not Completed"
                      id="not_completed"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="not_completed"
                    >
                      Not Completed
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      name="projectStatus"
                      checked={project.projectStatus === "InProgress"}
                      className="sr-only peer"
                      type="radio"
                      value="InProgress"
                      id="in_progress"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="in_progress"
                    >
                      InProgress
                    </label>
                  </li>

                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={project.projectStatus === "Completed"}
                      name="projectStatus"
                      className="sr-only peer"
                      type="radio"
                      value="Completed"
                      id="completed"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="completed"
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
      <div className="border  border-gray-300 mt-5 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex items-center gap-3">
            <RxReload size={20} />
            {/* <BsThreeDotsVertical size={20} /> */}
          </div>
          {/* <div className="flex items-center gap-3 flex-grow p-3 border-2 border-gray-200 bg-gray-100 rounded-lg ">
        <FiSearch color="gray" size={20} />
        <input className="outline-none w-full h-full bg-gray-100" />
      </div> */}
          <div className="flex items-center ">
            <button
              onClick={openModal}
              className=" bg-secondary-700 text-white py-2 px-5 rounded-full font-normal"
            >
              <span className="text-lg mr-3">+</span>
              New Project
            </button>
          </div>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-9  text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th className="">Job Title</th>
                <th>Job</th>
                <th>Vendor</th>
                <th>Client</th>
                <th>City</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status Reason</th>
                <th>Project Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col  overflow-y-scroll w-full h-screen"
            // style={{ height: "90vh" }}
            >
              {projectListData.map(() => (
                <tr
                  className={`grid grid-cols-9 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm`}
                >
                  <td className=" ">
                    <h3 className="text-auxiliary-800 text-base">Sales Tech</h3>
                  </td>
                  <td className="">Technology</td>
                  <td className="">Technology</td>
                  <td className="">DuR</td>
                  <td className="">City</td>
                  <td className="">10/10/10</td>
                  <td className="">10/10/10</td>
                  <td className="">Reason</td>
                  <td className="flex">
                    <p className="py-2 px-5 border border-success-700 text-success-700 text-xs rounded-full ">
                      Remote
                    </p>
                  </td>
                  {/* <td className=" text-xs">
                    <p className="flex gap-3">
                      <span>12</span>
                      <span className="text-text-hint">Months</span>
                    </p>
                  </td>
                  <td className="py-2 border border-success-700 text-success-700 text-xs rounded-full flex justify-center items-center">
                    Employed
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TODO: API Pagination not implemented */}
        {/* <Pagination currentPage={currentPage} totalRecords={totalPages} pageSize={10} onPageChange={handlePageChange} /> */}
      </div>
    </div>
  );
};

export default Projects;
