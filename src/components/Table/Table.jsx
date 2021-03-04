import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: fade("#006600", 0.3), //#558000
          fontWeight: "900",
          textTransform: "uppercase",
        },
      },
    },
  });

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export const Table = ({ data, columns }) => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
};
