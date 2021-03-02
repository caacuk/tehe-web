import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getKerjasama = () => {
  return axios
    .get("kerjasama/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postKerjasama = (kerjasama) => {
  const body = kerjasama;

  return axios
    .post("kerjasama/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const putProgramStudi = (programStudi) => {
//   const body = {
//     name: programStudi.name,
//     price: programStudi.price,
//     status: programStudi.status,
//     date: programStudi.date,
//   };

//   return axios
//     .put("programStudi/" + programStudi.id, body, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

// export const deleteProgramStudi = (programStudi) => {
//   return axios
//     .delete("programStudi/" + programStudi.id, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };
