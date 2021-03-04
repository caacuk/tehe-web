import { React, useState, useEffect } from "react";
import {
  Grid,
  Button,
  IconButton,
  ButtonGroup,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getNegara,
  deleteNegara,
  putNegara,
  getNegaraById,
} from "../../functions/Negara";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";

const options = {
  filterType: "checkbox",
  selectableRows: false,
};

export default function Negara() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [editState, setEditState] = useState({
  //   id: "",
  //   iso: "",
  //   name: "",
  //   nicename: "",
  //   iso3: "",
  //   numcode: "",
  //   phonecode: "",
  // });

  useEffect(() => {
    async function getData() {
      const data = await getNegara();
      setState(data.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  // const editNegara = async () => {
  //   const response = await putNegara(editState);
  //   if (response.errorMessage === null) {
  //     history.push(`/app/negara`);
  //   }
  // };

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
      name: "iso",
      label: "ISO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Nama Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nicename",
      label: "Nama Baik",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "iso3",
      label: "ISO 3",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "numcode",
      label: "Kode Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phonecode",
      label: "Kode Telpon Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <>
    //           <ButtonGroup
    //             variant="text"
    //             color="primary"
    //             aria-label="text primary button group"
    //           >
    //             <CustomModalEdit
    //               handleEdit={() => {
    //                 editNegara();
    //               }}
    //               handleInitialData={async () => {
    //                 const id = tableMeta.rowData[0];
    //                 const result = await getNegaraById(id);
    //                 setEditState({ ...result.data, id });
    //               }}
    //             >
    //               <TextField
    //                 fullWidth
    //                 value={editState.iso}
    //                 onChange={(e) => {
    //                   setEditState((c) => ({ ...c, iso: e.target.value }));
    //                 }}
    //                 label="ISO"
    //               />
    //               <TextField
    //                 fullWidth
    //                 value={editState.name}
    //                 onChange={(e) => {
    //                   setEditState((c) => ({ ...c, name: e.target.value }));
    //                 }}
    //                 label="Nama"
    //               />
    //               <TextField
    //                 fullWidth
    //                 value={editState.nicename}
    //                 onChange={(e) => {
    //                   setEditState((c) => ({ ...c, nicename: e.target.value }));
    //                 }}
    //                 label="Nama Baik"
    //               />
    //               <TextField
    //                 fullWidth
    //                 value={editState.iso3}
    //                 onChange={(e) => {
    //                   setEditState((c) => ({ ...c, iso3: e.target.value }));
    //                 }}
    //                 label="ISO 3"
    //               />
    //               <TextField
    //                 fullWidth
    //                 value={editState.numcode}
    //                 onChange={(e) => {
    //                   setEditState((c) => ({ ...c, numcode: e.target.value }));
    //                 }}
    //                 label="Kode"
    //               />
    //               <TextField
    //                 fullWidth
    //                 value={editState.phonecode}
    //                 onChange={(e) => {
    //                   setEditState((c) => ({
    //                     ...c,
    //                     phonecode: e.target.value,
    //                   }));
    //                 }}
    //                 label="Kode Telepon"
    //               />
    //             </CustomModalEdit>
    //             <IconButton
    //               color="secondary"
    //               aria-label="upload picture"
    //               onClick={() => deleteNegara(tableMeta.rowData[0])}
    //               component="span"
    //               size="small"
    //             >
    //               <Delete />
    //             </IconButton>
    //           </ButtonGroup>
    //         </>
    //       );
    //     },
    //   },
    // },
  ];

  return (
    <>
      <PageTitle
        title="Negara"
        // button={
        //   <Button
        //     variant="contained"
        //     size="medium"
        //     color="primary"
        //     href="#/app/TambahNegara"
        //   >
        //     Tambah
        //   </Button>
        // }
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
