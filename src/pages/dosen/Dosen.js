import { React, useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

import { getDosen } from "../../functions/Dosen";

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
];

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function Tables() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getDosen();
      setState(data.data);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Dosen"
        button={
          <Button variant="contained" size="medium" color="primary">
            Tambah
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Dosen"
            data={state}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
