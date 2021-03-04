import { React, useState, useEffect } from "react";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import { Table } from "../../components/Table/Table";
import { useHistory } from "react-router-dom";

import {
  Grid,
  ButtonGroup,
  CircularProgress,
  TextField,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getMahasiswa,
  deleteMahasiswa,
  putMahasiswa,
  postMahasiswa,
} from "../../functions/Mahasiswa";

export default function Mahasiswa() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState({
    id: "",
    nama: "",
  });
  const [tambahState, setTambahState] = useState({
    nim: "",
    nama: "",
  });

  useEffect(() => {
    async function getData() {
      const data = await getMahasiswa();
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

  const getDataMahasiswa = async () => {
    const data = await getMahasiswa();
    let result = [];

    data.data.map((x, i) => {
      x = {...x, no: i + 1}; 
      result.push(x)
    });

    setState(result);
  };

  const editMahasiswa = async () => {
    setIsLoading(true);
    const response = await putMahasiswa(editState);
    if (response.errorMessage === null) {
      history.push(`/app/mahasiswa`);
    }
    getDataMahasiswa();
    setIsLoading(false);
    setEditState({ nama: "", nim: "" });
  };

  const insertMahasiswa = async () => {
    setIsLoading(true);
    const response = await postMahasiswa(tambahState);
    console.log(tambahState);
    if (response.errorMessage === null) {
      history.push(`/app/mahasiswa`);
    }
    getDataMahasiswa();
    setIsLoading(false);
    setTambahState({ nama: "", nim: "" });
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
      name: "nim",
      label: "NIM",
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
                    editMahasiswa();
                  }}
                  handleInitialData={async () => {
                    console.log(tableMeta);
                    const { rowData } = tableMeta;
                    setEditState({ nama: rowData[3], nim: rowData[2], id: rowData[0] });
                  }}
                >
                  <TextField style={{marginBottom: "13px"}}
                    fullWidth
                    value={editState.nim}
                    // onChange={(e) => {
                    //   setEditState((c) => ({ ...c, nim: e.target.value }));
                    // }}
                    label="Nim Mahasiswa"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={editState.nama}
                    onChange={(e) => {
                      setEditState((c) => ({ ...c, nama: e.target.value }));
                    }}
                    label="Nama Mahasiswa"
                    variant="outlined"
                    />
                </CustomModalEdit>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteMahasiswa(tableMeta.rowData[0]);
                    const data = await getMahasiswa();
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
        title="Mahasiswa"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertMahasiswa();
            }}
          >
            <TextField style={{marginBottom:"13px"}}
              fullWidth
              value={tambahState.nim}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nim: e.target.value }));
              }}
              label="Nim Mahasiswa"
              variant="outlined"
            />
            <TextField
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              label="Nama Mahasiswa"
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
