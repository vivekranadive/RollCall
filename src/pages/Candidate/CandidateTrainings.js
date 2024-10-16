import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/ModalComponents/Modal";
import { createTraining, fetchTrainingList } from "../../api/candidiate";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";

const CandidateTrainings = () => {
  const initialTraining = {
    clientName: "",
    vendor: "",
    client: "",
    city: "",
    startDate: "",
    endDate: "",
    trainingStatus: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [training, setTraning] = useState(initialTraining);
  const [isLoading, setLoading] = useState(false);
  const candidateId = useSelector(state => state.personal.candidateId);


  const [trainingListData, setTrainingListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraning((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createTraining(training, candidateId);
      toast.success('Training Added Succesfully');
      closeModal();
      setTraning(initialTraining);

    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const getTrainingList = async (page) => {
    setLoading(true);
    try {
      const res = await fetchTrainingList({ pageNum: page, pageSize: 10 });
      console.log(res.data.response.data, 'Check the list');
      setTrainingListData(res.data.response.data);
      //setTotalPages(res.data.data.totalRecords);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Fetch Marketing List Data');
    } finally {
      setLoading(false)
    }
  }


  const handlePageChange = page => {
    getTrainingList(page);
    setCurrentPage(page);
  }

  useEffect(() => { getTrainingList(1) }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading && <Loader />}
        <div className="">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-2">
              <div className="flex flex-col w-72">
                <label htmlFor="course_name" className="text-text-hint mb-1">
                  Course Name
                </label>
                <input
                  onChange={handleChange}
                  value={training.clientName}
                  name="clientName"
                  type="text"
                  placeholder="Course Name"
                  id="course_name"
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
                  value={training.vendor}
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
                  value={training.client}
                  name="client"
                  type="text"
                  placeholder="client"
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
                  value={training.city}
                  name="city"
                  type="text"
                  placeholder="LA"
                  id="city"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="start_date" className="text-text-hint mb-1">
                  Start Date
                </label>
                <input
                  onChange={handleChange}
                  value={training.startDate}
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
                  value={training.endDate}
                  name="endDate"
                  type="date"
                  id="end_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
              </div>
            </div>
            <div className="">
              <div className="w-96">
                <label className="text-text-hint ">Training Status</label>
                <ul className="grid grid-cols-3 mt-1">
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      checked={training.trainingStatus === "Not Completed"}
                      className="sr-only peer"
                      type="radio"
                      value="Not Completed"
                      name="trainingStatus"
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
                      checked={training.trainingStatus === "InProgree"}
                      className="sr-only peer"
                      type="radio"
                      value="InProgree"
                      name="trainingStatus"
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
                      checked={training.trainingStatus === "Completed"}
                      className="sr-only peer"
                      type="radio"
                      value="Completed"
                      name="trainingStatus"
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
            <BsThreeDotsVertical size={20} />
          </div>
          <div className="flex items-center ">
            <button
              onClick={openModal}
              className=" bg-secondary-700 text-white py-2 px-5 rounded-full font-normal"
            >
              <span className="text-lg mr-3">+</span>
              New Training
            </button>
          </div>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-8  text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th className="col-span-2">Course Name</th>
                <th className="">Training</th>
                <th>Trainer</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status Reason</th>
                <th> Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center overflow-y-scroll w-full h-screen"
            // style={{ height: "90vh" }}
            >
              {trainingListData.map(() => (
                <tr
                  className={`grid grid-cols-8 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm`}
                >
                  <td className="col-span-2 ">
                    <h3 className="text-auxiliary-800 text-base">Sales Tech</h3>
                  </td>
                  <td className="">Technology</td>
                  <td className="">Technology</td>
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

export default CandidateTrainings;
