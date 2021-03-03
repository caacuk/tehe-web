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

import { getByIdProgramStudi, putProgramStudi } from "../../functions/ProgramStudi";

export default function EditProgramStudi(){
    // http://localhost:3000/#/app/editprogramstudi/1
    //alert(window.location.toString().slice(45));
    const history = useHistory();
    const [namaProgramStudi, setNamaProgramStudi] = useState("");
    const [idProgramStudi, setIdProgramStudi] = useState(window.location.toString().slice(45));
    
    useEffect(() => {
        async function getData() {
          const dataProgramStudi = await getByIdProgramStudi(idProgramStudi);
          setNamaProgramStudi(dataProgramStudi.data.nama);
        }
        getData();
      }, []);
    
    const editProgramStudi = async () => {
        
        const data = {
        id: idProgramStudi,
        nama: namaProgramStudi,
        };
        const response = await putProgramStudi(data);

        if (response.errorMessage === null) {
        history.push(`/app/programstudi`);
        }
    }

    return (
        <>
          <PageTitle
            title="Edit Program Studi"
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
          <Grid container spacing={4} style={{ padding: "20px", backgroundColor: "white", }}>
            <Grid item xs={6}>
            <InputLabel shrink>Nama Program Studi</InputLabel>
            <TextField
                id="partner"
                value={namaProgramStudi}
                onChange={(e) => setNamaProgramStudi(e.target.value)}
                type="text"
                fullWidth
            />
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
                onClick={editProgramStudi}
              >
                Simpan
              </Button>
            </Grid>
          </Grid>
        </>
    );    
}