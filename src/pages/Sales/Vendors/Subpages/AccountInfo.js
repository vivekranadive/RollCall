import React, { useState } from "react";
import Pencil from "../../../../images/pencil.png";
import { createVendor } from "../../../../api/sales";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'; // Add this import at the top of the file

const options = [
  { value: "", text: "--Choose an option--" },
  { value: "option1", text: "option1" },
  { value: "option2", text: "option2" },
  { value: "option3", text: "option3" },
  { value: "option4", text: "option4" },
  { value: "option5", text: "option5" },
];

const AccountInfo = () => {
  const { register, handleSubmit, setValue,reset, formState: { errors } } = useForm();
  const onSubmit = async (formData) => {
    try {
      const res = await createVendor(formData);
      reset();
      toast.success('Vendor created successfully');
    } catch (error) {
      console.error('Error creating vendor:', error);
      toast.error('Failed to create vendor. Please try again.');
    }
  };

  return (
    <div className="">
      <from onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Vendor Name</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
              {...register("name", { required: "name is required" })}
              
                name="name"
                placeholder="Name"
                 
                className="outline-none w-full text-black"
              />
            </div>
               {errors.name && <span className="text-danger-500">{errors.name.message}</span>}
          </div>
          <div className="">
            <label className="">Phone Number</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                {...register("phone", { required: "phone is required" })}
              
                name="phone"
                placeholder="Phone Number"
                 className="outline-none w-full text-black"
              />
            </div>
               {errors.phone && <span className="text-danger-500">{errors.phone.message}</span>}
          </div>
          <div className="">
            <label className="">Fax</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
               {...register("fax", { required: "fax is required" })}
               
                name="fax"
                placeholder="Fax"
                 
                className="outline-none w-full text-black"
              />
            </div>
               {errors.fax && <span className="text-danger-500">{errors.fax.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Type</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                 {...register("type", { required: "type is required" })}
                name="type"
                placeholder="Type"
                required
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
              {errors.type && <span className="text-danger-500">{errors.type.message}</span>}
          </div>
          <div className="">
            <label className="">Account Type</label>
            <select
               {...register("accountType", { required: "accountType is required" })} 
              
              name="accountType"
              className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full text-black"
            >
              {options.map((option) => (
                <option className="" key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.accountType && <span className="text-danger-500">{errors.accountType.message}</span>}
          </div>
          <div className="">
            <label className="">Annual Return</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                {...register("annualRevenue", { required: "annualRevenue is required" })} 
               
                name="annualRevenue"
                placeholder="Annual Return"
                required
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
              {errors.accountType && <span className="text-danger-500">{errors.accountType.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Website</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                {...register("website", { required: "website is required" })}
               
                name="website"
                placeholder="Website"
                required
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
              {errors.website && <span className="text-danger-500">{errors.website.message}</span>}
          </div>
          <div className="">
            <label className="">Payment Account</label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                 {...register("status", { required: "status is required" })}
               
                name="status"
                placeholder="Payment Account"
                required
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
              {errors.status && <span className="text-danger-500">{errors.status.message}</span>}
          </div>
        </div>
      </from>
      <div className="w-full py-10 px-8 flex justify-end items-baseline">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-secondary-700 py-2 px-5 rounded-full text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
