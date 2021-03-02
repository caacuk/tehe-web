import { React, useState, useEffect } from "react";
import { Grid, Button, IconButton } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";


// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getProgramStudi } from "../../functions/ProgramStudi";

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama",
    label: "Nama",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <IconButton
              color="primary"
              aria-label="upload picture"
              onClick={() => console.log(tableMeta.rowData[0])}
              component="span"
              size="small"
            >
              <Create />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="upload picture"
              onClick={() => console.log(tableMeta.rowData[0])}
              component="span"
              size="small"
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  },
];

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function ProgramStudi() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getProgramStudi();
      setState(data.data);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Program Studi"
        button={
          <Button 
            variant="contained"
            size="medium"
            color="primary"
            href="#/app/TambahProgramStudi"
          >
            Tambah
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Program Studi"
            data={state}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
