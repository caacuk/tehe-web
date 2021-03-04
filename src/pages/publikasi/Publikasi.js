import { React, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Button,
  IconButton,
  ButtonGroup,
  CircularProgress,
} from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getKerjasama } from "../../functions/Kerjasama";
import { getPublikasi } from "../../functions/Publikasi";

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: "no",
    label: "No",
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
    name: "nama_program_studi",
    label: "Program Studi",
    options: {
      filter: true,
      sort: true,
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
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() =>
                  (window.location =
                    "#/app/editKerjasama/" + tableMeta.rowData[0])
                }
                component="span"
                size="small"
              >
                <Create />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                onClick={() => console.log(tableMeta.rowData[0])}
                component="span"
                size="small"
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          </>
        );
      },
    },
  },
];

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function Publikasi() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getPublikasi();
      let result = [];
      data.data.map((x, i) => {
        const flattenData = {
          no: i + 1,
          id: x.id,
          tahun_ajaran: x.tahun_ajaran,
          semester: x.semester,
          judul: x.judul,
          nama_jurnal: x.nama_jurnal,
          edisi: x.edisi,
          volume: x.volume,
          url: x.url,
          nama_program_studi: x.program_studi.nama,
          nama_tingkat: x.tingkat.nama,
          nama_mahasiswa_1: x.mahasiswa_1?.nama,
          nama_mahasiswa_2: x.mahasiswa_2?.nama,
          nama_dosen_1: x.dosen_1?.nama,
          nama_dosen_2: x.dosen_2?.nama,
        };
        result.push(flattenData);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Publikasi"
        button={
          <Button
            variant="contained"
            size="medium"
            color="primary"
            href="#/app/tambahPublikasi"
          >
            Tambah
          </Button>
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
