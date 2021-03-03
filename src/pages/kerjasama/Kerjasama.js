import { React, useState, useEffect } from "react";
import { Grid, Button, IconButton, ButtonGroup } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getKerjasama } from "../../functions/Kerjasama";

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
    name: "nama_program_studi",
    label: "Program Studi",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "tanggal_awal",
    label: "Tanggal Awal",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "tanggal_akhir",
    label: "Tanggal Akhir",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "partner",
    label: "Partner",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama_negara",
    label: "Negara",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama_jenis_partner",
    label: "Jenis Partner",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama_jenis_dokumen",
    label: "Jenis Dokumen",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama_bentuk_kegiatan",
    label: "Bentuk Kegiatan",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "dokumen",
    label: "Dokumen",
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
                onClick={() => console.log(tableMeta.rowData[0])}
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

export default function Kerjasama() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getKerjasama();
      let result = [];
      data.data.map((x, i) => {
        const flattenData = {
          no: i + 1,
          id: x.id,
          tanggal_awal: x.tanggal_awal,
          tanggal_akhir: x.tanggal_akhir,
          partner: x.partner,
          status: x.status,
          dokumen: x.dokumen,
          nama_program_studi: x.program_studi.nama,
          nama_jenis_partner: x.jenis_partner.nama,
          nama_jenis_dokumen: x.jenis_dokumen.nama,
          nama_bentuk_kegiatan: x.bentuk_kegiatan.nama,
          nama_negara: x.negara.name,
        };
        result.push(flattenData);
      });
      setState(result);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Kerjasama"
        button={
          <Button
            variant="contained"
            size="medium"
            color="primary"
            href="#/app/tambahKerjasama"
          >
            Tambah
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=""
            data={state}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
