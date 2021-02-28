import { React, useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  ButtonGroup,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getKerjasama } from "./functions/Kerjasama";

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
            <MenuItem value={10}>FMIPA</MenuItem>
            <MenuItem value={20}>FISIP</MenuItem>
            <MenuItem value={30}>KBPS</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Negara</InputLabel>
          <Select value={negara} onChange={handleChangeNegara} fullWidth>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Negara 1</MenuItem>
            <MenuItem value={20}>Negara 2</MenuItem>
            <MenuItem value={30}>Negara 3</MenuItem>
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
            <MenuItem value={10}>Partner 1</MenuItem>
            <MenuItem value={20}>Partner 2</MenuItem>
            <MenuItem value={30}>Partner 3</MenuItem>
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
            <MenuItem value={10}>Dokumen 1</MenuItem>
            <MenuItem value={20}>Dokumen 2</MenuItem>
            <MenuItem value={30}>Dokumen 3</MenuItem>
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
            <MenuItem value={10}>Kegiatan 1</MenuItem>
            <MenuItem value={20}>Kegiatan 2</MenuItem>
            <MenuItem value={30}>Kegiatan 3</MenuItem>
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
            <MenuItem value={10}>Aktif</MenuItem>
            <MenuItem value={20}>Non Aktif</MenuItem>
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
            onClick={() => console.log("clicked")}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
