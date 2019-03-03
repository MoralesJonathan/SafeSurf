import axios from "axios";

export default {
  setAuthToken: function(token) {
    // if (token) {
    //   axios.defaults.headers.common['Authorization'] = token;
    // } else {
    //   delete axios.defaults.headers.common['Authorization'];
    // }
  },
  login: function (loginData) {
    return axios.post("/api/login/", loginData)
  },
  register: function (signupData) {
    return axios.post("/api/register", signupData)
  },
  setProfile: function(profile) {
    return axios.post("/api/profile/new/", {...profile, json: true});
  },
  getProfile: function(loginData) {
    return axios.get("/api/user/" + loginData.email)
  }
};