import { React, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Table } from "../../components/Table/Table";
import { Autocomplete } from "@material-ui/lab";
import {
  Grid,
  IconButton,
  ButtonGroup,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import { Create, Delete, Visibility } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

import { getProgramStudi } from "../../functions/ProgramStudi";
import { getDosen } from "../../functions/Dosen";
import { getTingkat } from "../../functions/Tingkat";
// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getPublikasi,
  postPublikasi,
  putPublikasi,
  deletePublikasi,
} from "../../functions/Publikasi";

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function Publikasi() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataTingkat, setDataTingkat] = useState([]);
  const [dataDosen, setDataDosen] = useState([]);
  const [inputPenulis1, setInputPenulis1] = useState("");
  const [detailState, setDetailState] = useState({
    semester: "",
    judul: "",
    nama_jurnal: "",
    edisi: "",
    volume: "",
    url: "",
    nama_program_studi: "",
    nama_tingkat: "",
    nama_dosen_1: "",
    nama_dosen_2: "",
    nama_dosen_3: "",
    jumlah_penulis: "",
    no_semester: "",
    hibah_dikti:"",
  });
  const [editState, setEditState] = useState({
    id: "",
    semester: "",
    judul: "",
    nama_jurnal: "",
    edisi: "",
    volume: "",
    url: "",
    id_program_studi: "",
    id_tingkat: "",
    id_dosen_1: "",
    id_dosen_2: "",
    id_dosen_3: "",
    jumlah_penulis: "",
    tahun_ajaran: "",
    no_semester: "",
    hibah_dikti: "",
  });
  const [tambahState, setTambahState] = useState({
    semester: "",
    judul: "",
    nama_jurnal: "",
    edisi: "",
    volume: "",
    url: "",
    id_program_studi: "",
    id_tingkat: "",
    id_dosen_1: "",
    id_dosen_2: "",
    id_dosen_3: "",
    nama_dosen_1: "",
    nama_dosen_2: "",
    nama_dosen_3: "",
    jumlah_penulis: "",
    tahun_ajaran: "",
    hibah_dikti: "",
  });

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudi();
      const dataDosen = await getDosen();
      const dataTingkat = await getTingkat();
      setDataProgramStudi(dataProgramStudi.data);
      setDataDosen(dataDosen.data);
      setDataTingkat(dataTingkat.data);

      const data = await getPublikasi();
      let result = [];
      data.data.map((x, i) => {
        let jumlah_penulis = 0;
        if (x.dosen_1 !== null) jumlah_penulis++;
        if (x.dosen_2 !== null) jumlah_penulis++;
        if (x.dosen_3 !== null) jumlah_penulis++;

        const flattenData = {
          no: i + 1,
          id: x.id,
          semester: x.tahun_ajaran + "" + x.semester,
          judul: x.judul,
          nama_jurnal: x.nama_jurnal,
          edisi: x.edisi,
          volume: x.volume,
          url: x.url,
          hibah_dikti: x.hibah_dikti,
          nama_program_studi: x.program_studi.nama,
          nama_tingkat: x.tingkat.nama,
          nama_dosen_1: x.dosen_1?.nama,
          nama_dosen_2: x.dosen_2?.nama,
          nama_dosen_3: x.dosen_2?.nama,
          id_program_studi: x.program_studi.id,
          id_tingkat: x.tingkat.id,
          id_dosen_1: x.dosen_1?.id,
          id_dosen_2: x.dosen_2?.id,
          id_dosen_3: x.dosen_2?.id,
          jumlah_penulis: jumlah_penulis,
          tahun_ajaran: x.tahun_ajaran,
          no_semester: x.semester,
        };
        result.push(flattenData);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataPublikasi = async () => {
    const data = await getPublikasi();
    let result = [];
    data.data.map((x, i) => {
      let jumlah_penulis = 0;
      if (x.dosen_1 !== null) jumlah_penulis++;
      if (x.dosen_2 !== null) jumlah_penulis++;
      if (x.dosen_3 !== null) jumlah_penulis++;

      const flattenData = {
        no: i + 1,
        id: x.id,
        semester: x.tahun_ajaran + "" + x.semester,
        judul: x.judul,
        nama_jurnal: x.nama_jurnal,
        edisi: x.edisi,
        volume: x.volume,
        url: x.url,
        hibah_dikti: x.hibah_dikti,
        nama_program_studi: x.program_studi.nama,
        nama_tingkat: x.tingkat.nama,
        nama_dosen_1: x.dosen_1?.nama,
        nama_dosen_2: x.dosen_2?.nama,
        nama_dosen_3: x.dosen_2?.nama,
        id_program_studi: x.program_studi.id,
        id_tingkat: x.tingkat.id,
        id_dosen_1: x.dosen_1?.id,
        id_dosen_2: x.dosen_2?.id,
        id_dosen_3: x.dosen_2?.id,
        jumlah_penulis: jumlah_penulis,
        tahun_ajaran: x.tahun_ajaran,
        no_semester: x.semester,
      };
      result.push(flattenData);
    });
    setState(result);
    setIsLoading(false);
  };

  const editPublikasi = async () => {
    setEditState((c) => ({
      ...c,
      id_dosen_1: c.id_dosen_1 ? c.id_dosen_1 : null,
      id_dosen_2: c.id_dosen_2 ? c.id_dosen_2 : null,
      id_dosen_3: c.id_dosen_3 ? c.id_dosen_3 : null
    }));
    
    console.log(editState);
    // const response = await putPublikasi(tambahState);

    // if (response.errorMessage === null) {
    //   history.push(`/app/publikasi`);
    // }
    // getDataPublikasi();
    // setIsLoading(false);
    // setTambahState({
    //   semester: "",
    //   judul: "",
    //   nama_jurnal: "",
    //   edisi: "",
    //   volume: "",
    //   url: "",
    //   id_program_studi: "",
    //   id_tingkat: "",
    //   id_dosen_1: "",
    //   id_dosen_2: "",
    //   id_dosen_3: "",
    //   jumlah_penulis: "",
    //   tahun_ajaran: "",
    //   no_semester: "",
    //   hibah_dikti: "",
    // });
  };
  const insertPublikasi = async () => {
    setTambahState((c) => ({
      ...c,
      id_dosen_1: c.id_dosen_1 ? c.id_dosen_1 : null,
      id_dosen_2: c.id_dosen_2 ? c.id_dosen_2 : null,
      id_dosen_3: c.id_dosen_3 ? c.id_dosen_3 : null
    }));
    
    console.log(tambahState);
    const response = await postPublikasi(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/publikasi`);
    }
    getDataPublikasi();
    setIsLoading(false);
    setTambahState({
      semester: "",
      judul: "",
      nama_jurnal: "",
      edisi: "",
      volume: "",
      url: "",
      id_program_studi: "",
      id_tingkat: "",
      id_dosen_1: "",
      id_dosen_2: "",
      id_dosen_3: "",
      jumlah_penulis: "",
      tahun_ajaran: "",
      hibah_dikti: "",
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
      name: "nama_program_studi",
      label: "Program Studi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "semester",
      label: "Semester",
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
      name: "id_tingkat",
      label: "Tingkat",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "nama_tingkat",
      label: "Tingkat",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nama_jurnal",
      label: "Jurnal",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "edisi",
      label: "Edisi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "volume",
      label: "Volume",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "url",
      label: "URL",
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
      label: "id Dosen 1",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "nama_dosen_1",
      label: "Nama Dosen 1",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "id_dosen_2",
      label: "id Dosen 2",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "nama_dosen_2",
      label: "Nama Dosen 2",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "id_dosen_3",
      label: "id Dosen 3",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "nama_dosen_3",
      label: "Nama Dosen 3",
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
      name: "no_semester",
      label: "Ganjil/Genap",
      options: {
        filter: true,
        sort: true,
        display: false,
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
                  <CustomModalDetail
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      // console.log(rowData);
                      setDetailState({
                        id: rowData[0],
                        semester: rowData[4],
                        judul: rowData[5],
                        nama_jurnal: rowData[8],
                        edisi: rowData[9],
                        volume: rowData[10],
                        url: rowData[11],
                        nama_program_studi: rowData[3],
                        nama_tingkat: rowData[7],
                        nama_dosen_1: rowData[14],
                        nama_dosen_2: rowData[16],
                        nama_dosen_3: rowData[18],
                        jumlah_penulis: rowData[12],
                        tahun_ajaran: rowData[19],
                        no_semester: rowData[20],
                        hibah_dikti:rowData[21],
                      });
                      // console.log(detailState);
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Judul"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.judul}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={5}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Jurnal"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.nama_jurnal}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Edisi"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.edisi}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Volume"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.volume}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={5}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Program Studi"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.nama_program_studi}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label="Tahun Ajaran"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.tahun_ajaran}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Semester"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.no_semester}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Nama Dosen 1"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.nama_dosen_1}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Nama Dosen 2"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.nama_dosen_2}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Nama Dosen 3"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.nama_dosen_3}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginBottom: "13px" }}
                          fullWidth
                          label="URL"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.url}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginBottom: "13px" }}
                          fullWidth
                          label="Hibah Dikti"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.hibah_dikti}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Tingkat"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          value={detailState.nama_tingkat}
                        />
                      </Grid>
                    </Grid>
                  </CustomModalDetail>
                </IconButton>
                <IconButton size="small">
                  <CustomModalEdit
                    handleTambah={() => {
                      editPublikasi();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      // console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        // semester: rowData[4],
                        judul: rowData[5],
                        nama_jurnal: rowData[8],
                        edisi: rowData[9],
                        volume: rowData[10],
                        url: rowData[11],
                        id_program_studi: rowData[2],
                        id_tingkat: rowData[6],
                        id_dosen_1: rowData[13],
                        nama_dosen_1: rowData[14],
                        id_dosen_2: rowData[15],
                        nama_dosen_2: rowData[16],
                        id_dosen_3: rowData[17],
                        jumlah_penulis: rowData[12],
                        tahun_ajaran: rowData[19],
                        no_semester: rowData[20],
                        hibah_dikti:rowData[21],
                      });
                      setInputPenulis1(rowData[14]);
                      console.log(inputPenulis1);
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Judul"
                          value={editState.judul}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={5}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Jurnal"
                          value={editState.nama_jurnal}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Edisi"
                          value={editState.edisi}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginRight: "4px" }}
                          fullWidth
                          label="Volume"
                          value={editState.volume}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={5}>
                      <InputLabel>Program Studi</InputLabel>
                      <Select
                        value={editState.id_program_studi}
                        onChange={(e) => {
                          setEditState((c) => ({
                            ...c,
                            id_program_studi: e.target.value,
                          }));
                        }}
                        fullWidth
                        style={{ marginBottom: "3px" }}
                      >
                        {dataProgramStudi.map((x) => (
                          <MenuItem value={x.id}>{x.nama}</MenuItem>
                        ))}
                      </Select>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label="Tahun Ajaran"
                          value={editState.tahun_ajaran}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Semester</InputLabel>
                        <Select
                          value={editState.no_semester}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c, no_semester: e.target.value,
                            }));
                          }}
                          fullWidth
                          style={{ marginBottom: "3px" }}
                        >
                          <MenuItem value={1}>Ganjil</MenuItem>
                          <MenuItem value={2}>Genap</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <InputLabel>Nama Penulis 1</InputLabel>
                        <Autocomplete
                          value={editState.id_dosen_1}
                          onChange={(event, newValue) => {
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              id_dosen_1: newValue.id,
                            }));
                          }}
                          inputValue={inputPenulis1}
                          onInputChange={(event, newInputValue) => {
                            setInputPenulis1(newInputValue);
                            // console.log(newInputValue);
                            // setEditState((c) => ({
                            //   ...c,
                            //   nama_dosen_1: newInputValue.nama,
                            // }));
                          }}
                          options={dataDosen}
                          getOptionLabel={(option) => option.nama}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                          freeSolo
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Nama Penulis 2</InputLabel>
                        <Autocomplete
                          value={editState.nama_dosen_2}
                          onChange={(event, newValue) => {
                            setEditState((c) => ({
                              ...c,
                              nama_dosen_2: newValue.id,
                            }));
                          }}
                          inputValue={editState.id_dosen_2}
                          options={dataDosen}
                          getOptionLabel={(option) => option.nama}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                          freeSolo
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                      <InputLabel>Nama Penulis 3</InputLabel>
                        <Autocomplete
                          value={editState.nama_dosen_3}
                          onChange={(event, newValue) => {
                            setEditState((c) => ({
                              ...c,
                              nama_dosen_3: newValue.id,
                            }));
                          }}
                          options={dataDosen}
                          getOptionLabel={(option) => option.nama}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                          freeSolo
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <TextField
                          style={{ marginBottom: "13px" }}
                          fullWidth
                          label="URL"
                          value={editState.url}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Hibah Dikti</InputLabel>
                        <Select
                          value={editState.hibah_dikti}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c, hibah_dikti: e.target.value,
                            }));
                          }}
                          fullWidth
                          style={{ marginBottom: "3px" }}
                        >
                          <MenuItem value={1}>Ya</MenuItem>
                          <MenuItem value={0}>Tidak</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Tingkat</InputLabel>
                        <Select
                          value={editState.id_tingkat}
                          onChange={(e) => {
                            setEditState((c) => ({ ...c, id_tingkat: e.target.value }));
                          }}
                          style={{ marginBottom: "3px" }}
                          fullWidth
                        >
                          {dataTingkat.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
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
                      await deletePublikasi(tableMeta.rowData[0]);
                      getDataPublikasi();
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
        title="Publikasi"
        button={
          <CustomModalTambah
            handleTambah={() => {
              insertPublikasi();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  style={{ marginBottom: "3px" }}
                  fullWidth
                  label="Judul"
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, judul: e.target.value }));
                  }}
                  value={tambahState.judul}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  style={{ marginRight: "4px" }}
                  fullWidth
                  label="Jurnal"
                  value={tambahState.nama_jurnal}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c, nama_jurnal: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Hibah Dikti</InputLabel>
                <Select
                  value={tambahState.hibah_dikti}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c, hibah_dikti: e.target.value,
                    }));
                  }}
                  fullWidth
                  style={{ marginBottom: "3px" }}
                >
                  <MenuItem value={1}>Ya</MenuItem>
                  <MenuItem value={0}>Tidak</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Edisi"
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, edisi: e.target.value }));
                  }}
                  value={tambahState.edisi}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Volume"
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, volume: e.target.value }));
                  }}
                  value={tambahState.volume}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Tingkat</InputLabel>
                <Select
                  value={tambahState.id_tingkat}
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, id_tingkat: e.target.value }));
                  }}
                  style={{ marginBottom: "3px" }}
                  fullWidth
                >
                  {dataTingkat.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Tahun Ajaran"
                  value={tambahState.tahun_ajaran}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      tahun_ajaran: e.target.value,
                    }));
                  }}
                  style={{ marginBottom: "3px" }}
                />
              </Grid>
              <Grid item xs={3}>
                <InputLabel>Semester</InputLabel>
                <Select
                  value={tambahState.semester}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      semester: e.target.value,
                    }));
                  }}
                  fullWidth
                >
                  <MenuItem value={1}>Ganjil</MenuItem>
                  <MenuItem value={2}>Genap</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Program Studi</InputLabel>
                <Select
                  value={tambahState.id_program_studi}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_program_studi: e.target.value,
                    }));
                  }}
                  fullWidth
                  style={{ marginBottom: "3px" }}
                >
                  {dataProgramStudi.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <InputLabel>Nama Penulis 1</InputLabel>
                <Autocomplete
                  value={tambahState.id_dosen_1}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen_1: newValue.id,
                    }));
                  }}
                  options={dataDosen}
                  getOptionLabel={(option) => option.nama}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                  freeSolo
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Nama Penulis 2</InputLabel>
                <Autocomplete
                  value={tambahState.id_dosen_2}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen_2: newValue.id,
                    }));
                  }}
                  options={dataDosen}
                  getOptionLabel={(option) => option.nama}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                  freeSolo
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Nama Penulis 3</InputLabel>
                <Autocomplete
                  value={tambahState.id_dosen_3}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen_3: newValue.id,
                    }));
                  }}
                  options={dataDosen}
                  getOptionLabel={(option) => option.nama}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                  freeSolo
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  style={{ marginBottom: "13px" }}
                  fullWidth
                  label="URL"
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, url: e.target.value }));
                  }}
                  value={tambahState.url}
                />
              </Grid>
            </Grid>
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
