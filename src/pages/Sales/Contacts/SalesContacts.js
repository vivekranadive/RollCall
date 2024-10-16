import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import Modal from "../../../components/ModalComponents/Modal";
import { createSalesContact, getAllSalesContacts, updateSalesContact } from "../../../api/sales";
import { getUserInfoDetails, mapToOption } from "../../../utlis";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../api/axiosInstance";
import useFetch from "../../../hooks/useFetch";
import MyTable from "../../../components/MyTable";

const { companyId, clientId } = getUserInfoDetails();

const SalesContacts = () => {
  
  const initialSalesContact = {
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    email: "",
    jobTitle: "",
    mobileNum1: "",
    mobileNum2: "",
    fax: "",
    contactType: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    notes: "",
    vendorStatus: "",
  };
  const [selectedContact, setSelectedContact] = useState(null);

  const { register, handleSubmit, reset,watch,setValue, formState: { errors } } = useForm({
    defaultValues: {
      vendorStatus: "active",
    },
  });
  const [jobs, setJobs] = useState([]);
  const vendorStatus = watch("vendorStatus");
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesContact, setSalesContact] = useState(initialSalesContact);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const referenceData = useSelector((state) => state.reference)
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
    setSalesContact(initialSalesContact);
    reset(initialSalesContact);
  };
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/contacts', {
        params: { company: companyId, client: clientId }
      });
      setData(res.data.data.records);
      console.log(res.data.data.records);
      
    } catch (err) {
      console.log(err);
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };
  

  const onSubmit = async (formData) => {
    console.log(formData.vendorStatus)
    const payload = {
      divison: 'div',
      type: formData.contactType,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email:formData.email,
      preferredName: formData.preferredName,
      jobTitle: formData.jobTitle,
      phone: {
        phone: formData.mobileNum1,
        Fax: formData.fax
      },
      address: {
        address_line2: formData.address1,
        address_line1: formData.address2,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country
      },
      status: formData.vendorStatus || "ACTIVE",
      contact_id: formData.contact_id
    };

    try {
      await (!formData.contact_id ? createSalesContact(payload) : updateSalesContact(payload));
      closeModal();
      getData();
      toast.success('Contact Created Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };


  const prepareUpdate = (contact_id) => {
    const d = data.find(d => d.contact_id === contact_id);
    if (!d) {
      toast.error("Contact not found");
      return;
    }
    const createdDate = new Date(d.created);
    const updatedDate = new Date(d.updated);
    const currentSalesContact = {
      firstName: d.first_name,
      middleName: d.middle_name,
      lastName: d.last_name,
      preferredName: d.preferred_name,
      email: d.email,
      jobTitle: d.job_title,
      mobileNum1: d?.phone?.mobile,
      mobileNum2: d?.phone?.phone,
      fax: '',
      contactType: d.contact_type,
      address1: d.address?.address1,
      address2: d.address?.address2,
      city: d.address?.city,
      state: d.address?.state,
      country: d.address?.country,
      zipCode: d.address?.zip,
      notes: d.note || '',
      vendorStatus: d.vendorStatus || "ACTIVE",
      contact_id: d.contact_id,
      createdDate: createdDate.toISOString().split("T")[0] || "", 
      createdTime: createdDate.toISOString().split("T")[1].slice(0, 5) || "",
      updateDate: updatedDate.toISOString().split("T")[0] || "",
      updateTime: updatedDate.toISOString().split("T")[1].slice(0, 5) || "",
    };

    setSalesContact(currentSalesContact);
    reset(currentSalesContact);
    openModal()
  }
  useEffect(() => {
    if (selectedContact && isModalOpen) {
      Object.entries(selectedContact).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [selectedContact, isModalOpen, setValue]);

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      name: "contact_id",
      label: "ID",
      options: {
        display:[false]
      },
    },
    {
      name: "first_name", 
      label: "Contact Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const firstName = tableMeta.rowData[tableMeta.columnIndex];
          const lastName = tableMeta.rowData[tableMeta.columnIndex + 1]; // Adjust index if necessary
          const fullName = lastName ? `${firstName} ${lastName}` : firstName;
          return (
            
            <h3 onClick={()=>prepareUpdate(tableMeta.rowData[0])} className="text-base font-bold text-auxiliary-800 cursor-pointer">
              {`${fullName}`}
            </h3>
          );
        }
      }
    },
    {
      name: "contact_type",
      label: "Contact Type",
    },
    {
      name: "phone",
      label: "Phone Number",
      options: {
        customBodyRender: (value) => {
          if (value) {
            const phone = value.phone; // Access phone number
            const mobile = value.mobile; // Access mobile number if needed
            return `${phone} ${mobile ? `, ${mobile}` : ''}`;
          }
          return "";
        },
      },
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "address",
      label: "Address",
      options: {
        customBodyRender: (value) => {
          if (value) {
            const { address1, address2, city, state, zip } = value;
            return `${address1}, ${address2 ? `${address2}, ` : ''}${city}, ${state} ${zip}`;
          }
          return "";
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <p 
              className={`border py-2 px-6 rounded-full w-32 text-center ${
                value === 'ACTIVE' 
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-text-hint">
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
              <label htmlFor="email" className="text-text-hint mb-1">
                Email<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("email", { required: "Email  is required" })}
                type="email"
                 id="email"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              {errors.email && <span className="text-danger-500">{errors.email.message}</span>}

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
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
              <label htmlFor="mobileNum1" className="text-text-hint mb-1">
                Mobile Number<span className="text-danger-500">*</span>
              </label>
              <input
                {...register("mobileNum1", { required: "Mobile number is required" })}
                type="text"
                placeholder="Mobile Number"
                id="mobileNum1"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              {errors.mobileNum1 && <span className="text-danger-500">{errors.mobileNum1.message}</span>}

              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="mobileNum2" className="text-text-hint mb-1">
                Alt Phone Number
              </label>
              <input
                {...register("mobileNum2")}
                type="text"
                placeholder="Alt Phone Number"
                id="mobileNum2"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="fax" className="text-text-hint mb-1">
                Fax
              </label>
              <input
                {...register("fax")}
                type="text"
                placeholder="Fax"
                id="fax"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
              <label htmlFor="contactType" className="text-text-hint mb-1">
                Contact Type<span className="text-danger-500">*</span>
              </label>
              <select
                {...register("contactType", { required: "Contact type is required" })}
          
                id="contactType"
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.contacttypes?.contact, 'type').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.contactType && <span className="text-danger-500">{errors.contactType.message}</span>}

              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
              <label htmlFor="address1" className="text-text-hint mb-1">
                Address Line 1
              </label>
              <input
                {...register("address1", { required: "Address  is required" })}
                type="text"
                placeholder="Address Line 1"
                id="address1"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
                {errors.address1 && <span className="text-danger-500">{errors.address1.message}</span>}
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="address2" className="text-text-hint mb-1">
                Address Line 2
              </label>
              <input
                {...register("address2")}
                type="text"
                placeholder="Address Line 2"
                id="address2"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
              <label htmlFor="state" className="text-text-hint mb-1">
                State
              </label>
              <select
                {...register("state", { required: "State is required" })}
                  id="state"
                  name="state"
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.states?.state, 'name').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="text-danger-500">{errors.state.message}</span>}
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="city" className="text-text-hint mb-1">
                City
              </label>
              <input
                {...register("city", { required: "City is required" })}
                type="text"
                placeholder="city"
                id="city"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
              {/* <select
                {...register("city", { required: "City is required" })}
                  id="city"
                  name="city"
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.cities?.city, 'name').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select> */}
                {errors.city && <span className="text-danger-500">{errors.city.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col w-72">
              <label htmlFor="zipCode" className="text-text-hint mb-1">
                Zip Code
              </label>
              <input
                {...register("zipCode", { required: "Zip Code is required" })}
                type="text"
                placeholder="Zip Code"
                id="zipCode"
                  className="outline-none border-2 border-secondary-500 rounded-lg text-black"
                />
                {errors.zipCode && <span className="text-danger-500">{errors.zipCode.message}</span>}
              </div>
              <div className="flex flex-col w-72">
              <label htmlFor="country" className="text-text-hint mb-1">
                Country
              </label>
              <select
                {...register("country", { required: "Country  is required" })}
                  id="country"
                  name="country"
                  className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full"
                >
                  {mapToOption(referenceData.countries?.country, 'name').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.country && <span className="text-danger-500">{errors.country.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72 ">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Created - Date
                </label>
                <input
                   
                  type="date"
                  id="date"
                  className="outline-none border-2 disabled:border-gray-300 text-gray-300 border-text-hint rounded-lg "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Created - Time
                </label>
                <input
                   
                  type="time"
                  id="date"
                  className="outline-none border-2 border-text-hint rounded-lg   disabled:border-gray-300 text-gray-300"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="created_by" className="text-text-hint mb-1">
                  Created By
                </label>
                <input
                   
                  type="text"
                  placeholder="Created By"
                  id="created_by"
                  className="outline-none placeholder:text-gray-300 border-2 border-secondary-500 rounded-lg  disabled:border-gray-300 text-gray-300"
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
                  className="outline-none border-2 border-text-hint rounded-lg  disabled:border-gray-300 text-gray-300 "
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-text-hint mb-1">
                  Updated - Time
                </label>
                <input
                   
                  type="time"
                  id="date"
                  className="outline-none border-2 border-text-hint rounded-lg   disabled:border-gray-300 text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-3 ">
              <label htmlFor="notes" className="text-text-hint mb-1">
                Notes
              </label>
              <textarea
                  {...register("notes")}
                  placeholder="Notes"
                  id="notes"
                  className="focus:outline-none border  rounded-lg text-black"
                  rows={4}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
            <div className="">
          <label>
            Vendor Status<span className="text-red-500">*</span>
          </label>
          <ul className="grid grid-cols-3 mt-1">
            <li className="relative">
              <input
                {...register("vendorStatus", { required: "Vendor status is required" })}
                type="radio"
                value="ACTIVE"
                id="active"
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white border border-secondary-800 rounded-tl-full rounded-bl-full cursor-pointer focus:outline-none hover:bg-gray-50 ${vendorStatus === "ACTIVE" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="active"
              >
                Active
              </label>
            </li>
            <li className="relative">
              <input
                {...register("vendorStatus", { required: "Vendor status is required" })}
                type="radio"
                value="IN ACTIVE"
                id="in_active"
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white border border-t-secondary-800 border-b-secondary-800 cursor-pointer focus:outline-none hover:bg-gray-50 ${vendorStatus === "IN ACTIVE" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="in_active"
              >
                In Active
              </label>
            </li>
            <li className="relative">
              <input
                {...register("vendorStatus", { required: "Vendor status is required" })}
                type="radio"
                value="FRAUD"
                id="fraud"
                className="sr-only peer"
              />
              <label
                className={`flex justify-center items-center py-2 px-3 bg-white text-danger-500 border border-secondary-800 rounded-tr-full rounded-br-full cursor-pointer focus:outline-none hover:bg-gray-50 ${vendorStatus === "FRAUD" ? '!bg-secondary-500 text-white border-secondary-800' : ''}`}
                htmlFor="fraud"
              >
                Fraud
              </label>
            </li>
          </ul>
          {errors.vendorStatus && <span className="text-danger-500">{errors.vendorStatus.message}</span>}
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
            <button onClick={handleSubmit(onSubmit)} className="bg-secondary-700 text-text-light py-2 px-5 rounded-full">
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
            Add Contacts
          </button>
        </div>
        <div className="w-full overflow-x">
        <MyTable
         title={"Contact List"}
         data={data}
         columns={columns}
         option={options}
         />
        
        </div>

      </div>
    </div>
  );
};

export default SalesContacts;
