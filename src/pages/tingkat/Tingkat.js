import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
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
  getTingkat,
  deleteTingkat,
  putTingkat,
  postTingkat,
} from "../../functions/Tingkat";

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function Tingkat() {
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
      const data = await getTingkat();
      setState(data.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editTingkat = async () => {
    setIsLoading(true);
    const response = await putTingkat(editState);
    if (response.errorMessage === null) {
      history.push(`/app/tingkat`);
    }
    const data = await getTingkat();
    setState(data.data);
    setIsLoading(false);
    setEditState({ nama: '' });
  };
  
  const insertTingkat = async () => {
    setIsLoading(true);
    const response = await postTingkat(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/tingkat`);
    }
    const data = await getTingkat();
    setState(data.data);
    setIsLoading(false);
    setTambahState({ nama: '' });
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
                    editTingkat();
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
                    label="Nama Tingkat"
                  />
                </CustomModalEdit>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteTingkat(tableMeta.rowData[0]);
                    const data = await getTingkat();
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
        title="Tingkat"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertTingkat();
            }}
          >
            <TextField
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              label="Nama Tingkat"
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
