import { React, useState, useEffect } from "react";
import {
  Grid,
  Button,
  IconButton,
  ButtonGroup,
  CircularProgress,
} from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getJenisPartner,
  deleteJenisPartner,
} from "../../functions/JenisPartner";

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
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() =>
                  (window.location =
                    "#/app/editJenisPartner/" + tableMeta.rowData[0])
                }
                component="span"
                size="small"
              >
                <Create />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                onClick={() => deleteJenisPartner(tableMeta.rowData[0])}
                component="span"
                size="small"
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
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

export default function JenisPartner() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getJenisPartner();
      setState(data.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Jenis Partner"
        button={
          <Button
            variant="contained"
            size="medium"
            color="primary"
            href="#/app/TambahJenisPartner"
          >
            Tambah
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={50} style={{ marginTop: 50 }} />
            </div>
          ) : (
            <MUIDataTable
              title=""
              data={state}
              columns={columns}
              options={options}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
