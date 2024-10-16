import React from "react";
import Pencil from "../../../../images/pencil.png";
import { createCompanyPreference } from "../../../../api/sales";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const options = [
  { value: "", text: "--Choose an option--" },
  { value: "option1", text: "option1" },
  { value: "option2", text: "option2" },
  { value: "option3", text: "option3" },
  { value: "option4", text: "option4" },
  { value: "option5", text: "option5" },
];

const CompanyPreference = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await createCompanyPreference(formData);
      console.log(response);
      toast.success('Company preference created successfully');
      reset();
    } catch (error) {
      console.error('Error creating company preference:', error);
      toast.error('Failed to create company preference. Please try again.');
    }
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Contact Method</label>
            <select
              {...register("contactMethod", { required: "Contact method is required" })}
              className="flex justify-center items-center focus:ring-0 px-3 py-2 border border-neutral-500 rounded-lg outline-none w-full"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.contactMethod && <span className="text-danger-500">{errors.contactMethod.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Email</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="youremail@gmail.com"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.email && <span className="text-danger-500">{errors.email.message}</span>}
          </div>
          <div className="">
            <label className="">Follow Email</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("followEmail", { 
                  required: "Follow email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="youremail@gmail.com"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.followEmail && <span className="text-danger-500">{errors.followEmail.message}</span>}
          </div>
          <div className="">
            <label className="">Bulk Email</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("bulkEmail", { 
                  required: "Bulk email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="youremail@gmail.com"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.bulkEmail && <span className="text-danger-500">{errors.bulkEmail.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Phone</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="Phone"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.phone && <span className="text-danger-500">{errors.phone.message}</span>}
          </div>
          <div className="">
            <label className="">Fax</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("fax", { required: "Fax is required" })}
                placeholder="Fax"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.fax && <span className="text-danger-500">{errors.fax.message}</span>}
          </div>
        </div>
      </form>
      <div className="w-full h-52 py-10 px-8 flex justify-end items-end">
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

export default CompanyPreference;
