import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";

import { Link } from "react-router-dom";
import { getAllSalesVendors } from "../../../api/sales";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyTable from "../../../components/MyTable";

const Vendors = () => {
  const [data, setData] = useState([])
  const [pageSize, setpageSize] = useState()

   const getData = async () => {
    const response = await getAllSalesVendors()
    setData(response.data?.response?.data)
  }

  useEffect(() => {
    getData()
  }, [])
  console.log(data);
  const columns = [
 
 
    {
      name: "name",
      label: "Vendor Name",
      options: {
        customBodyRender: (value) => {
          return(
            <h3 className="text-base font-bold text-auxiliary-800 cursor-pointer">{value}</h3>
          )
        }
      }
    },
    {
      name: "type",
      label: "Vendor Type",
    },
    {
      name: "phone",
      label: "Phone Number",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "contacts",
      label: "Contact Name",
      options: {
        customBodyRender: (value) => {
          if (value && value.length > 0) {
            const contact = value[0]; // Assuming you want the first contact in the array
            return `${contact.first_name} ${contact.last_name}`;
          }
          return "No Contact";
        },
      },
    },
    {
      name: "status",
      label: "Status",
    },
     
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: pageSize,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 200],
    onChangeRowsPerPage: (numberOfRows) => setpageSize(numberOfRows),
    selectableRows: false,
    elevation: 0,
    
  };
  return (
    <div className="p-5 ">
      <div className="border border-gray-300 rounded-lg ">
        <div className="flex justify-between items-center gap-2 p-3">
        <RxReload className="cursor-pointer" size={20} onClick={getData} />

          <Link
            to={`new-vendor/summary/account-info`}
            className="py-3 px-6 bg-secondary-700 text-white rounded-full"
          >
            <span className="mr-3">+</span>
            New Vendor
          </Link>
        </div>
        
        <div className="w-full overflow-x">
         <MyTable
         title={"Vendors List"}
         data={data}
         columns={columns}
         option={options}
         />

        </div>
      </div>
    </div>
  );
};

export default Vendors;
