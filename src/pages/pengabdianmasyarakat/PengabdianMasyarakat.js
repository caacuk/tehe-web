import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import { Table } from "../../components/Table/Table";
import {
  Grid,
  IconButton,
  ButtonGroup,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { getProgramStudi } from "../../functions/ProgramStudi";
import {
  getPengabdianMasyarakat,
  putPengabdianMasyarakat,
  deletePengabdianMasyarakat,
  postPengabdianMasyarakat,
} from "../../functions/PengabdianMasyarakat";

export default function PengabdianMasyarakat() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    hibah_dikti: "",
    judul: "",
    id_dosen_1: "",
    id_dosen_2: "",
    id_dosen_3: "",
  });
  const [tambahState, setTambahState] = useState({
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    hibah_dikti: "",
    judul: "",
    id_dosen_1: "",
    id_dosen_2: "",
    id_dosen_3: "",
  });

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudi();
      setDataProgramStudi(dataProgramStudi.data);

      const data = await getPengabdianMasyarakat();
      let result = [];
      data.data.map((x, i) => {
        let jumlah_penulis = 0;
        if (x.dosen_1 !== null) jumlah_penulis++;
        if (x.dosen_2 !== null) jumlah_penulis++;
        if (x.dosen_3 !== null) jumlah_penulis++;

        const flattenData = {
          no: i + 1,
          id: x.id,
          id_program_studi: x.program_studi.id,
          nama_program_studi: x.program_studi.nama,
          tahun_ajaran: x.tahun_ajaran,
          semester: x.semester,
          hibah_dikti: x.hibah_dikti,
          judul: x.judul,
          id_dosen_1: x.dosen_1?.id,
          id_dosen_2: x.dosen_2?.id,
          id_dosen_3: x.dosen_2?.id,
          nama_dosen_1: x.dosen_1?.nama,
          nama_dosen_2: x.dosen_2?.nama,
          nama_dosen_3: x.dosen_2?.nama,
          jumlah_penulis: jumlah_penulis,
          tahun_ajaran_semester: x.tahun_ajaran + "" + x.semester,
        };
        result.push(flattenData);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataPengabdianMasyarakat = async () => {
    const data = await getPengabdianMasyarakat();
    let result = [];

    data.data.map((x, i) => {
      let jumlah_penulis = 0;
      if (x.dosen_1 !== null) jumlah_penulis++;
      if (x.dosen_2 !== null) jumlah_penulis++;
      if (x.dosen_3 !== null) jumlah_penulis++;

      const flattenData = {
        no: i + 1,
        id: x.id,
        id_program_studi: x.program_studi.id,
        nama_program_studi: x.program_studi.nama,
        tahun_ajaran: x.tahun_ajaran,
        semester: x.semester,
        hibah_dikti: x.hibah_dikti,
        judul: x.judul,
        id_dosen_1: x.dosen_1?.id,
        id_dosen_2: x.dosen_2?.id,
        id_dosen_3: x.dosen_2?.id,
        nama_dosen_1: x.dosen_1?.nama,
        nama_dosen_2: x.dosen_2?.nama,
        nama_dosen_3: x.dosen_2?.nama,
        jumlah_penulis: jumlah_penulis,
        tahun_ajaran_semester: x.tahun_ajaran + "" + x.semester,
      };
      result.push(flattenData);
    });

    setState(result);
  };

  const editPengabdianMasyarakat = async () => {
    setIsLoading(true);
    const response = await putPengabdianMasyarakat(editState);

    if (response.errorMessage === null) {
      history.push(`/app/pengabdianMasyarakat`);
    }
    getDataPengabdianMasyarakat();
    setIsLoading(false);
    setEditState({
      id: "",
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      hibah_dikti: "",
      judul: "",
      id_dosen_1: "",
      id_dosen_2: "",
      id_dosen_3: "",
    });
  };

  const insertPengabdianMasyarakat = async () => {
    setIsLoading(true);
    const response = await postPengabdianMasyarakat(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/pengabdianMasyarakat`);
    }
    getDataPengabdianMasyarakat();
    setIsLoading(false);
    setEditState({
      id: "",
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      hibah_dikti: "",
      judul: "",
      id_dosen_1: "",
      id_dosen_2: "",
      id_dosen_3: "",
    });
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
      name: "id_program_studi",
      label: "Program Studi",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "tahun_ajaran",
      label: "Tahun Ajaran",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "semester",
      label: "Semester",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "nama_program_studi",
      label: "Program Studi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tahun_ajaran_semester",
      label: "Semester",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "hibah_dikti",
      label: "Hibah Dikti",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "judul",
      label: "Judul",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "jumlah_penulis",
      label: "Penulis",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_dosen_1",
      label: "Penulis",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "id_dosen_2",
      label: "Penulis",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "id_dosen_3",
      label: "Penulis",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <IconButton size="small">
                  <CustomModalEdit
                    handleEdit={() => {
                      editPengabdianMasyarakat();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        hibah_dikti: rowData[7],
                        judul: rowData[8],
                        id_dosen_1: rowData[10],
                        id_dosen_2: rowData[11],
                        id_dosen_3: rowData[12],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Judul</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.judul}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              judul: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Program Studi</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_program_studi}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_program_studi: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {dataProgramStudi.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Hibah Dikti</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.hibah_dikti}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              hibah_dikti: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          <MenuItem value={"Ya"}>Ya</MenuItem>
                          <MenuItem value={"Tidak"}>Tidak</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tahun Ajaran</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.tahun_ajaran}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              tahun_ajaran: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Semester</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.semester}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              semester: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          <MenuItem value={1}>Ganjil</MenuItem>
                          <MenuItem value={2}>Genap</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </CustomModalEdit>
                </IconButton>
                <IconButton size="small">
                  {/* CUSTOM MODAL DELETE */}
                  <CustomModalDelete
                    handleDelete={async () => {
                      setIsLoading(true);
                      await deletePengabdianMasyarakat(tableMeta.rowData[0]);
                      getDataPengabdianMasyarakat();
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
        title="Pengabdian Masyarakat"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertPengabdianMasyarakat();
            }}
          ></CustomModalTambah>
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
