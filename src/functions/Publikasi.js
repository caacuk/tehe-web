import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getPublikasi = () => {
  return axios
    .get("publikasi/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const getKerjasamaById = (id) => {
//   console.log(id);
//   return axios
//     .get("kerjasama/" + id, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

export const postPublikasi = (publikasi) => {
  const body = publikasi;

  return axios
    .post("publikasi/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const putKerjasama = (kerjasama) => {
//   const body = kerjasama;

//   return axios
//     .put("kerjasama/" + kerjasama.id, body, axiosConfig)
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
