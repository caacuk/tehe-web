import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import { Table } from "../../components/Table/Table";
import { useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import {
  Grid,
  ButtonGroup,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getJenisDokumen,
  deleteJenisDokumen,
  putJenisDokumen,
  postJenisDokumen,
} from "../../functions/JenisDokumen";

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function JenisDokumen() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState({
    id: "",
    nama: "",
  });
  const [tambahState, setTambahState] = useState({
    nama: "",
  });

  useEffect(() => {
    async function getData() {
      const data = await getJenisDokumen();
      setState(data.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editJenisDokumen = async () => {
    setIsLoading(true);
    const response = await putJenisDokumen(editState);
    if (response.errorMessage === null) {
      history.push(`/app/jenisdokumen`);
    }
    const data = await getJenisDokumen();
    setState(data.data);
    setIsLoading(false);
    setEditState({ nama: "" });
  };

  const insertJenisDokumen = async () => {
    setIsLoading(true);
    const response = await postJenisDokumen(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/jenisdokumen`);
    }
    const data = await getJenisDokumen();
    setState(data.data);
    setIsLoading(false);
    setTambahState({ nama: "" });
  };

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
                {/* CUSTOM MODAL EDIT */}
                <CustomModalEdit
                  handleEdit={() => {
                    editJenisDokumen();
                  }}
                  handleInitialData={async () => {
                    const { rowData } = tableMeta;
                    setEditState({ nama: rowData[1], id: rowData[0] });
                  }}
                >
                  <TextField
                    fullWidth
                    value={editState.nama}
                    onChange={(e) => {
                      setEditState((c) => ({ ...c, nama: e.target.value }));
                    }}
                    label="Nama Jenis Dokumen"
                  />
                </CustomModalEdit>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteJenisDokumen(tableMeta.rowData[0]);
                    const data = await getJenisDokumen();
                    setState(data.data);
                    setIsLoading(false);
                  }}
                />
              </ButtonGroup>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <PageTitle
        title="Jenis Dokumen"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertJenisDokumen();
            }}
          >
            <TextField
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              label="Nama Jenis Dokumen"
            />
          </CustomModalTambah>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={50} style={{ marginTop: 50 }} />
            </div>
          ) : (
            <Table data={state} columns={columns} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
