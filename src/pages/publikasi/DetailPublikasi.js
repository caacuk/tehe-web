import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Grid, TextField } from "@material-ui/core";

export const DetailPublikasi = ({ setDetailState, detailState, tableMeta }) => {
  return (
    <CustomModalDetail
      handleInitialData={async () => {
        const { rowData } = tableMeta;
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
          hibah_dikti: rowData[21],
        });
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
  );
};

export default DetailPublikasi;
