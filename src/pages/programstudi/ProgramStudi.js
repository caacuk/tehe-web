import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getProgramStudi,
  deleteProgramStudi,
  putProgramStudi,
  postProgramStudi,
} from "../../functions/ProgramStudi";
import {
  Grid,
  Button,
  ButtonGroup,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function ProgramStudi() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [namaProgramStudi, setNamaProgramStudi] = useState("");
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
      const data = await getProgramStudi();
      setState(data.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editProgramStudi = async () => {
    setIsLoading(true);
    const response = await putProgramStudi(editState);
    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
    const data = await getProgramStudi();
    setState(data.data);
    setIsLoading(false);
    setEditState({ nama: '' });
  };
  
  const insertProgramStudi = async () => {
    setIsLoading(true);
    const response = await postProgramStudi(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
    const data = await getProgramStudi();
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
                    editProgramStudi();
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
                    label="Nama Program Studi"
                  />
                </CustomModalEdit>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteProgramStudi(tableMeta.rowData[0]);
                    const data = await getProgramStudi();
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
        title="Program Studi"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertProgramStudi();
            }}
          >
            <TextField
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              label="Nama Program Studi"
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
