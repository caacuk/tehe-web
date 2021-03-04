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
  getJenisPartner,
  deleteJenisPartner,
  putJenisPartner,
  postJenisPartner,
} from "../../functions/JenisPartner";

export default function JenisPartner() {
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
      const data = await getJenisPartner();
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

  const getDataJenisPartner = async () => {
    const data = await getJenisPartner();
    let result = [];

    data.data.map((x, i) => {
      x = {...x, no: i + 1}; 
      result.push(x)
    });

    setState(result);
  };

  const editJenisPartner = async () => {
    setIsLoading(true);
    const response = await putJenisPartner(editState);
    if (response.errorMessage === null) {
      history.push(`/app/jenispartner`);
    }
    getDataJenisPartner();
    setIsLoading(false);
    setEditState({ nama: "" });
  };

  const insertJenisPartner = async () => {
    setIsLoading(true);
    const response = await postJenisPartner(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/jenispartner`);
    }
    getDataJenisPartner();
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
                    editJenisPartner();
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
                    label="Nama Jenis Partner"
                    variant="outlined"
                  />
                </CustomModalEdit>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteJenisPartner(tableMeta.rowData[0]);
                    const data = await getJenisPartner();
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
        title="Jenis Partner"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertJenisPartner();
            }}
          >
            <TextField
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              label="Nama Jenis Partner"
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
