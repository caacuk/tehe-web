import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

import {
  getProgramStudi,
  postProgramStudi,
} from "../../functions/ProgramStudi";

export default function TambahProgramStudi() {
  const history = useHistory();
  const [programStudi, setProgramStudi] = useState("");
  const [dataProgramStudi, setDataProgramStudi] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudi();
      setDataProgramStudi(dataProgramStudi.data);
    }
    getData();
  }, []);

  const insertProgramStudi = async () => {
    const data = {
      id_program_studi: programStudi,
    };
    const response = await postProgramStudi(data);

    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
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
            href="#/app/programstudi"
            margin="normal"
          >
            Kembali
          </Button>
        }
      />
      <Grid
        container
        spacing={4}
        style={{ padding: "20px", backgroundColor: "white" }}
      >
        <Grid item xs={6}>
          <InputLabel shrink>Program Studi</InputLabel>
          <TextField
            id="partner"
            value={programStudi}
            onChange={(e) => setProgramStudi(e.target.value)}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>Program Studi</InputLabel>
          <Select
            value={programStudi}
            onChange={(e) => setProgramStudi(e.target.value)}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataProgramStudi.map((x) => (
              <MenuItem value={x.id}>{x.nama}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        style={{ padding: "20px", backgroundColor: "white" }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            // href="#/app/programstudi"
            margin="normal"
            onClick={insertProgramStudi}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
