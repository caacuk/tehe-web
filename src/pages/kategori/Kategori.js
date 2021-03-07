import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import { Table } from "../../components/Table/Table";
import { useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  ButtonGroup,
  CircularProgress,
  TextField,
  IconButton,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getKategori,
  deleteKategori,
  putKategori,
  postKategori,
} from "../../functions/Kategori";

export default function Kategori() {
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
      const data = await getKategori();
      let result = [];

      data.data.forEach((x, i) => {
        x = { ...x, no: i + 1 };
        result.push(x);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataKategori = async () => {
    const data = await getKategori();
    let result = [];

    data.data.forEach((x, i) => {
      x = { ...x, no: i + 1 };
      result.push(x);
    });

    setState(result);
  };

  const editKategori = async () => {
    setIsLoading(true);
    const response = await putKategori(editState);
    if (response.errorMessage === null) {
      history.push(`/app/kategori`);
    }
    getDataKategori();
    setIsLoading(false);
    setEditState({ nama: "" });
  };

  const insertKategori = async () => {
    setIsLoading(true);
    const response = await postKategori(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/kategori`);
    }
    getDataKategori();
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
        display: false,
      },
    },
    {
      name: "no",
      label: "No",
      options: {
        filter: false,
        sort: true,
        display: true,
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
                <IconButton size="small">
                  {/* CUSTOM MODAL EDIT */}
                  <CustomModalEdit
                    handleEdit={() => {
                      editKategori();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      setEditState({ nama: rowData[2], id: rowData[0] });
                    }}
                  >
                    <Typography variant="caption">Nama Kategori</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={editState.nama}
                      onChange={(e) => {
                        setEditState((c) => ({ ...c, nama: e.target.value }));
                      }}
                    />
                  </CustomModalEdit>
                </IconButton>
                <IconButton size="small">
                  {/* CUSTOM MODAL DELETE */}
                  <CustomModalDelete
                    handleDelete={async () => {
                      setIsLoading(true);
                      await deleteKategori(tableMeta.rowData[0]);
                      const data = await getKategori();
                      setState(data.data);
                      setIsLoading(false);
                    }}
                  />
                </IconButton>
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
        title="Kategori"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertKategori();
            }}
          >
            <Typography variant="caption">Nama Kategori</Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              style={{ marginBottom: "13px" }}
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
