import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getDosen = () => {
  return axios
    .get("dosen/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const postDosen = (dosen) => {
//   const body = {
//     name: dosen.name,
//     price: dosen.price,
//     status: 0,
//     date: dosen.date,
//   };

//   return axios
//     .post("dosen/", body, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

// export const putDosen = (dosen) => {
//   const body = {
//     name: dosen.name,
//     price: dosen.price,
//     status: dosen.status,
//     date: dosen.date,
//   };

//   return axios
//     .put("dosen/" + dosen.id, body, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

// export const deleteDosen = (dosen) => {
//   return axios
//     .delete("dosen/" + dosen.id, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };
