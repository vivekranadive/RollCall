import React, { useEffect, useState } from "react";
import Modal from "../../../components/ModalComponents/Modal";
import { RxReload } from "react-icons/rx";
import StarRating from "../../../components/StarRating";
import QrCode from "../../../images/Qr-code.png";
import { createSalesInterview, updateSalesInterview } from "../../../api/sales";
import axiosInstance from "../../../api/axiosInstance";
import { formatDate, getUserInfoDetails, mapToOption } from "../../../utlis";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Pagination from "../../../components/Pagination";
import MyTable from "../../../components/MyTable";
const { companyId, clientId } = getUserInfoDetails();

const SalesInterviews = () => {
  const initialSalesInterview = {
    job: "",
    jobTitle: "",
    candidateName: "",
    technology: "",
    vendor: "",
    clientCompany: "",
    clientName: "",
    createdOn: "",
    interviewer1: "",
    interviewer2: "",
    jobDescription: "",
    link: "",
    interviewStatus: "",
    rating: 0,
    feedback: "",
  };
  const { register, handleSubmit, reset,watch,setValue, formState: { errors } } = useForm({
    defaultValues: {
      interviewStatus: "active",
    },
  });
  const interviewStatus = watch("interviewStatus");
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(initialSalesInterview);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [pageSize, setPageSize] = useState()
  const referenceData = useSelector((state) => state.reference);
  const { data: refCandidate, loading: refCandidateLoading } = useFetch('/candidates');
  const { data: refVendor, loading: refVendorLoading } = useFetch('/vendors');
  const { data: refJobs, loading: refJobsLoading } = useFetch('/jobs'); // Fetch jobs

  
 
  useEffect(() => {
    if (refJobs && !refJobsLoading) {
      setJobs(refJobs.data.records); // Assuming the jobs are in 'records'
    }
  }, [refJobs, refJobsLoading]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset(initialSalesInterview);
    setSelectedJob(""); 
  };
  

  const onRatingChange = (rating) => {
    setValue('rating', parseInt(rating));
  };
  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedDate = formatDateForAPI(data.createdOn);
      if (!formattedDate) {
        throw new Error("Invalid date format");
      }
      
      const formattedData = {
        ...data,
        createdOn: formattedDate,
        status: data.interviewStatus,
      };
      const response = await (data.interviewId ? updateSalesInterview(formattedData) : createSalesInterview(formattedData));
      closeModal();
      fetchInterviews();
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
      toast.success('Interview Added Succesfully');
    }
  };

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/interview?client=${clientId}&company=${companyId}`);
      setData(res.data.data.records);
      
    } catch (err) {
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };
  console.log(data)
  useEffect(() => {
    fetchInterviews()
  }, [])

  const prepareUpdate = (record_id) => {
    try {
      const interview = data.find(d => d.record_id === record_id);
      if (!interview) {
        throw new Error("Interview not found");
      }

      setCurrentInterview(interview);
  
  // Set the selectedJob state
  setSelectedJob(interview.job_id);

  // Find the job details
  const selectedJobDetails = jobs.find(job => String(job.job_id) === String(interview.job_id));
  const [interviewer1 = '', interviewer2 = ''] = (interview.interview_panel_details || '').split(',').map(name => name.trim());
  // Reset the form with all the interview data
  reset({
    job: interview.job_id,
    jobTitle: selectedJobDetails ? selectedJobDetails.job_title : interview.job_title,
    candidateName: interview.candidate_id,
    technology: selectedJobDetails ? selectedJobDetails.technology_id : interview.technology_id,
    vendor: selectedJobDetails ? selectedJobDetails.vendor_id : interview.vendor_id,
    clientCompany: selectedJobDetails ? selectedJobDetails.company : interview.company,
    clientName: selectedJobDetails ? selectedJobDetails.client : interview.client,
    createdOn: interview.created,
    interviewer1: interviewer1,
    interviewer2: interviewer2,
    jobDescription: selectedJobDetails ? selectedJobDetails.job_desc : interview.job_desc,
    link: interview.appointment_link,
    interviewStatus: interview.scheduling_status || "active",
    rating: interview.rating,
    feedback: interview.feedback,
    interviewId: interview.record_id,
  });
  setValue('rating', interview.rating || '0');
  console.log("Rating after setValue:", watch('rating'));

  openModal();
    } catch (error) {
      console.error("Error in prepareUpdate:", error);
      toast.error(error.message || "An error occurred while preparing the update");
    }
  };
 
  const handleJobChange = (event) => {
    const jobId = event.target.value;
    setSelectedJob(jobId);
    const selectedJobDetails = jobs.find((job) => String(job.job_id) === String(jobId));
    console.log('Selected Job Details:', selectedJobDetails); // Log selected job details
    if (selectedJobDetails) {
      // Set form values based on selected job details
      setValue('jobTitle', selectedJobDetails.job_title);
      setValue('technology', selectedJobDetails.technology_id);
      setValue('vendor', selectedJobDetails.vendor_id);
      setValue('clientCompany', selectedJobDetails.company);
      setValue('clientName', selectedJobDetails.client);
      setValue('jobDescription', selectedJobDetails.job_desc);
    } else {
      // Clear form fields if no job is selected
      reset({
        jobTitle: "",
        technology: "",
        vendor: "",
        clientCompany: "",
        clientName: "",
        jobDescription: "",
      });
    }
  };


  const columns = [
    {
      name: "record_id",
      label: "ID",
      options: {
        display:[false]
      },
    },

    {
      name: "job_title",
      label: "Job",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const job_title = tableMeta.rowData[tableMeta.columnIndex];
          const job_desc = tableMeta.rowData[tableMeta.columnIndex +1];
          return (
            <>
              <h3 onClick={()=>prepareUpdate(tableMeta.rowData[0])} className="text-base font-bold text-auxiliary-800 cursor-pointer">
                {`${job_title}`}
              </h3>
              
            </>
          );
        }
      },
    },

    {
        name: "candidate_id",
        label: "Candidate",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "client",
        label: "Client",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const client = tableMeta.rowData[tableMeta.columnIndex];
            const company = tableMeta.rowData[tableMeta.columnIndex +1];
            return (
              <>
                <h3>{client}</h3>
                <p className="text-xs text-text-hint w-">{company}</p>
                
              </>
            );
          }
      
        }
      },

    {
      name: "vendor_name",
      label: "Vendor",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "created",
      label: "Created on",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (formatDate(value))
      }
    },
    {
      name: "bill_rate",
      label: "Bill Rate",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (`${value} USD`)
      }
    },
 
   
    {
      name: "interview_panel_details",
      label: "Interviewer",
      options: {
   
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if (!value) {
            return ""; 
          }
          
          const truncatedValue = value.split(" ").slice(0, 2).join(" ") + (value.split(" ").length > 2 ? "..." : "");
    
          return (
            <span title={value}>
              {truncatedValue}
            </span>
          );
        }
      }
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        filter: true,
        sort: true,
        
        customBodyRender: (value) => (
          <StarRating fontSize={16} initialRating={parseInt(value)} />
        )
      }
    },
    {
      name: "feedback",
      label: "FeedBack",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <>
            <p>{value}</p>
            <img src={QrCode} alt="qr-code" />
          </>
        )
      }
    },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: pageSize,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 200],
    onChangeRowsPerPage: (numberOfRows) => setPageSize(numberOfRows),
    selectableRows: false,
    elevation: 0,

  };
  return (
    <div className="p-5 ">
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col w-72">
                <label htmlFor="job" className="text-text-hint mb-1">Job</label>
                <select
                    {...register('job', { required: "Job is required" })}
                    id="job"
                    className="outline-none border-2 border-secondary-500 rounded-lg"
                    value={selectedJob}
                    onChange={handleJobChange}
                  >
                    <option value="">Select a job</option>
                    {jobs.map((job) => (
                      <option key={job.job_id} value={job.job_id}>{job.job_title}</option>
                    ))}
                </select>
                {errors.job && <p className="text-red-500">{errors.job.message}</p>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="jobTitle" className="text-text-hint mb-1">Job Title</label>
                <input
                  {...register('jobTitle', { required: "Job Title is required" })}
                  placeholder="Job Title"
                  id="jobTitle"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg"
                />
                {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              
              <div className="flex flex-col w-72">
                <label htmlFor="technology" className="text-text-hint mb-1">Technology</label>
                <select
                  {...register('technology', { required: "Technology is required" })}
                  className="flex justify-center items-center focus:ring-0 px-3 py-2 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.technologies.technology, 'description', 'technology_id').map((option) => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                  ))}
                </select>
                {errors.technology && <p className="text-red-500">{errors.technology.message}</p>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="vendor" className="text-text-hint mb-1">
                  Vendor
                </label>
                <select
                {...register('vendor', { required: "Vendor is required" })}
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {!refVendorLoading && mapToOption(refVendor.response?.data, 'name', 'vendor_id').map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.vendor && <p className="text-red-500">{errors.vendor.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col w-72">
                <label htmlFor="candidateName" className="text-text-hint mb-1">Candidate Name</label>
                <select
                  {...register('candidateName', { required: "Candidate Name is required" })}
                  className="flex justify-center items-center focus:ring-0 px-3 py-2 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(!refCandidateLoading ? refCandidate?.data?.records : [], 'first_name', 'candidate_id').map((option) => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                  ))}
                </select>
                {errors.candidateName && <p className="text-red-500">{errors.candidateName.message}</p>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="clientCompany" className="text-text-hint mb-1">
                  Client Company
                </label>
                <input
                  {...register('clientCompany', { required: "clientCompany is required" })}
                  id="clientCompany"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              {errors.clientCompany && <p className="text-red-500">{errors.clientCompany.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              
              <div className="flex flex-col w-72">
                <label htmlFor="clientName" className="text-text-hint mb-1">
                  Client Name
                </label>
                <input
                  {...register('clientName', { required: "clientCompany is required" })}
                  id="clientName"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                 {errors.clientName && <p className="text-red-500">{errors.clientName.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="createdOn" className="text-text-hint mb-1">
                  Ceated on
                </label>
                <input
                 {...register('createdOn', { required: "createdOn is required" })}
                  id="createdOn"
                  type="date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
                {errors.createdOn && <p className="text-red-500">{errors.createdOn.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="interviewer1" className="text-text-hint mb-1">
                  Interviewer 1
                </label>
                <input
               {...register('interviewer1', { required: "interviewer1 is required" })}
                  id="interviewer1"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                 {errors.interviewer1 && <p className="text-red-500">{errors.interviewer1.message}</p>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="interviewer1" className="text-text-hint mb-1">
                  Interviewer 2
                </label>
                <input
               {...register('interviewer2')}
                  id="interviewer2"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col col-span-3 ">
                <label htmlFor="jobDescription" className="text-text-hint mb-1">
                  Job Description
                </label>
                <textarea
                  {...register('jobDescription', { required: "jobDescription is required" })}
                  id="jobDescription"
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
                />
                 {errors.jobDescription && <p className="text-red-500">{errors.jobDescription.message}</p>}

              </div>
            </div>
            <div className="flex flex-col justify-between w-96 gap-5">
              <div className="flex flex-col ">
                <label htmlFor="link" className="text-text-hint mb-1">
                  Add Link
                </label>
                <input
             {...register('link', { required: "link is required" })}
                  id="link"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.link && <p className="text-red-500">{errors.link.message}</p>}
              </div>
            </div>
            <div className="">
            <div className="w-96">
              <label className="text-text-hint" htmlFor="interviewStatus">Interview Status</label>
              <ul className="grid grid-cols-3 mt-1">
            <li className="relative">
              <input
                {...register("interviewStatus", { required: "Interview status is required" })}
                type="radio"
                value="active"
                id="active"
                checked={watch("interviewStatus") === "active"}
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 ${interviewStatus === "active" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="active"
              >
                Active
              </label>
            </li>
            <li className="relative">
              <input
                {...register("interviewStatus", { required: "Interview status is required" })}
                type="radio"
                value="in active"
                id="in_active"
                checked={watch("interviewStatus") === "in active"}
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 ${interviewStatus === "in active" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="in_active"
              >
                In Active
              </label>
            </li>
            <li className="relative">
              <input
                {...register("interviewStatus", { required: "Interview status is required" })}
                type="radio"
                value="fraud"
                id="fraud"
                checked={watch("interviewStatus") === "fraud"}
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white text-danger-500 border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 ${interviewStatus === "fraud" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="fraud"
              >
                Fraud
              </label>
            </li>
          </ul>
          {errors.interviewStatus && <span className="text-danger-500">{errors.interviewStatus.message}</span>}
            </div>
          </div>
            <div>
              <h3>Rating</h3>
              <StarRating
                initialRating={watch('rating') || '0'} // Provide a default value if rating is undefined
                fontSize={24}
                onRatingChange={onRatingChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col col-span-3 ">
                <label htmlFor="feedback" className="text-text-hint mb-1">
                  Feedback
                </label>
                <textarea
                 {...register('feedback')}
                  id="feedback"
                  placeholder="feedback"
         
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
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
            onClick={handleSubmit(onSubmit)}
            type="submit"
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
            <RxReload className="cursor-pointer" size={20} onClick={fetchInterviews} />
           </div>

          <button
            onClick={openModal}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add New InterView
          </button>
        </div>
        <div className="w-full overflow-x">
          <MyTable
              title={"Interviews"}
              data={data}
              columns={columns}
              option={options}
            />
         
        </div>
      
      </div>
    </div>
  );
};

export default SalesInterviews;