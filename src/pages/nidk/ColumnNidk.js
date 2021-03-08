export const ActionLessColumn = [
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
        customBodyRenderLite: (value, tableMeta, updateValue) => {
          return <>{tableMeta + 1}</>;
        },
      },
    },
    {
      name: "nidk",
      label: "NIDK",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_dosen",
      label: "id_dosen",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "nama_dosen",
      label: "Nama Dosen",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  