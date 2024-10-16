import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: "#e5f7f8", 
            fontSize:"0.875rem",
            padding:"12px 10px",
            fontWeight:'bold',
            textTransform:'capitalize',
            color:'black'
          },
          body: {
            borderBottom: "1px solid #b4b9c3",
            fontSize:"0.875rem",
            padding:"22px 10px"
          },
          footer:{
            padding:"12px 10px",
          }
        },
      },
 
    MuiTableFooter: {
        styleOverrides: {
          root: {
            backgroundColor: "#e5f7f8", 
            padding:"12px"
          },
        },
      },
 
  },
});

const MyTable = ({ data, columns, title,option }) => {

  return (
    <ThemeProvider theme={customTheme}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={option}
      />
    </ThemeProvider>
  );
};

export default MyTable;