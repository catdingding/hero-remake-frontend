import axios from "axios";
import { Message } from "view-design";

let api = axios.create({ baseURL: "http://127.0.0.1:8000/" });

const token = localStorage.getItem("access_token");
if (token) {
  api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

const chara = localStorage.getItem("chara");
if (chara) {
  api.defaults.headers.common["Chara-ID"] = chara;
}

function flat_data(data) {
  var output = [];
  if (data instanceof Array) {
    for (let obj of data) {
      output.push(...flat_data(obj));
    }
  } else if (data instanceof Object) {
    for (let key in data) {
      output.push(...flat_data(data[key]));
    }
  } else {
    output.push(data);
  }
  return output;
}

api.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    Message.error(flat_data(err.response.data).join("<br/>"));
    return Promise.reject(err);
  }
);

export default api;
