import React, { useState } from "react";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/ModalComponents/Modal";
import { createDocment } from "../../api/candidiate";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

const Documents = () => {
  const initialDocument = {
    documentName: "",
    link: "",
    description: "",
    createdDate: "",
    updatedDate: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentData, setDocument] = useState(initialDocument);
  const [isLoading, setLoading] = useState(false);
  const candidateId = useSelector(state => state.personal.candidateId);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocument((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createDocment(documentData, candidateId);
      toast.success('Document Added Succesfully');
      closeModal();
      setDocument(initialDocument);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  console.log(documentData);

  return (
    <div>
      {" "}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading && <Loader />}
        <div className="">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-2">
              <div className="flex flex-col w-72">
                <label htmlFor="document_type" className="text-text-hint mb-1">
                  Document Name
                </label>
                <input
                  onChange={handleChange}
                  value={documentData.documentName}
                  name="documentName"
                  type="text"
                  placeholder="Document Name"
                  id="document_type"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex col-span-2 items-end gap-5">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="document_link"
                    className="text-text-hint mb-1"
                  >
                    Link
                  </label>
                  <input
                    onChange={handleChange}
                    value={documentData.link}
                    name="link"
                    type="text"
                    placeholder="Link"
                    id="document_link"
                    className="outline-none  border-2 border-secondary-500 rounded-lg flex-grow"
                  />
                </div>
                <button
                  disabled
                  className="py-2 px-6 bg-secondary-700 text-text-light rounded-full"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="document_type" className="text-text-hint mb-1">
                Description
              </label>
              <textarea
                onChange={handleChange}
                value={documentData.description}
                name="description"
                type="text"
                placeholder="Description"
                id="document_type"
                className="focus:outline-none border  rounded-lg "
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="created_date" className="text-text-hint mb-1">
                  Created Date
                </label>
                <input
                  onChange={handleChange}
                  value={documentData.createdDate}
                  name="createdDate"
                  type="date"
                  placeholder="Document Name"
                  id="created_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
              </div>

              <div className="flex flex-col w-72">
                <label htmlFor="updated_date" className="text-text-hint mb-1">
                  Updated Date
                </label>
                <input
                  onChange={handleChange}
                  value={documentData.updatedDate}
                  name="updatedDate"
                  type="date"
                  id="updated_date"
                  className="outline-none border-2 border-text-hint rounded-lg "
                />
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
              onClick={handleSubmit}
              className="bg-secondary-700 text-text-light py-2 px-5 rounded-full"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <div className="border  border-gray-300 mt-5 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex items-center gap-3">
            <RxReload size={20} />
            <BsThreeDotsVertical size={20} />
          </div>

          <div className="flex items-center ">
            <button
              onClick={openModal}
              className=" bg-secondary-700 text-white py-2 px-5 rounded-full font-normal"
            >
              <span className="text-lg mr-3">+</span>
              New Document
            </button>
          </div>
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-12 text-left py-3 pl-3 pr-6 bg-secondary-50 text-sm">
                <th className="col-span-2">Document Name</th>
                <th className="col-span-3">Document Link</th>
                <th className="col-span-3">Description</th>
                <th className="col-span-2">Created Date</th>
                <th className="col-span-2">Update Date</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col  overflow-y-scroll w-full h-screen"
            // style={{ height: "90vh" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => (
                <tr
                  className={`grid grid-cols-12 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm`}
                >
                  <td className="col-span-2 ">
                    <h3 className="text-auxiliary-800 text-base">Sales Tech</h3>
                  </td>
                  <td className="col-span-3">Link</td>
                  <td className="col-span-3">Technology</td>
                  <td className="col-span-2">10/10/10</td>
                  <td className="col-span-2">10/10/10</td>
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

export default Documents;
