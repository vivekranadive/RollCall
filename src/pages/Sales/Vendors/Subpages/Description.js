import React from "react";
import { createDescription } from "../../../../api/sales";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Description = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      description: "",
    }
  });

  const onSubmit = async (formData) => {
    try {
      const response = await createDescription(formData);
      console.log(response);
      toast.success('Description created successfully');
      reset();
    } catch (error) {
      console.error('Error creating description:', error);
      toast.error('Failed to create description. Please try again.');
    }
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col col-span-3 ">
            <label htmlFor="description" className="text-text-hint mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
              id="description"
              className="focus:outline-none border rounded-lg p-2"
              rows={6}
            />
            {errors.description && <span className="text-danger-500">{errors.description.message}</span>}
          </div>
        </div>
      </form>
      <div className="w-full h-56 py-10 px-8 flex justify-end items-end">
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

export default Description;
