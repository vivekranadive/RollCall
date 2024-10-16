import React from "react";
import Pencil from "../../../../images/pencil.png";
import { createBillingTerm } from "../../../../api/sales";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const BillingTerms = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await createBillingTerm(formData);
      console.log(response);
      toast.success('Billing term created successfully');
      reset();
    } catch (error) {
      console.error('Error creating billing term:', error);
      toast.error('Failed to create billing term. Please try again.');
    }
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Currency</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("currency", { required: "Currency is required" })}
                placeholder="Currency"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.currency && <span className="text-danger-500">{errors.currency.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Credit Limit</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("creditLimit", { required: "Credit limit is required" })}
                placeholder="Credit Limit"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.creditLimit && <span className="text-danger-500">{errors.creditLimit.message}</span>}
          </div>
          <div className="">
            <label className="">Credit Hold</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                {...register("creditHold", { required: "Credit hold is required" })}
                placeholder="Credit Hold"
                className="outline-none w-full"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.creditHold && <span className="text-danger-500">{errors.creditHold.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col col-span-2 ">
            <label htmlFor="document_type" className="text-text-hint mb-1">
              Feedback
            </label>
            <textarea
              {...register("feedback", { required: "Feedback is required" })}
              placeholder="Feedback"
              id="document_type"
              className="focus:outline-none border rounded-lg p-2"
              rows={4}
            />
            {errors.feedback && <span className="text-danger-500">{errors.feedback.message}</span>}
          </div>
        </div>
      </form>
      <div className="w-full py-10 px-8 flex justify-end items-end">
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

export default BillingTerms;
