import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import Modal from "../../../components/ModalComponents/Modal";
import { createSalesTeam, updateSalesTeam } from "../../../api/sales";
import { getUserInfoDetails, mapToOption } from "../../../utlis";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../api/axiosInstance";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import MyTable from "../../../components/MyTable";
const { companyId, clientId } = getUserInfoDetails()

const SalesTeams = () => {
  const initialSalesTeam = {
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    jobTitle: "",
    reportingManager: "",
    mobileNum: "",
    email: "",
    contactName: "",
    contactPhoneNum: "",
    contactEmail: "",
    contactRelation: "",
    notes: "",
    salesStatus: "",
  };
  const { register, handleSubmit, reset,watch, formState: { errors } } = useForm({
    defaultValues: {
      salesStatus: "active",
    },
  });
  const [jobs, setJobs] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const salesStatus = watch("salesStatus");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesTeam, setSalesTeam] = useState(initialSalesTeam);
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const relations = useSelector((state) => state.reference.relations)
  const { data: refSalesPerson, loading: refSalesLoading } = useFetch(`/salesteam?userType=manager`, {
    company: companyId, client: clientId
  })

  const { data: refJobs, loading: refJobsLoading } = useFetch('/jobs');
  useEffect(() => {
    if (refJobs && !refJobsLoading) {
      setJobs(refJobs.data.records);
    }
  }, [refJobs, refJobsLoading]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSalesTeam(initialSalesTeam);
    reset(initialSalesTeam);
  };
 

  const getData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/salesteam', {
        params: { company: companyId, client: clientId }
      });
      setData(res.data.data.records)
    } catch (err) {
      toast.error('Something Went Wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

   const onSubmit = async (formData) => {
    const payload = {
      "managerId": formData.reportingManager,
      "contactName": formData.contactName,
      "contactMobile": formData.contactPhoneNum,
      "contactEmail": formData.email,
      "relation": formData.contactRelation,
      "notes": formData.notes,
      "status": formData.salesStatus,
      "jobTitle": formData.jobTitle,
      // "userId": 3, we dont know where to get it
      "firstName": formData.firstName,
      "middleName": formData.middleName,
      "lastName": formData.lastName,
      "preferredName": formData.preferredName,
      "email": formData.email,
      "mobile": formData.mobileNum,
      "sales_person_id": formData.sales_person_id
    }

    try {
      const response = await (!salesTeam.sales_person_id ? createSalesTeam(payload) : updateSalesTeam(payload))
      closeModal()
      getData();
      toast.success('Contact Created Successfully')
    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong')
    }

    closeModal();
  };

  const prepareUpdate = (sales_person_id) => {
    const d = data.find(d => d.sales_person_id === sales_person_id);
    if (!d) {
      toast.error("sales person not found");
      return;
    }
    const createdDate = new Date(d.created);
    const updatedDate = new Date(d.updated);
    const currentSalesTeam = {
      firstName: d.first_name,
      middleName: d.middle_name,
      lastName: d.last_name,
      preferredName: d.preferred_name,
      jobTitle: d.job_title,
      reportingManager: d.manager_id,
      mobileNum: d.mobile,
      email: d.email,
      contactName: d.contact_name,
      contactPhoneNum: d.contact_mobile,
      contactEmail: d.contact_email,
      contactRelation: d.relation,
      notes: d.notes,
      salesStatus: d.status,
      sales_person_id: d.sales_person_id,
      createdDate: createdDate.toISOString().split("T")[0] || " ",
      createdTime: createdDate.toISOString().split("T")[1].slice(0, 5) || " ",
      updateDate: updatedDate.toISOString().split("T")[0] || " ",
      updateTime: updatedDate.toISOString().split("T")[1].slice(0, 5) || " ",
    };

    setSalesTeam(currentSalesTeam);
    reset(currentSalesTeam);

    openModal()
  }
  const columns = [
    {
      name: "sales_person_id",
      label: "ID",
      options: {
        display:[false]
      },
    },
    {
      name: "first_name", 
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const firstName = tableMeta.rowData[tableMeta.columnIndex];
          const lastName = tableMeta.rowData[tableMeta.columnIndex + 1]; // Adjust index if necessary
          const fullName = lastName ? `${firstName} ${lastName}` : firstName;
          return (
            
            <h3 onClick={()=>prepareUpdate(tableMeta.rowData[0])}  className="text-base font-bold text-auxiliary-800 cursor-pointer">
              {`${fullName}`}
            </h3>
          );
        }
      }
    },
    {
      name: "job_title",
      label: "Title",
    },
    {
      name: "mobile",
      label: "Mobile",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "address",
      label: "Address",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <p 
              className={`border py-2 px-6 rounded-full w-32 text-center ${
                value === 'active' 
                  ? 'border-secondary-500 text-secondary-500' 
                  : 'border-danger-500 text-danger-500'
              }`}
            >
              {value}
            </p>
          );
        },
      },
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
    <div className="p-5">
      {isLoading && <Loader />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
        <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-6 text-text-hint">
        <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
              <label htmlFor="firstName" className="text-text-hint mb-1">First Name</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                type="text"
                placeholder="First Name"
                id="firstName"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
                {errors.firstName && <span className="text-danger-500">{errors.firstName.message}</span>}
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="middleName" className="text-text-hint mb-1">Middle Name</label>
              <input
                {...register("middleName")}
                type="text"
                placeholder="Middle Name"
                id="middleName"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="lastName" className="text-text-hint mb-1">Last Name</label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="Last Name"
                id="lastName"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
                 {errors.lastName && <span className="text-danger-500">{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="preferredName" className="text-text-hint mb-1">
                Preferred Name<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("preferredName", { required: "Preferred name is required" })}
                type="text"
                placeholder="Preferred Name"
                id="preferredName"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
                {errors.preferredName && <span className="text-danger-500">{errors.preferredName.message}</span>}
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="jobTitle" className="text-text-hint mb-1">
                Job Title<span className="text-danger-500">*</span>
              </label>
              <select
                {...register('jobTitle', { required: "Job title is required" })}
                id="jobTitle"
                className="outline-none border-2 border-secondary-500 rounded-lg"
              >
                <option value="">Select a job</option>
                {jobs.map((job) => (
                  <option key={job.job_id} value={job.job_title}>{job.job_title}</option>
                ))}
              </select>
             
              {errors.jobTitle && <span className="text-danger-500">{errors.jobTitle.message}</span>}

              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="job_title" className="text-text-hint mb-1">
                  Reporting Manager <span className="text-danger-500">*</span>
                </label>
                <select
                   {...register('reportingManager')}
                  name="reportingManager"
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full"
                >
                  <option value={0}>
                    0
                  </option>
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
                {/* {errors.reportingManager && <span className="text-danger-500">{errors.reportingManager.message}</span>} */}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
              <label htmlFor="mobileNum" className="text-text-hint mb-1">
                Mobile Number<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("mobileNum", { required: "Mobile number is required" })}
                type="text"
                placeholder="Mobile Number"
                id="mobileNum"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              {errors.mobileNum && <span className="text-danger-500">{errors.mobileNum.message}</span>}

              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="email" className="text-text-hint mb-1">
                Email<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("email", { required: "Email  is required" })}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              {errors.email && <span className="text-danger-500">{errors.email.message}</span>}

              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
                <label htmlFor="address_line_1" className="text-text-hint mb-1">
                  Contact's Name<span className="text-danger-500">*</span>
                </label>
                <input
                {...register("contactName", { required: "contact name  is required" })}
                  type="text"
                  placeholder="Contact Name"
                  id="address_line_1"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              {errors.contactName && <span className="text-danger-500">{errors.contactName.message}</span>}

              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="address_line_2" className="text-text-hint mb-1">
                  Contact's Phone Number
                  <span className="text-danger-500">*</span>
                </label>
                <input
                {...register("contactPhoneNum", { required: "contact Phone Number  is required" })}
                  type="text"
                  placeholder="+91 99999999999"
                  id="address_line_2"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.contactPhoneNum && <span className="text-danger-500">{errors.contactPhoneNum.message}</span>}
              </div>
            </div>
      
            <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col w-72">
            <label className="">
                  Contact's Email ID<span className="text-danger-500">*</span>
                </label>
                 <input
                {...register("contactEmail", { required: "contact Email  is required" })}
                   type="email"
                     className="outline-none w-full"
                  />
                  {errors.contactEmail && <span className="text-danger-500">{errors.contactEmail.message}</span>}
                  {/* <img src={Pencil} alt="pencil" /> */}
               </div>
              <div className="flex flex-col w-72">
                <label htmlFor="relation" className="text-text-hint mb-1">
                  Contacts Relation<span className="text-danger-500">*</span>
                </label>
                <select
                   {...register("contactRelation", { required: "Contact Relation  is required" })}
                  name="contactRelation"
                  className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(relations?.relation || [], 'type').map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.contactRelation && <span className="text-danger-500">{errors.contactRelation.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Created - Date
                </label>
                <input
                  
                  type="date"
                  id="date"
                  value={salesTeam.createdDate || ""}
                  className="outline-none border-2 border-text-hint disabled:border-gray-300 text-gray-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Created - Time
                </label>
                <input
                  
                  type="time"
                  id="date"
                  value={salesTeam.createdTime || ""}
                  className="outline-none border-2 border-text-hint disabled:border-gray-300 text-gray-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="created_by" className="text-text-hint mb-1">
                  Created By
                </label>
                <input
                  
                  type="text"
                  id="created_by"
                  value={salesTeam.created_by || ""}
                  className="outline-none border-2 border-secondary-500 disabled:border-gray-300 text-gray-300 placeholder:text-gray-300 rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Updated - Date
                </label>
                <input
                  
                  type="date"
                  id="date"
                  value={salesTeam.updateDate || ""}
                  className="outline-none border-2 border-text-hint disabled:border-gray-300 text-gray-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Updated - Time
                </label>
                <input
                  
                  type="time"
                  id="date"
                  value={salesTeam.updateTime || ""}
                  className="outline-none border-2 border-text-hint disabled:border-gray-300 text-gray-300 rounded-lg "
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-3 ">
                <label htmlFor="document_type" className="text-text-hint mb-1">
                  Notes
                </label>
                <textarea
                  {...register("notes")}
                  name="notes"
                  type="text"
                  placeholder="Notes"
                  id="document_type"
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
                />
               </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
            <div className="">
          <label>
            Sales Status<span className="text-red-500">*</span>
          </label>
          <ul className="grid grid-cols-3 mt-1">
            <li className="relative">
              <input
                {...register("salesStatus", { required: "Sales status is required" })}
                type="radio"
                value="active"
                id="active"
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 ${salesStatus === "active" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="active"
              >
                Active
              </label>
            </li>
            <li className="relative">
              <input
                {...register("salesStatus", { required: "Sales status is required" })}
                type="radio"
                value="in active"
                id="in_active"
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 ${salesStatus === "in active" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="in_active"
              >
                In Active
              </label>
            </li>
            <li className="relative">
              <input
                {...register("salesStatus", { required: "Sales status is required" })}
                type="radio"
                value="fraud"
                id="fraud"
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white text-danger-500 border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 ${salesStatus === "fraud" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="fraud"
              >
                Fraud
              </label>
            </li>
          </ul>
          {errors.salesStatus && <span className="text-danger-500">{errors.salesStatus.message}</span>}
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
            <RxReload className="cursor-pointer" size={20} onClick={getData} />
           </div>

          <button
            onClick={openModal}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add Sales Person
          </button>
        </div>
        
        <div className="w-full overflow-x">
        <MyTable
          title={"Sales Team"}
          data={data}
          columns={columns}
          option={options}
          />
        </div>
      
      </div>
    </div>
  );
};

export default SalesTeams;
