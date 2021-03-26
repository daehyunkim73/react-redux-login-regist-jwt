import axios from "axios";

const API_URL = "http://127.0.0.1:8082";



const register = (username, email, password, role) => {
  return new Promise(function(resolve, reject) {
    const data = axios.post(API_URL + "/api/front_api/signup", {
      username,
      email,
      password,
      role,
    });
    resolve(data);
  });
};


const login = (username, password) => {
  return axios
    .post(API_URL + "/api/front_api/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.info) {
        localStorage.setItem("user", JSON.stringify(response.data.info));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};


export default {
  register,
  login,
  logout,
};
