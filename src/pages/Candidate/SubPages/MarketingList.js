import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../../components/ModalComponents/Modal";
import Dropdown from "../../../components/Dropdown";
import { createMarketingList, fetchMarketingList, getMarketingList } from "../../../api/candidiate";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import { formatDate, getUserInfoDetails, mapToOption } from "../../../utlis";
import useFetch from "../../../hooks/useFetch";
const { companyId, clientId } = getUserInfoDetails()
const tabelHeadArr = [
  "Sales Manager",
  "Sales Start Date",
  "Sales End Date",
  "Jobs Applied",
  "Interview Attend",
  "Sales Person",
  "Marketing Status",
];

const MarketingList = () => {
  const initialMarketingList = {
    salesManager: "",
    salesPerson: "",
    salesStartDate: "",
    salesEndDate: "",
    jobsApplied: "",
    interviewsAttended: "",
    marketingStatus: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const candidateId = useSelector(state => state.personal.candidateId);

  const [marketingListData, setMarketingListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [marketingList, setMarketingList] = useState(initialMarketingList);

  const { data: refSalesManger, loading: refSalesManagerLoading } = useFetch('/salesteam', {
    company: companyId, client: clientId, userType: 'manager'
  })

  const { data: refSalesPerson, loading: refSalesLoading } = useFetch('/salesteam', {
    company: companyId, client: clientId, userType: 'sales'
  })

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMarketingList((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createMarketingList(marketingList, candidateId);
      toast.success('Marketing List Added Succesfully');
      setMarketingList(initialMarketingList);
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }

  };

  const getMarketingList = async (page) => {
    setLoading(true);
    try {
      const res = await fetchMarketingList({ pageNum: page, pageSize: 10 });
      setMarketingListData(res.data.response.data);
      //setTotalPages(res.data.data.totalRecords);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Fetch Marketing List Data');
    } finally {
      setLoading(false)
    }
  }


  const handlePageChange = page => {
    getMarketingList(page);
    setCurrentPage(page);
  }

  useEffect(() => { getMarketingList(1) }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading && <Loader />}
        <div className="">
          <form className="flex flex-col gap-6 ">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col  w-72">
                <label htmlFor="sales-person" className="text-text-hint mb-1">
                  Sales Manager
                </label>
                <select
                  onChange={handleChange}
                  name="salesManager"
                  value={marketingList.salesManager}
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {!refSalesManagerLoading && mapToOption(refSalesManger?.data?.records, 'first_name', 'user_id').map((option) => (
                    <option className="" key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col  w-72">
                <label htmlFor="sales-person" className="text-text-hint mb-1">
                  Sales Person
                </label>
                <select
                  onChange={handleChange}
                  name="salesPerson"
                  value={marketingList.salesPerson}
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {!refSalesLoading && mapToOption(refSalesPerson?.data?.records, 'first_name', 'user_id').map((option) => (
                    <option className="" key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col w-72">
                <label
                  htmlFor="sales_start_date"
                  className="text-text-hint mb-1"
                >
                  Sales Start Date
                </label>
                <input
                  onChange={handleChange}
                  value={marketingList.salesStartDate}
                  name="salesStartDate"
                  type="date"
                  id="sales_start_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
              </div>

              <div className="flex flex-col w-72">
                <label htmlFor="sales_end_date" className="text-text-hint mb-1">
                  Sales End Date
                </label>
                <input
                  onChange={handleChange}
                  value={marketingList.salesEndDate}
                  name="salesEndDate"
                  type="date"
                  id="sales_end_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="jobs_applied" className="text-text-hint mb-1">
                  Jobs Applied
                </label>
                <input
                  onChange={handleChange}
                  value={marketingList.jobsApplied}
                  name="jobsApplied"
                  type="text"
                  placeholder="Sales manager"
                  id="jobs_applied"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label
                  htmlFor="interview_attended"
                  className="text-text-hint mb-1"
                >
                  Interviews Attended
                </label>
                <input
                  onChange={handleChange}
                  value={marketingList.interviewsAttended}
                  name="interviewsAttended"
                  type="text"
                  placeholder="Interviews Attended"
                  id="interview_attended"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>

            <div className="">
              <div className="w-96">
                <label className="text-text-hint ">Marketing Status</label>
                <ul className="grid grid-cols-3 mt-1">
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      className="sr-only peer"
                      type="radio"
                      value="In Progress"
                      checked={marketingList.marketingStatus === "In Progress"}
                      name="marketingStatus"
                      id="not_completed"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="not_completed"
                    >
                      In Progress
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      onChange={handleChange}
                      className="sr-only peer"
                      type="radio"
                      value="shortlisted"
                      checked={marketingList.marketingStatus === "shortlisted"}
                      name="marketingStatus"
                      id="in_progress"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="in_progress"
                    >
                      Shortlisted
                    </label>
                  </li>

                  <li className="relative">
                    <input
                      onChange={handleChange}
                      className="sr-only peer"
                      type="radio"
                      value="Not Selected"
                      checked={marketingList.marketingStatus === "Not Selected"}
                      name="marketingStatus"
                      id="completed"
                    />
                    <label
                      className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                      htmlFor="completed"
                    >
                      Not Selected
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
      <div className="border border-gray-300 mt-5 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex ">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>
          <div>
            <div className="flex items-center gap-3 ">
              <Dropdown />
              <button
                onClick={openModal}
                className=" bg-secondary-700 text-white py-2 px-5 rounded-full font-normal"
              >
                <span className="text-lg mr-3">+</span>
                Active Marketing
              </button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-7 items-center w-full text-left text-sm py-3 pl-3 pr-6 bg-secondary-50">
                {tabelHeadArr.map((heading) => (
                  <th>{heading}</th>
                ))}
              </tr>
            </thead>
            {/* table content/data */}
            <tbody className="flex flex-col items-center overflow-y-scroll w-full h-screen">
              {marketingListData.map((m) => (
                <tr className="grid grid-cols-7 items-center py-2 px-3 border border-gray-200 text-left w-full text-sm">
                  <td className="text-auxiliary-800">{m.sales_manager_name}</td>
                  <td>{formatDate(m.start_date)}</td>
                  <td>{formatDate(m.end_date)}</td>
                  <td>
                    <div className=" px-6 py-3 bg-secondary-50 rounded-full justify-start items-center gap-2 inline-flex text-success-700 text-xs font-medium  leading-none">
                      {m.total_jobs_applied || '-'}
                    </div>
                  </td>
                  <td>
                    <div className="px-6 py-3 bg-secondary-100 rounded-full justify-start items-center  inline-flex text-success-700 text-xs font-medium  leading-none">
                      {m.total_interviews_attended || '-'}
                    </div>
                  </td>
                  <td>{m.sales_person_name}</td>
                  <td>
                    <div className="px-6 py-3 rounded-full border border-success-700 justify-start items-center inline-flex text-success-700 text-xs font-medium leading-none">
                      {m.status}
                    </div>
                  </td>
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

export default MarketingList;
