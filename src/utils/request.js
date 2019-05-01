import axios from 'axios';

// export default function request(options) {
//   return axios(options)
//     .then(response => {
//       const { statusText, status, data } = response;

//       return Promise.resolve({
//         success: true,
//         message: statusText,
//         statusCode: status,
//         ...data,
//       });
//     })
//     .catch(error => {
//       const { response } = error;
//       let statusCode = response.status;
//       let msg = '';

//       return Promise.reject({
//         success: false,
//         statusCode,
//         message: msg,
//       });
//     });
// }

const instance = axios.create({
  baseURL: 'http://localhost:3000/admin',
});

// instance.defaults.headers.common['Authorization'] = '';
instance.interceptors.response.use(
  function(response) {
    console.log(response);
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
