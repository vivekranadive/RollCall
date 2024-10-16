import React from "react";
import Pencil from "../../../../images/pencil.png";
import { createBillAddress } from "../../../../api/sales";
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

const BillingAddress = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await createBillAddress(formData);
      console.log(response);
      // toast.success('Billing address created successfully');
      reset();
    } catch (error) {
      console.error('Error creating billing address:', error);
      toast.error('Failed to create billing address. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">
              Billing Contact Name<span className="text-danger-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("contactName", { required: "Contact name is required" })}
                placeholder="Billing Contact Name"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.contactName && <span className="text-danger-500">{errors.contactName.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">
              Address line 1<span className="text-danger-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                {...register("address1", { required: "Address line 1 is required" })}
                placeholder="Address line 1"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.address1 && <span className="text-danger-500">{errors.address1.message}</span>}
          </div>
          <div className="">
            <label className="">
              Address line 2
            </label>
            <div className="flex justify-center items-center px-3 py-2   border border-neutral-500 rounded-lg">
              <input
                {...register("address2")}
                placeholder="Address line 2"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">
              City<span className="text-danger-500">*</span>
            </label>
            <select
              {...register("city", { required: "City is required" })}
              className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full text-black"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.city && <span className="text-danger-500">{errors.city.message}</span>}
          </div>
          <div className="">
            <label className="">
              State/Province<span className="text-danger-500">*</span>
            </label>
            <select
              {...register("state", { required: "State/Province is required" })}
              className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full text-black"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.state && <span className="text-danger-500">{errors.state.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">
              Postal Code<span className="text-danger-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2  border border-neutral-500 rounded-lg">
              <input
                {...register("postalCode", { required: "Postal code is required" })}
                placeholder="Postal Code"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.postalCode && <span className="text-danger-500">{errors.postalCode.message}</span>}
          </div>
          <div className="">
            <label className="">
              Country/Region<span className="text-danger-500">*</span>
            </label>
            <select
              {...register("country", { required: "Country/Region is required" })}
              className="flex justify-center items-center focus:ring-0 px-3 py-2  border border-neutral-500 rounded-lg outline-none w-full text-black"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.country && <span className="text-danger-500">{errors.country.message}</span>}
          </div>
        </div>
      </form>
      <div className="w-full  py-10 px-8 flex justify-end items-baseline">
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

export default BillingAddress;
