import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import Filter from "../../../components/Filter";
import StarRating from "../../../components/StarRating";
import Pagination from "../../../components/Pagination";
import Modal from "../../../components/ModalComponents/Modal";
import { createJobLead, updateJobLead } from "../../../api/sales";
import { useSelector } from "react-redux";
import { formatDate, getUserInfoDetails, mapToOption } from "../../../utlis";
import useFetch from "../../../hooks/useFetch";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useForm } from "react-hook-form";
import MUIDataTable from "mui-datatables";
import MyTable from "../../../components/MyTable";
const { companyId, clientId } = getUserInfoDetails();

const JobLeads = () => {
  const initialJobLead = {
    jobTitle: "",
    vendorId: "",
    durationMonths: "",
    client: "",
    technology: "",
    numOfPositions: "",
    sales_person_id: "",
    billRate:"",
    payType: "",
    state: "",
    city: "",
    createdOn: "",
    statusReason: "",
    jobContactName: "",
    jobContactEmail: "",
    jobContactPhoneNum: "",
    jobDescription: "",
  };
  const { register, handleSubmit, setValue,reset, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobLead, setJobLead] = useState(initialJobLead);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState()

  const referenceData = useSelector((state) => state.reference);
   // const { data: refSalesPerson, loading: refSalesLoading } = useFetch(`/salesteam?userType=manager`, {
  //   company: companyId, client: clientId
  // });
  const { data: refSalesPerson, loading: refSalesLoading } = useFetch(`/salesteam`, {
    company: companyId, client: clientId
  });
  const { data: refVendor, loading: refVendorLoading } = useFetch('/vendors');

  const openModalForNewJob = () => {
    setJobLead(initialJobLead);
    reset(initialJobLead); // Reset the form with initial values when opening for a new job
    setIsModalOpen(true);
  };

  const openModalForUpdate = (jobLead) => {
    setJobLead(jobLead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJobLead(initialJobLead);
    reset(initialJobLead); // Reset the form with initial values when closing the modal
  };

  const prepareUpdate = (job_id) => {
    const jobData = data.find(d => d.job_id === job_id);
    if (!jobData) {
      toast.error("Job not found");
      return;
    }
  
    const currentJobLead = {
      jobTitle: jobData.job_title,
      jobId: jobData.job_id,
      vendorId: jobData.vendor_id,
      durationMonths: jobData.duration,
      client: jobData.end_client_name,
      technology: jobData.technology_id,
      numOfPositions: jobData.no_of_openings,
      salesManager: jobData.sales_person_id,
      billRate: jobData.bill_rate,
      payType: jobData.payment_type_id,
      state: jobData.state,
      city: jobData.city,
      createdOn: formatDate(jobData.created),
      statusReason: "",
      jobContactName: "",
      jobContactEmail: "",
      jobContactPhoneNum: "",
      jobDescription: jobData.job_desc,
    };
  
    setJobLead(currentJobLead);
    setValue("jobTitle", currentJobLead.jobTitle);
    setValue("vendorId", currentJobLead.vendorId);
    setValue("durationMonths", currentJobLead.durationMonths);
    setValue("client", currentJobLead.client);
    setValue("technology", currentJobLead.technology);
    setValue("numOfPositions", currentJobLead.numOfPositions);
    setValue("sales_person_id", currentJobLead.salesManager);
    setValue("billRate", currentJobLead.billRate);
    setValue("payType", currentJobLead.payType);
    setValue("state", currentJobLead.state);
    setValue("city", currentJobLead.city);
    setValue("createdOn", currentJobLead.createdOn);
    setValue("statusReason", currentJobLead.statusReason);
    setValue("jobContactName", currentJobLead.jobContactName);
    setValue("jobContactEmail", currentJobLead.jobContactEmail);
    setValue("jobContactPhoneNum", currentJobLead.jobContactPhoneNum);
    setValue("jobDescription", currentJobLead.jobDescription);
    openModalForUpdate(currentJobLead); // Open the modal with the current job lead data
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = jobLead.jobId ? await updateJobLead({ ...formData, jobId: jobLead.jobId }) : await createJobLead(formData);
      closeModal();
      getData();
      toast.success(jobLead.jobId ? "Job Lead Updated Successfully" : "Job Lead Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save job lead");
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/jobs', {
        params: { company: companyId, client: clientId }
      });
      setData(res.data.data.records);
      console.log(res.data.data.records);
      
    } catch (error) {
      toast.error('Something went wrong while fetching job data');
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  const columns = [
    
    {
      name: "job_id",
      label: "ID",
      options: {
        display:[false]
      },
    },

    {
      name: "job_title",
      label: "Job Title",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const job_title = tableMeta.rowData[tableMeta.columnIndex];
          const job_desc = tableMeta.rowData[tableMeta.columnIndex + 1];
          return (
            <>
              <h3 onClick={()=>prepareUpdate(tableMeta.rowData[0])} className="text-base font-bold text-auxiliary-800 cursor-pointer">
                {`${job_title}`}
              </h3>
              <p className="text-text-hint">{job_desc}</p>
            </>
          );
        }
      },
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
      name: "client",
      label: "Client",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "duration",
      label: "Duration",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>  (`${value} months`)
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
      name: "sales_person_name",
      label: "Sales Manager",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "city",
      label: "Job Location",

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
      name: "status",
      label: "Status Reason",
      options: {
        filter: true,
        sort: true,
        
        customBodyRender: (value) => (
          <p 
          className={`border py-2 px-6 rounded-full w-32 text-center border-secondary-500 text-secondary-500`}
          >
            Completed
          </p>
        )
      }
    },
    // {
    //   name: "created",
    //   label: "Jon Contact",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: pageSize,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 200],
    onChangeRowsPerPage: (numberOfRows) => setPageSize(numberOfRows),
    selectableRows: false,
    elevation: 0,
    // onRowClick: (rowData, rowMeta) => {
    // prepareUpdate(rowData);
    // },
  };
  return (
    <div className="p-5 ">
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="job_title" className="text-text-hint mb-1">
                  Job Title *
                </label>
                <input
                 {...register("jobTitle", { required: "Job Title is required" })}
                  name="jobTitle"
                  type="text"
                  placeholder="Job Title"
                  id="job_title"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.jobTitle && <span className="text-red-500">{errors.jobTitle.message}</span>}

              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="vendor" className="text-text-hint mb-1">
                  Vendor *
                </label>
                <select
                  {...register("vendorId", { required: "Vendor is required" })}
                 
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {!refVendorLoading && mapToOption(refVendor.response?.data, 'name', 'vendor_id').map((option, i) => (
                    <option key={`${option.value}_${i + 1}`} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.vendor && <span className="text-red-500">{errors.vendor.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="duration" className="text-text-hint mb-1">
                  Duration in Months *
                </label>
                <input
                  {...register("durationMonths", { required: "Duration Months is required", pattern: { value: /^\d+$/, message: "Must be a number" } })}
                  placeholder="Duration Months"
                  id="durationMonths"
                  name="durationMonths"
                  type="text"
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full"
                />
                {errors.durationMonths && <span className="text-red-500">{errors.durationMonths.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="client" className="text-text-hint mb-1">
                  Client *
                </label>
                <input
                  {...register("client", { required: "Client is required" })}
                  name="client"
                  type="text"
                  placeholder="Client "
                  id="client"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.client && <span className="text-red-500">{errors.client.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="technology" className="text-text-hint mb-1">
                  Technology *
                </label>
                <select
                  {...register("technology", { required: "Technology is required" })}
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.technologies.technology, 'description', 'technology_id').map((option, i) => (
                    <option key={`${option.value}_${i + 1}`} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.technology && <span className="text-red-500">{errors.technology.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="client" className="text-text-hint mb-1">
                  Number of Positions *
                </label>
                <input
                  {...register("numOfPositions", { required: "Number of Positions is required", pattern: { value: /^\d+$/, message: "Must be a number" } })}
                  placeholder="Number of Positions"
                  type="text"
                  id="client"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.numOfPositions && <span className="text-red-500">{errors.numOfPositions.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="sales_manager" className="text-text-hint mb-1">
                  Sales Manager *
                </label>
                <select
                  {...register("salesManager", { required: "Sales Manager is required" })}
                  className="flex justify-center items-center focus:ring-0 px-3 py-2 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {!refSalesLoading && mapToOption(refSalesPerson?.data?.records, 'first_name', 'manager_id').map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.salesManager && <span className="text-red-500">{errors.salesManager.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="billRate" className="text-text-hint mb-1">
                  Bill Rate
                  </label>
                <input
                  {...register("billRate", { required: "Bill Rate is required", pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Must be a valid rate" } })}
                  placeholder="Bill Rate"
                  id="billRate"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.billRate && <span className="text-red-500">{errors.billRate.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="pay_type" className="text-text-hint mb-1">
                  Pay Type
                </label>
                <select
                  {...register("payType", { required: "Pay Type is required" })}
                  className="flex justify-center items-center focus:ring-0 px-3 py-2 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.paytypes.Pay, 'type').map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.payType && <span className="text-red-500">{errors.payType.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="state" className="text-text-hint mb-1">
                  State
                </label>
                <select
                  {...register("state", { required: "state  is required" })}
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.states.state, 'name').map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="text-red-500">{errors.state.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="city" className="text-text-hint mb-1">
                  City
                </label>
                <select
                  {...register("city", { required: "City is required" })}
                 
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.cities.city, 'name').map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.city && <span className="text-red-500">{errors.city.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="created_date" className="text-text-hint mb-1">
                  Ceated on
                </label>
                <input
                  {...register("createdOn", { required: "Created On is required" })}
                  type="date"
                  name="createdOn"
                  id="createdOn"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
                {errors.createdOn && <span className="text-red-500">{errors.createdOn.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-2">
                <label htmlFor="statusReason" className="text-text-hint mb-1">
                  Status Reason
                </label>
                <textarea
                  {...register("statusReason", { required: "Status Reason is required" })}
                  name="statusReason"
                  type="text"
                  placeholder="Status Reason"
                  id="statusReason"
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
                />
                {errors.statusReason && <span className="text-red-500">{errors.statusReason.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="job_contat" className="text-text-hint mb-1">
                  Job Contact Name
                </label>
                <input
                  {...register("jobContactName", { required: "Job Contact Name is required" })}
                  placeholder="Job Contact Name"
                  type="text"
                  id="jobContactName"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                 {errors.jobContactName && <span className="text-red-500">{errors.jobContactName.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="job_email" className="text-text-hint mb-1">
                  Job Contact Email
                </label>
                <input
                  {...register("jobContactEmail", { required: "Job Contact Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Must be a valid email address" } })}
                  type="email"
                  placeholder="Job Contact Email"
                  id="jobContactEmail"
  
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.jobContactEmail && <span className="text-red-500">{errors.jobContactEmail.message}</span>}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="job_phone" className="text-text-hint mb-1">
                  Job Contact Phone Number
                </label>
                <input
                  {...register("jobContactPhoneNum", { required: "Job Contact Phone Number is required"})}
                  placeholder="Job Contact Phone Number"
                  id="jobContactPhoneNum"
                  type="text"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.jobContactPhoneNum && <span className="text-red-500">{errors.jobContactPhoneNum.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-2 ">
                <label htmlFor="document_type" className="text-text-hint mb-1">
                  Job Description
                </label>
                <textarea
                  {...register("jobDescription", { required: "Job Description is required" })}
                  placeholder="Job Description"
                  id="jobDescription"
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
                />
                {errors.jobDescription && <span className="text-red-500">{errors.jobDescription.message}</span>}
              </div>
            </div>
            <div className="flex justify-between p-6 mt-6">
            <button
              type="button" // Ensure this is a button and not a submit button
              onClick={closeModal}
              className="border border-secondary-800 text-secondary-800 py-2 px-5 rounded-full"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
            >
              Save
            </button>
          </div>
          </form>
           
        </div>
      </Modal>

      <div className="border border-gray-300 rounded-lg ">
      <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload className="cursor-pointer" size={20} onClick={getData} />
           </div>

          <button
            onClick={openModalForNewJob}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add  Job
          </button>
        </div>
        <div className="w-full overflow-x">
          <MyTable
            title={"Job Leads"}
            data={data}
            columns={columns}
            option={options}
          />
        </div>
      </div>

     
    </div>
  );
};

export default JobLeads;
