import React from "react";
import Pencil from "../../../../images/pencil.png";
import { RxReload } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createContact } from "../../../../api/sales";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Contacts = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await createContact(formData);
      console.log(response);
      toast.success('Contact created successfully');
      reset();
    } catch (error) {
      console.error('Error creating contact:', error);
      toast.error('Failed to create contact. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-3">
          <div className="">
            <label className="">Primary Contact</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg h-11">
              <input
                {...register("primaryContact", { required: "Primary contact is required" })}
                placeholder="Primary Contact"
                className="outline-none w-full text-black"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.primaryContact && <span className="text-danger-500">{errors.primaryContact.message}</span>}
          </div>
          <div className="">
            <label className="">Email ID</label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg h-11">
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email ID"
                className="outline-none border-none w-full text-black focus:ring-0"
              />
              <img src={Pencil} alt="pencil" />
            </div>
            {errors.email && <span className="text-danger-500">{errors.email.message}</span>}
          </div>
          <div className="col-span-2 flex justify-end items-center">
            <button
              type="submit"
              className="bg-secondary-700 text-white py-3 px-5 text-base rounded-full"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <div className="border border-gray-300 rounded-lg mt-5">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>

          <Link
            to={``}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            New Contact
          </Link>
        </div>
        <div className="w-full overflow-x">
          <table className="table-auto overflow-scroll w-full">
            <thead className="w-full">
              <tr className="grid grid-cols-6  text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th>Contact Name</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody
              className="flex flex-col items-center  overflow-y-scroll w-full h-screen"
            >
              {[1, 2, 3].map((_, index) => (
                <tr key={index} className="grid grid-cols-6 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm">
                  <td className="">
                    <h3 className="text-base text-auxiliary-800">
                      Michael Mitch
                    </h3>
                    <p className="text-text-hint">salesforce</p>
                  </td>
                  <td className="">+91 9999999999</td>
                  <td className="">
                    <p className="">bessiecooper@gmail.com</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full h-14 py-2 bg-secondary-50 justify-end items-center gap-4 inline-flex">
          <div className="w-24 bg-white flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-10 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch h-10 px-4 py-2 rounded-lg border border-neutral-500 justify-between items-center inline-flex">
                <div className="grow shrink basis-0 text-zinc-800 text-sm font-normal font-['Poppins'] leading-tight">
                  15
                </div>
                <div className="w-6 h-6 relative" />
              </div>
            </div>
          </div>
          <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-normal">
            1-15{" "}
          </div>
          <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-normal">
            of
          </div>
          <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-normal">
            126
          </div>
          <div className="w-6 h-6 relative" />
          <div className="w-6 h-6 relative" />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
