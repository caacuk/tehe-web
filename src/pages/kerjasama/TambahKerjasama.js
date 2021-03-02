import { React, useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getProgramStudi } from "../../functions/ProgramStudi";
import { getNegara } from "../../functions/Negara";
import { getJenisPartner } from "../../functions/JenisPartner";
import { getJenisDokumen } from "../../functions/JenisDokumen";
import { getBentukKegiatan } from "../../functions/BentukKegiatan";

export default function TambahKerjasama() {
  const [partner, setPartner] = useState("");
  const [programStudi, setProgramStudi] = useState("");
  const [jenisPartner, setJenisPartner] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [bentukKegiatan, setBentukKegiatan] = useState("");
  const [status, setStatus] = useState("");
  const [negara, setNegara] = useState("");

  const handleChangeProgramStudi = (event) => {
    setProgramStudi(event.target.value);
  };

  const handleChangeJenisPartner = (event) => {
    setJenisPartner(event.target.value);
  };

  const handleChangeJenisDokumen = (event) => {
    setJenisDokumen(event.target.value);
  };

  const handleChangeBentukKegiatan = (event) => {
    setBentukKegiatan(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeNegara = (event) => {
    setNegara(event.target.value);
  };

  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataNegara, setDataNegara] = useState([]);
  const [dataJenisPartner, setDataJenisPartner] = useState([]);
  const [dataJenisDokumen, setDataJenisDokumen] = useState([]);
  const [dataBentukKegiatan, setDataBentukKegiatan] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudi();
      const dataNegara = await getNegara();
      const dataJenisPartner = await getJenisPartner();
      const dataJenisDokumen = await getJenisDokumen();
      const dataBentukKegiatan = await getBentukKegiatan();
      setDataProgramStudi(dataProgramStudi.data);
      setDataNegara(dataNegara.data);
      setDataJenisPartner(dataJenisPartner.data);
      setDataJenisDokumen(dataJenisDokumen.data);
      setDataBentukKegiatan(dataBentukKegiatan.data);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Tambah Kerjasama"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/kerjasama"
            margin="normal"
          >
            Kembali
          </Button>
        }
      />
      <Grid container spacing={4} style={{backgroundColor: "white"}}>
        <Grid item xs={6}>
          <InputLabel shrink>Partner</InputLabel>
          <TextField
            id="partner"
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Program Studi</InputLabel>
          <Select
            value={programStudi}
            onChange={handleChangeProgramStudi}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataProgramStudi.map((x) => 
              <MenuItem value={x.id}>{x.nama}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Negara</InputLabel>
          <Select value={negara} onChange={handleChangeNegara} fullWidth>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataNegara.map((x) => 
              <MenuItem value={x.id}>{x.nicename}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Jenis Partner</InputLabel>
          <Select
            value={jenisPartner}
            onChange={handleChangeJenisPartner}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataJenisPartner.map((x) => 
              <MenuItem value={x.id}>{x.nama}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Jenis Dokumen</InputLabel>
          <Select
            value={jenisDokumen}
            onChange={handleChangeJenisDokumen}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataJenisDokumen.map((x) => 
              <MenuItem value={x.id}>{x.nama}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Bentuk Kegiatan</InputLabel>
          <Select
            value={bentukKegiatan}
            onChange={handleChangeBentukKegiatan}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataBentukKegiatan.map((x) => 
              <MenuItem value={x.id}>{x.nama}</MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="tanggal_awal"
            label="Tanggal Awal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="tanggal_akhir"
            label="Tanggal Akhir"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Status</InputLabel>
          <Select value={status} onChange={handleChangeStatus} fullWidth>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Aktif</MenuItem>
            <MenuItem value={0}>Non Aktif</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={6} style={{padding: "20px", backgroundColor: "white"}}>
        <Grid item xs={12} style={{textAlign:"center"}}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            // href="#/app/kerjasama"
            margin="normal"
            onClick={() => {
              console.log(partner);
              console.log(programStudi);
              console.log(negara);
              console.log(jenisPartner);
              console.log(jenisDokumen);
              console.log(bentukKegiatan);
            }}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
