import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import Modal from "../../../components/ModalComponents/Modal";
import { getUserInfoDetails, mapToOption } from "../../../utlis";
import Loader from "../../../components/Loader";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import MyTable from "../../../components/MyTable";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { createProject, UpdateProject } from "../../../api/sales";

const { companyId, clientId } = getUserInfoDetails();

const SalesProjects = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      status: "Active",
      remoteWork: "Y",
    },
  });
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentProject, setCurrentProject] = useState(null);

  const status = watch("status");
  const remoteWork = watch("remoteWork");

  const referenceData = useSelector((state) => state.reference);

  const { data: refCandidate, loading: refCandidateLoading } = useFetch('/candidates');
  const { data: refVendor, loading: refVendorLoading } = useFetch('/vendors');
  const { data: refJobs, loading: refJobsLoading } = useFetch('/jobs'); // Fetch jobs
  useEffect(() => {
    if (refJobs && !refJobsLoading) {
      setJobs(refJobs.data.records); // Assuming the jobs are in 'records'
    }
  }, [refJobs, refJobsLoading]);
  const { data: refSalesPerson, loading: refSalesLoading } = useFetch(`/salesteam`, {
    company: companyId, client: clientId
  });

  const openModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      reset({
        candidateId: project.candidate_id,
        jobId: project.job_id,
        remoteWork: project.remote_work,
        startDate: formatDateForForm(project.start_date),
        estimatedEndDate: formatDateForForm(project.estimated_end_date),
        status: project.status,
        state: project.state,
        city: project.city,
        salesMgrId: project.sales_mgr_id,
        vendorContactId: project.vendor_contact_id,
        billingRate: project.billing_rate,
        payType: project.pay_type,
        firstInvoiceDate: formatDateForForm(project.first_invoice_date),
        lastInvoiceDate: formatDateForForm(project.last_invoice_date),
        nextInvoiceDate: formatDateForForm(project.next_invoice_date),
        invoiceContactEmail: project.invoice_contact_email,
        projectId: project.project_id,
      });
    } else {
      setCurrentProject(null);
      reset({
        candidateId: '',
        jobId: '',
        remoteWork: 'Y',
        startDate: '',
        estimatedEndDate: '',
        status: 'Active',
        state: '',
        city: '',
        salesMgrId: '',
        vendorContactId: '',
        billingRate: '',
        payType: '',
        firstInvoiceDate: '',
        lastInvoiceDate: '',
        nextInvoiceDate: '',
        invoiceContactEmail: '',
        projectId: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    reset({
      candidateId: '',
      jobId: '',
      remoteWork: 'Y',
      startDate: '',
      estimatedEndDate: '',
      status: 'Active',
      state: '',
      city: '',
      salesMgrId: '',
      vendorContactId: '',
      billingRate: '',
      payType: '',
      firstInvoiceDate: '',
      lastInvoiceDate: '',
      nextInvoiceDate: '',
      invoiceContactEmail: '',
      projectId: '',
    });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/projects', {
        params: { company: companyId, client: clientId }
      });
      setData(res.data.response.data);
    } catch (err) {
      toast.error('Something Went Wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
 

  }, []);

  const onSubmit = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        candidateId: Number(formData.candidateId),
        jobId: Number(formData.jobId),
        startDate: formData.startDate ? formatDate(formData.startDate) : null,
        estimatedEndDate: formData.estimatedEndDate ? formatDate(formData.estimatedEndDate) : null,
        salesMgrId: Number(formData.salesMgrId),
        accountingContactId: Number(formData.accountingContactId),
        hrContactId: Number(formData.hrContactId),
        vendorContactId: Number(formData.vendorContactId),
        billingRate: Number(formData.billingRate),
        firstInvoiceDate: formData.firstInvoiceDate ? formatDate(formData.firstInvoiceDate) : null,
        lastInvoiceDate: formData.lastInvoiceDate ? formatDate(formData.lastInvoiceDate) : null,
        nextInvoiceDate: formData.nextInvoiceDate ? formatDate(formData.nextInvoiceDate) : null,
      };

      if (currentProject) {
        // Update existing project
        const response = await UpdateProject(formattedData);
        toast.success('Project Updated Successfully');
      } else {
        // Create new project
        const response = await createProject(formattedData);
        toast.success('Project Created Successfully');
      }
      closeModal();
      getData();
    } catch (error) {
      console.error(error);
      toast.error('Something went Wrong');
    }
  };

  // Helper function to format date for form inputs
  const formatDateForForm = (dateString) => {
    if (!dateString) return ''; // Return empty string if dateString is null or undefined
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Return empty string if date is invalid
    return date.toISOString().split('T')[0];
  };

  // Add this custom helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const columns = [
    { name: "candidate_id", label: "Candidate ID" },
    { name: "job_id", label: "Job ID" },
    { name: "remote_work", label: "Remote Work" },
    { 
      name: "start_date", 
      label: "Start Date",
      options: {
        customBodyRender: (value) => formatDate(value)
      }
    },
    { 
      name: "estimated_end_date", 
      label: "Estimated End Date",
      options: {
        customBodyRender: (value) => formatDate(value)
      }
    },
    { name: "status", label: "Status" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "billing_rate", label: "Billing Rate" },
    { name: "pay_type", label: "Pay Type" },
    {
      name: "project_id",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <button onClick={() => prepareUpdate(value)} className="text-blue-500 hover:text-blue-700">
            Edit
          </button>
        )
      }
    }
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: pageSize,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 200],
    onChangeRowsPerPage: (numberOfRows) => setPageSize(numberOfRows),
    selectableRows: 'none',
    elevation: 0,
  };

  const prepareUpdate = (projectId) => {
    const project = data.find(p => p.project_id === projectId);
    if (project) {
      openModal(project);
    } else {
      toast.error('Project not found');
    }
  };

  return (
    <div className="p-5">
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="candidateId" className="text-text-hint mb-1">
                Candidate ID<span className="text-danger-500">*</span>
              </label>
              <select
                  {...register('candidateId', { required: "Candidate  is required" })}
                   className="outline-none border-2 border-secondary-500 rounded-lg"
                >
                  {mapToOption(!refCandidateLoading ? refCandidate?.data?.records : [], 'first_name', 'candidate_id').map((option) => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                  ))}
                </select>
              {errors.candidateId && <span className="text-danger-500">{errors.candidateId.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="jobId" className="text-text-hint mb-1">
                Job <span className="text-danger-500">*</span>
              </label>
              <select
                    {...register('jobId', { required: "job is required" })}
                    id="jobId"
                    
                    className="outline-none border-2 border-secondary-500 rounded-lg"
                   
                  >
                    {jobs.map((job) => (
                      <option key={job.job_id} value={job.job_id}>{job.job_title}</option>
                    ))}
                </select>
                {errors.jobId && <p className="text-red-500">{errors.jobId.message}</p>}
            
            </div>
            <div className="flex flex-col w-72">
              <label className="text-text-hint mb-1">
                Remote Work<span className="text-danger-500">*</span>
              </label>
              <div className="flex gap-4">
                <label>
                  <input
                    {...register("remoteWork", { required: "Remote work is required" })}
                    type="radio"
                    value="Y"
                  /> Yes
                </label>
                <label>
                  <input
                    {...register("remoteWork", { required: "Remote work is required" })}
                    type="radio"
                    value="N"
                  /> No
                </label>
              </div>
              {errors.remoteWork && <span className="text-danger-500">{errors.remoteWork.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="startDate" className="text-text-hint mb-1">
                Start Date<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("startDate", { required: "Start date is required" })}
                type="date"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.startDate && <span className="text-danger-500">{errors.startDate.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="estimatedEndDate" className="text-text-hint mb-1">
                Estimated End Date<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("estimatedEndDate", { required: "Estimated end date is required" })}
                type="date"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.estimatedEndDate && <span className="text-danger-500">{errors.estimatedEndDate.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="status" className="text-text-hint mb-1">
                Status<span className="text-danger-500">*</span>
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="outline-none border-2 border-secondary-500 rounded-lg"
              >
                {mapToOption(referenceData.genericstatuses.status, 'value').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.status && <span className="text-danger-500">{errors.status.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="state" className="text-text-hint mb-1">
                State<span className="text-danger-500">*</span>
              </label>
              <select
                {...register("state", { required: "State is required" })}
                className="outline-none border-2 border-secondary-500 rounded-lg"
              >
                <option value="">Select a state</option>
                {mapToOption(referenceData.states.state, 'name', 'code').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.state && <span className="text-danger-500">{errors.state.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="city" className="text-text-hint mb-1">
                City<span className="text-danger-500">*</span>
              </label>
              <select
                {...register("city", { required: "City is required" })}
                className="outline-none border-2 border-secondary-500 rounded-lg"
              >
                <option value="">Select a city</option>
                {mapToOption(referenceData.cities.city, 'name').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.city && <span className="text-danger-500">{errors.city.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="salesMgrId" className="text-text-hint mb-1">
                Sales Manager<span className="text-danger-500">*</span>
              </label>
              <select
                {...register("salesMgrId", { required: "Sales Manager is required" })}
                className="outline-none border-2 border-secondary-500 rounded-lg"
              >
                <option value="">Select a Sales Manager</option>
                {!refSalesLoading && mapToOption(refSalesPerson?.data?.records, 'first_name', 'manager_id').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.salesMgrId && <span className="text-danger-500">{errors.salesMgrId.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72 ">
              <label htmlFor="accountingContactId" className="text-text-hint mb-1">
                Accounting Contact ID<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("accountingContactId", { required: "Accounting Contact ID is required" })}
                type="number"
                value={1}
                placeholder="Accounting Contact ID"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.accountingContactId && <span className="text-danger-500">{errors.accountingContactId.message}</span>}
            </div>
            <div className="flex flex-col w-72  ">
              <label htmlFor="hrContactId" className="text-text-hint mb-1">
                HR Contact ID<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("hrContactId", { required: "HR Contact ID is required" })}
                type="number"
                value={1}
                placeholder="HR Contact ID"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.hrContactId && <span className="text-danger-500">{errors.hrContactId.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="vendorContactId" className="text-text-hint mb-1">
                Vendor<span className="text-danger-500">*</span>
              </label>
              <select
                {...register('vendorContactId', { required: "Vendor is required" })}
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
              {errors.vendorContactId && <span className="text-danger-500">{errors.vendorContactId.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="billingRate" className="text-text-hint mb-1">
                Billing Rate<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("billingRate", { required: "Billing Rate is required" })}
                type="number"
                step="0.01"
                placeholder="Billing Rate"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.billingRate && <span className="text-danger-500">{errors.billingRate.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="payType" className="text-text-hint mb-1">
                Pay Type<span className="text-danger-500">*</span>
              </label>
              <select
                {...register("payType", { required: "Pay Type is required" })}
                className="outline-none border-2 border-secondary-500 rounded-lg"
              >
                <option value="">Select a Pay Type</option>
                {mapToOption(referenceData.paytypes.Pay, 'type').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.payType && <span className="text-danger-500">{errors.payType.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="firstInvoiceDate" className="text-text-hint mb-1">
                First Invoice Date<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("firstInvoiceDate", { required: "First Invoice Date is required" })}
                type="date"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.firstInvoiceDate && <span className="text-danger-500">{errors.firstInvoiceDate.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="lastInvoiceDate" className="text-text-hint mb-1">
                Last Invoice Date<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("lastInvoiceDate", { required: "Last Invoice Date is required" })}
                type="date"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.lastInvoiceDate && <span className="text-danger-500">{errors.lastInvoiceDate.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="nextInvoiceDate" className="text-text-hint mb-1">
                Next Invoice Date<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("nextInvoiceDate", { required: "Next Invoice Date is required" })}
                type="date"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.nextInvoiceDate && <span className="text-danger-500">{errors.nextInvoiceDate.message}</span>}
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="invoiceContactEmail" className="text-text-hint mb-1">
                Invoice Contact Email<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("invoiceContactEmail", { 
                  required: "Invoice Contact Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              />
              {errors.invoiceContactEmail && <span className="text-danger-500">{errors.invoiceContactEmail.message}</span>}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="border border-secondary-800 text-secondary-800 py-2 px-5 rounded-full"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-secondary-700 text-white py-2 px-5 rounded-full"
            >
              {currentProject ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
      <div className="border border-gray-300 rounded-lg">
        <div className="flex justify-between items-center gap-2 p-3">
          <RxReload size={20} onClick={getData} className="cursor-pointer" />
          <button
            onClick={() => openModal()}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add New Project
          </button>
        </div>
        <div className="w-full overflow-x">
          <MyTable
            title="Sales Projects"
            data={data}
            columns={columns}
            option={options}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesProjects;
