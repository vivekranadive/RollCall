import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import { Link } from "react-router-dom";
import Pencil from "../../../images/pencil.png";
import Modal from "../../../components/ModalComponents/Modal";
import { createTechnology, getAllTechnologies, updateTechnology } from "../../../api/sales";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { formatDate } from "../../../utlis";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MyTable from "../../../components/MyTable";
const Technologies = () => {
  const initialTechnology = {
    technologyName: "",
    terminology: "",
    description: "",
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technology, setTechnology] = useState(initialTechnology);
  const [technologyId, setTechnologyId] = useState(null);
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10);
  const getData = async () => {
    setLoading(true)
    try {
      const res = await getAllTechnologies();
      setData(res.data.data.records)
      console.log(res.data.data.records)
    } catch (err) {
      toast.error('Something Went Wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
   
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    reset(initialTechnology);
    setTechnology(initialTechnology);
    setTechnologyId(null);
  };


  const onSubmit = async (formData) => {
    console.log(technologyId)
    setLoading(true);
    try {
      if (technologyId) {
        await updateTechnology({ ...formData, technologyId });
        toast.success("Technology Updated Successfully")
        
      } else {
        await createTechnology(formData);
        toast.success("Technology Created Successfully")
      }
      getData();
      closeModal();
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const prepareUpdate = (technology_id) => {
    const TechnologyData = data.find(d => d.technology_id === technology_id);
    if (!TechnologyData) {
      toast.error("Technology not found");
      return;
    }
    // const createdDate = new Date(data.created);
    // const updatedDate = new Date(data.updated);
    reset({
      technologyName: TechnologyData.technology_name,
      terminology: TechnologyData.terminology?.test,
      description: TechnologyData.description,
      // createdDate: createdDate.toISOString().split("T")[0],
      // createdTime: createdDate.toISOString().split("T")[1].slice(0, 5),
      // updateDate: updatedDate.toISOString().split("T")[0],
      // updateTime: updatedDate.toISOString().split("T")[1].slice(0, 5),
    });
    setTechnology({
      // createdDate: createdDate.toISOString().split("T")[0],
      // createdTime: createdDate.toISOString().split("T")[1].slice(0, 5),
      // updateDate: updatedDate.toISOString().split("T")[0],
      // updateTime: updatedDate.toISOString().split("T")[1].slice(0, 5),
    });
    setTechnologyId(TechnologyData.technology_id);
    openModal();
  };
  const columns = [
 
    
    {
      name: "technology_id", // Hidden column
      label: "Technology ID",
      options: {
        display: 'false',
      }
    },
 
  
    {
      name: "technology_name", // Displayed column
      label: "Technology Name",
      
      options: {
        customBodyRender: (value,tableMeta) => {
  
          return (
            <h3
              className="text-base font-bold text-auxiliary-800 cursor-pointer"
              onClick={()=>prepareUpdate(tableMeta.rowData[0])}
            >
              {`${value}`}
            </h3>
          );
        },
      },
    },
    {
      name: "description", // Displayed column
      label: "Description",
    },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: pageSize,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 200],
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
                <label
                  htmlFor="technology_name"
                  className="text-text-hint mb-1"
                >
                  Technology Name
                </label>
                <input
                  {...register("technologyName", { required: "Technology Name is required" })}
                  name="technologyName"
                  type="text"
                  placeholder="Technology Name"
                  id="technology_name"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.technologyName && (
                  <p className="text-red-500 text-sm">{errors.technologyName.message}</p>
                )}
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="terminology" className="text-text-hint mb-1">
                  Terminology
                </label>
                <input
                  {...register("terminology",{required:"Terminology is required"})}
                  name="terminology"
                  type="text"
                  placeholder="Terminology"
                  id="terminology"
                  className="outline-none border-2 border-secondary-500 rounded-lg "
                />
                {errors.terminology && (
                  <p className="text-red-500 text-sm">{errors.terminology.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col col-span-3 ">
                <label htmlFor="document_type" className="text-text-hint mb-1">
                  Description
                </label>
                <textarea
                   {...register("description", { required: "Description is required" })}
                  name="description"
                  type="text"
                  placeholder="Description"
                  id="document_type"
                  className="focus:outline-none border  rounded-lg "
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-gray-300 mb-1">
                  Created - Date
                </label>
                <input
                  disabled
                  type="date"
                  id="date"
                  value={technology.createdDate || ""}
                  className="outline-none border-2 border-text-hint rounded-lg  disabled:border-gray-300   text-gray-300"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-gray-300 mb-1">
                  Created - Time
                </label>
                <input
                  disabled
                  type="time"
                  id="date"
                  value={technology.createdTime || ""}
                  className="outline-none border-2 border-text-hint rounded-lg  disabled:border-gray-300   text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-gray-300 mb-1">
                  Updated - Date
                </label>
                <input
                  disabled
                  type="date"
                  id="date"
                  value={technology.updateDate || ""}
                  className="outline-none border-2 border-text-hint rounded-lg   disabled:border-gray-300 text-gray-300"
                />
              </div>
              <div className="flex flex-col w-72">
                <label htmlFor="date" className="text-gray-300 mb-1">
                  Updated - Time
                </label>
                <input
                  disabled
                  type="time"
                  id="date"
                  value={technology.updateTime || ""}
                  className="outline-none border-2 border-text-hint rounded-lg disabled:border-gray-300  text-gray-300"
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
            <button onClick={handleSubmit(onSubmit)} className="bg-secondary-700 text-text-light py-2 px-5 rounded-full">
              Save
            </button>
            
          </div>
        </div>
      </Modal>
      <div className="border border-gray-300 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
          <div className="flex">
            <RxReload size={20} onClick={getData} className="cursor-pointer" />
            <BsThreeDotsVertical size={20} />
          </div>

          <button
            onClick={openModal}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            Add Technologies
          </button>
        </div>
        <div className="w-full overflow-x">
          <MyTable
          title={"Technology List"}
          data={data}
          columns={columns}
          option={options}
          />
        </div>
       
      </div>
    </div>
  );
};

export default Technologies;
