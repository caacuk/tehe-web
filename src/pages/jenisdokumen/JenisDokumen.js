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

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getJenisDokumen,
  deleteJenisDokumen,
  putJenisDokumen,
  postJenisDokumen,
} from "../../functions/JenisDokumen";

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
      let result = [];

      data.data.map((x, i) => {
        x = {...x, no: i + 1}; 
        result.push(x)
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataJenisDokumen = async () => {
    const data = await getJenisDokumen();
    let result = [];

    data.data.map((x, i) => {
      x = {...x, no: i + 1}; 
      result.push(x)
    });

    setState(result);
  };

  const editJenisDokumen = async () => {
    setIsLoading(true);
    const response = await putJenisDokumen(editState);
    if (response.errorMessage === null) {
      history.push(`/app/jenisdokumen`);
    }
    getDataJenisDokumen();
    setIsLoading(false);
    setEditState({ nama: "" });
  };

  const insertJenisDokumen = async () => {
    setIsLoading(true);
    const response = await postJenisDokumen(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/jenisdokumen`);
    }
    getDataJenisDokumen();
    setIsLoading(false);
    setTambahState({ nama: "" });
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false
      },
    },
    {
      name: "no",
      label: "No",
      options: {
        filter: false,
        sort: true,
        display: true
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
                    setEditState({ nama: rowData[2], id: rowData[0] });
                  }}
                >
                  <TextField
                    fullWidth
                    value={editState.nama}
                    onChange={(e) => {
                      setEditState((c) => ({ ...c, nama: e.target.value }));
                    }}
                    label="Nama Jenis Dokumen"
                    variant="outlined"
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
              variant="outlined"
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
