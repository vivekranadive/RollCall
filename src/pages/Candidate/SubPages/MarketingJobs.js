import React, { useCallback, useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import StarRating from "../../../components/StarRating";
import Modal from "../../../components/ModalComponents/Modal";
import Dropdown from "../../../components/Dropdown";
import { getUserInfoDetails, mapToOption } from "../../../utlis";

import {
  createMarketingJob,
  createJobInterview,
  fetchJobList,
} from "../../../api/candidiate";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import useFetch from "../../../hooks/useFetch";
const { companyId, clientId } = getUserInfoDetails()

const MarketingJobs = () => {
  const initialMarketingJob = {
    jobId: "",
    jobTitle: "",
    vendorName: "",
    vendorEmail: "",
    vendorNumber: "",
    technology: "",
    city: "",
    state: "",
    jobType: "",
    salesPerson: "",
    billRate: "",
    duration: "",
    status: "",
  };

  const initialInterview = {
    interviewDate: "",
    interviewTime: "",
    timeStandard: "",
    appointmentDetails: "",
    appointmentDetailsLink: "",
    panelDetails: "",
    panelDetailsLink: "",
    feedBack: "",
    rating: 0,
  };

  const [marketingJob, setMarketingJob] = useState(initialMarketingJob);
  const [jobInterview, setJobInterview] = useState(initialInterview);
  const { data: refSalesPerson, loading: refSalesLoading } = useFetch('/salesteam', {
    company: companyId, client: clientId, userType: 'sales'
  })
  const { data: refVendor, loading: refVendorLoading } = useFetch('/vendors')
  const referenceData = useSelector((state) => state.reference)

  const [jobListData, setJobListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isDataPathced, setDataPatched] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonId, setButtonId] = useState("");
  const [profileRating, setProfileRating] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const candidateId = useSelector(state => state.personal.candidateId);

  const onRatingChange = (rating) => {
    setJobInterview((pervData) => ({
      ...pervData,
      rating,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddJobsModal = () => {
    setButtonId("add-jobs");
    openModal();
  };

  const handleNewInterviewModal = () => {
    setButtonId("add-new-modal");
    openModal();
  };

  const handleChangeJob = async (e) => {
    const { name, value } = e.target;

    setMarketingJob((pervDate) => ({
      ...pervDate,
      rating: profileRating,
      [name]: value,
    }));
  };

  const handleVendorChange = e => {
    const { value } = e.target;
    const vendorObj = refVendor?.response?.data?.find(r => {
      return r.vendor_id == value
    })
    console.log(vendorObj)
    setMarketingJob((pervDate) => ({
      ...pervDate,
      vendorId: value,
      vendorName: vendorObj.name,
      vendorEmail: vendorObj?.email,
      vendorNumber: vendorObj.phone
    }));
  }

  const handleChangeInterview = (e) => {
    const { name, value } = e.target;
    setJobInterview((pervDate) => ({
      ...pervDate,
      [name]: value,
    }));
  };


  const getJobList = async (page) => {
    setLoading(true);
    try {
      const res = await fetchJobList({ pageNum: page, pageSize: 10 });
      setJobListData(res.data.data.records);
      setTotalPages(res.data.data.totalRecords);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Fetch Marketing List Data');
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitJob = async () => {
    setLoading(true);
    try {
      const response = await createMarketingJob(marketingJob, candidateId);
      toast.success('Marketing Job Added Succesfully');
      closeModal();
      setMarketingJob(initialMarketingJob);
      getJobList(1);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInterview = async () => {
    setLoading(true);
    try {
      const response = await createJobInterview(jobInterview, candidateId);
      toast.success('Job Interview Added Succesfully');
      closeModal();
      setJobInterview(initialInterview);
      getJobList(1);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };


  const handlePageChange = page => {
    getJobList(page);
    setCurrentPage(page);
  }

  const patchModalData = data => {
    const vendorObj = data.vendor_id ? refVendor?.response?.data?.find(r => r.vendor_id == data.vendor_id) : {}
    setMarketingJob((prev) => {
      return {
        ...prev,
        jobTitle: data.job_title,
        vendorName: vendorObj.name,
        vendorEmail: vendorObj.email,
        vendorId: data.vendor_id,
        vendorNumber: vendorObj.phone,
        technology: data.technology_id,
        city: data.city,
        state: data.state,
        jobType: data.job_type,
        salesPerson: data.sales_person_id,
        billRate: data.bill_rate,
        duration: data.duration,
        status: data.status,
      }
    })

    setDataPatched(true)
  }

  useEffect(() => {
    console.log(marketingJob);
    if (isDataPathced) {
      handleAddJobsModal()
    }
  }, [isDataPathced])

  useEffect(() => {
    if (isModalOpen === false) {
      setMarketingJob(initialMarketingJob)
      setDataPatched(false)
    }
  }, [isModalOpen])

  useEffect(() => { getJobList(1) }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {buttonId === "add-jobs" ? (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {isLoading && <Loader />}
          <div className="">
            <form className="flex flex-col gap-6 ">
              <div className="grid grid-cols-2 gap-5">
                {/* <div className="flex flex-col w-72">
                  <label htmlFor="job_id" className="text-text-hint mb-1">
                    Job ID
                  </label>
                  <input
                    onChange={handleChangeJob}
                    value={marketingJob.jobId}
                    name="jobId"
                    type="text"
                    placeholder="Job ID"
                    id="job_id"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div> */}
                <div className="flex flex-col w-72">
                  <label className="">
                    Job Title<span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={handleChangeJob}
                    name="jobTitle"
                    value={marketingJob.jobTitle}
                    className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                  >
                    {mapToOption(referenceData.jobtitles?.job, 'title').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col w-72">
                  <label htmlFor="vendorName" className="text-text-hint mb-1">
                    Vendor Name<span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={handleVendorChange}
                    name="vendorName"
                    value={marketingJob.vendorId}
                    className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                  >
                    {!refVendorLoading && mapToOption(refVendor.response?.data, 'name', 'vendor_id').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="vendor_email" className="text-text-hint mb-1">
                    Vendor Email
                  </label>
                  <input
                    onChange={handleChangeJob}
                    value={marketingJob.vendorEmail}
                    disabled
                    name="vendorEmail"
                    type="text"
                    placeholder="Vendor Email"
                    id="vendor_email"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col w-72">
                  <label htmlFor="city" className="text-text-hint mb-1">
                    Vendor Number
                  </label>
                  <input
                    disabled
                    onChange={handleChangeJob}
                    value={marketingJob.vendorNumber}
                    name="vendorNumber"
                    type="text"
                    placeholder="Vendor Number"
                    id="city"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div>
                <div className="flex flex-col w-72">

                  <label htmlFor="technology" className="text-text-hint mb-1">
                    Technology
                  </label>
                  <select
                    onChange={handleChangeJob}
                    name="technology"
                    value={marketingJob.technology}
                    className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                  >
                    {mapToOption(referenceData.technologies.technology, 'description', 'technology_id').map((option, i) => (
                      <option key={`${option.value}_${i + 1}`} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col w-72">
                  <label htmlFor="city" className="text-text-hint mb-1">
                    City
                  </label>
                  <select
                    onChange={handleChangeJob}
                    name="city"
                    value={marketingJob.city}
                    className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                  >
                    {mapToOption(referenceData.cities?.city, 'name').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="state" className="text-text-hint mb-1">
                    State
                  </label>
                  <select
                    onChange={handleChangeJob}
                    name="state"
                    value={marketingJob.state}
                    className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                  >
                    {mapToOption(referenceData.states?.state, 'name').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <div className="w-64">
                    <label className="text-text-hint ">Job Type</label>
                    <ul className="grid grid-cols-3 mt-1">
                      <li className="relative">
                        <input
                          onChange={handleChangeJob}
                          checked={marketingJob.jobType === "Remote"}
                          className="sr-only peer"
                          type="radio"
                          value="Remote"
                          name="jobType"
                          id="remote"
                        />
                        <label
                          className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                          htmlFor="remote"
                        >
                          Remote
                        </label>
                      </li>
                      <li className="relative">
                        <input
                          onChange={handleChangeJob}
                          checked={marketingJob.jobType === "On-Site"}
                          className="sr-only peer"
                          type="radio"
                          value="On-Site"
                          name="jobType"
                          id="on-site"
                        />
                        <label
                          className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                          htmlFor="on-site"
                        >
                          On-Site
                        </label>
                      </li>

                      <li className="relative">
                        <input
                          onChange={handleChangeJob}
                          checked={marketingJob.jobType === "Hybrid"}
                          className="sr-only peer"
                          type="radio"
                          value="Hybrid"
                          name="jobType"
                          id="hybrid"
                        />
                        <label
                          className="flex justify-center items-center py-2 px-3 text-sm text-text-hint bg-white border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-secondary-500 peer-checked:text-white peer-checked:border-secondary-800"
                          htmlFor="hybrid"
                        >
                          Hybrid
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="sales-person" className="text-text-hint mb-1">
                    Sales Person
                  </label>
                  <select
                    onChange={handleChangeJob}
                    name="salesPerson"
                    value={marketingJob.salesPerson}
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
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col w-72">
                  <label htmlFor="bill-rate" className="text-text-hint mb-1">
                    Bill Rate
                  </label>
                  <input
                    onChange={handleChangeJob}
                    value={marketingJob.billRate}
                    name="billRate"
                    type="text"
                    placeholder="Bill Rate"
                    id="bill-rate"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div>
                <div className="flex flex-col w-72">
                  <label htmlFor="duration" className="text-text-hint mb-1">
                    Duration
                  </label>
                  <input
                    onChange={handleChangeJob}
                    value={marketingJob.duration}
                    name="duration"
                    type="text"
                    placeholder="Duration"
                    id="duration"
                    className="outline-none border-2 border-secondary-500 rounded-lg "
                  />
                </div>
              </div>
              <div className="">
                <div className="w-96">
                  <label className="text-text-hint "> Status</label>
                  <ul className="grid grid-cols-3 mt-1">
                    <li className="relative">
                      <input
                        onChange={handleChangeJob}
                        checked={marketingJob.status === "In Progress"}
                        className="sr-only peer"
                        type="radio"
                        value="In Progress"
                        name="status"
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
                        onChange={handleChangeJob}
                        checked={marketingJob.status === "shortlisted"}
                        className="sr-only peer"
                        type="radio"
                        value="shortlisted"
                        name="status"
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
                        onChange={handleChangeJob}
                        checked={marketingJob.status === "Not Selected"}
                        className="sr-only peer"
                        type="radio"
                        value="Not Selected"
                        name="status"
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
                onClick={handleSubmitJob}
                className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {isLoading && <Loader />}
          <div className="">
            <form className="flex flex-col gap-7 ">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col  ">
                  <label
                    htmlFor="interview_date"
                    className="text-text-hint mb-1"
                  >
                    Interview Date
                  </label>
                  <input
                    onChange={handleChangeInterview}
                    value={jobInterview.interviewDate}
                    name="interviewDate"
                    type="date"
                    id="interview_date"
                    className="outline-none border-2 border-text-hint rounded-lg "
                  />
                </div>

                <div className="flex flex-col ">
                  <label
                    htmlFor="interview_time"
                    className="text-text-hint mb-1"
                  >
                    Interview Time
                  </label>
                  <div className="flex outline-none border-2 border-text-hint rounded-lg px-1">
                    <input
                      onChange={handleChangeInterview}
                      value={jobInterview.interviewTime}
                      name="interviewTime"
                      type="time"
                      id="interview_time"
                      className="outline-none border-none focus:ring-0"
                    />{" "}
                    <input
                      onChange={handleChangeInterview}
                      value={jobInterview.timeStandard}
                      name="timeStandard"
                      type="text"
                      id="interview_time"
                      placeholder="IST"
                      className="outline-none border-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col ">
                  <label
                    htmlFor="appointment_details"
                    className="text-text-hint mb-1"
                  >
                    Appointment Details
                  </label>
                  <textarea
                    onChange={handleChangeInterview}
                    value={jobInterview.appointmentDetails}
                    name="appointmentDetails"
                    type="text"
                    placeholder="Appointment Details"
                    id="appointment_details"
                    className="focus:outline-none border  rounded-lg "
                    rows={4}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <button className=" bg-secondary-50 text-secondary-800 rounded-full py-2 px-6">
                      <span className="pr-3">+</span>
                      Add Links Available
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="add_link" className="text-text-hint mb-1">
                      Add Link
                    </label>
                    <input
                      onChange={handleChangeInterview}
                      value={jobInterview.appointmentDetailsLink}
                      name="appointmentDetailsLink"
                      type="text"
                      placeholder="Link"
                      id="add_link"
                      className="outline-none border-2 border-secondary-500 rounded-lg "
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col ">
                  <label
                    htmlFor="interview-panel"
                    className="text-text-hint mb-1"
                  >
                    Interview Panel Details
                  </label>
                  <textarea
                    onChange={handleChangeInterview}
                    value={jobInterview.panelDetails}
                    name="panelDetails"
                    type="text"
                    placeholder="Interview Panel Details"
                    id="interview-panel"
                    className="focus:outline-none border  rounded-lg "
                    rows={4}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <button className=" bg-secondary-50 text-secondary-800 rounded-full py-2 px-6">
                      <span className="pr-3">+</span>
                      Add Links Available
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="add_link" className="text-text-hint mb-1">
                      Add Link
                    </label>
                    <input
                      onChange={handleChangeInterview}
                      value={jobInterview.panelDetailsLink}
                      name="panelDetailsLink"
                      type="text"
                      placeholder="Link"
                      id="add_link"
                      className="outline-none border-2 border-secondary-500 rounded-lg "
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="feedback" className="text-text-hint mb-1">
                  FeedBack
                </label>
                <textarea
                  onChange={handleChangeInterview}
                  value={jobInterview.feedBack}
                  name="feedBack"
                  type="text"
                  placeholder="FeedBack"
                  id="feedback"
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
                />
              </div>
              <div>
                <label className="text-text-hint mb-1">Rating</label>
                <StarRating
                  onRatingChange={onRatingChange}
                  initialRating={jobInterview.rating}
                  fontSize={24}
                  setProfileRating={setProfileRating}
                />
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
                onClick={handleSubmitInterview}
                className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="border  border-gray-300 mt-5 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex items-center gap-3">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>
          <div className="flex items-center gap-5">
            <Dropdown />
            <button
              onClick={handleAddJobsModal}
              id="add_jobs"
              className=" border border-secondary-700 text-secondary-700 bg-white py-2 px-5 rounded-full font-normal "
            >
              <span className="text-lg mr-3">+</span>
              Add Jobs
            </button>
            <button
              onClick={handleNewInterviewModal}
              id="add_new_interview"
              className=" bg-secondary-700 text-white py-2 px-5 rounded-full font-normal"
            >
              <span className="text-lg mr-3">+</span>
              Add New Interview
            </button>
          </div>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-11 gap-1 text-left py-3 pl-3 pr-6 bg-secondary-50 text-xs">
                <th className="col-span-2">Job</th>
                <th className="col-span-2">Vendor Info</th>
                <th>Technology</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Bill Rate</th>
                <th>Duration</th>
                <th>Sales Person</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center justify-between overflow-y-scroll w-full h-screen"
            // style={{ height: "90vh" }}
            >
              {jobListData.map((data) => (
                <tr
                  className={`grid grid-cols-11 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm  
                  `}
                // ${
                //   isActive ? "bg-auxiliary-50" : "bg-white"
                // }
                >
                  <td className="flex gap-2 col-span-2">
                    <div>
                      <input
                        type="checkbox"
                        className="rounded form-checkbox focus:outline-none focus-visible:outline-none  "
                      // onClick={(e) => handleCheck(e.target.checked)}
                      />
                    </div>
                    <div>
                      <h3 className="text-auxiliary-800 text-base cursor-pointer hover:underline" onClick={() => patchModalData(data)}>
                        {data.job_id}
                      </h3>
                      <p className="text-text-hint break-words font-normal">
                        {data.job_title}
                      </p>
                    </div>
                  </td>
                  <td className="col-span-2">
                    <h5 className="text-sm">{data.vendor_name}</h5>patchModalData
                    <p className="text-xs text-text-hint">
                      {data.vendor_email}
                    </p>
                    <p className="text-xs text-text-hint">10/10/10</p>
                  </td>
                  <td className="">{data.technology_desc}</td>
                  <td className="">
                    <h5 className="text-sm">{data.city}</h5>
                    <p className="text-xs text-text-hint">{data.state}</p>
                  </td>
                  <td className="py-2 border border-success-700 text-success-700 text-xs rounded-full flex justify-center items-center">
                    Remote
                  </td>
                  <td className="pl-3">{data.bill_rate}</td>
                  <td className=" text-xs">
                    <p className="flex gap-3">
                      <span>{data.duration}</span>
                      <span className="text-text-hint">Months</span>
                    </p>
                  </td>
                  <td className="text-sm pl-3">{data.sales_person_name}</td>
                  <td className="py-2 border border-success-700 text-success-700 text-xs rounded-full flex justify-center items-center">
                    Employed
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

export default MarketingJobs;
