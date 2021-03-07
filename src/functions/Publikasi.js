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

// export const getPublikasiById = (id) => {
//   console.log(id);
//   return axios
//     .get("Publikasi/" + id, axiosConfig)
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

export const putPublikasi = (Publikasi) => {
  const body = Publikasi;

  return axios
    .put("publikasi/" + Publikasi.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deletePublikasi = (id) => {
  return axios
    .delete("publikasi/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
