import React from "react";
import Pencil from "../../../../images/pencil.png";
import { createCompanyProfile } from "../../../../api/sales";
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

const CompanyProfile = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await createCompanyProfile(formData);
      console.log(response);
      toast.success('Company profile created successfully');
      reset();
    } catch (error) {
      console.error('Error creating company profile:', error);
      toast.error('Failed to create company profile. Please try again.');
    }
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Industry</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("industry", { required: "Industry is required" })}
                placeholder="Industry"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.industry && <span className="text-danger-500">{errors.industry.message}</span>}
          </div>
          <div className="">
            <label className="">Year Started</label>
            <input
              {...register("yearStarted", { required: "Year started is required" })}
              type="date"
              className="outline-none w-full text-black appearance-none flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg"
            />
            {errors.yearStarted && <span className="text-danger-500">{errors.yearStarted.message}</span>}
          </div>
          <div className="">
            <label className="">Number Of Employees</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("employees", { required: "Number of employees is required" })}
                placeholder="Number of Employees"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.employees && <span className="text-danger-500">{errors.employees.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">DUNS Number</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("DUNS_num", { required: "DUNS number is required" })}
                placeholder="DUNS Number"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.DUNS_num && <span className="text-danger-500">{errors.DUNS_num.message}</span>}
          </div>
          <div className="">
            <label className="">NACS Code</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("NACS_code", { required: "NACS code is required" })}
                placeholder="NACS Code"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.NACS_code && <span className="text-danger-500">{errors.NACS_code.message}</span>}
          </div>
          <div className="">
            <label className="">Ownership</label>
            <select
              {...register("ownership", { required: "Ownership is required" })}
              className="flex justify-center items-center focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full text-black"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.ownership && <span className="text-danger-500">{errors.ownership.message}</span>}
          </div>
        </div>
      </form>
      <div className="w-full h-72 py-10 px-8 flex justify-end items-end">
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

export default CompanyProfile;
