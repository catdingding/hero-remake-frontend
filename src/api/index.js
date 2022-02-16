import axios from "axios";
import { ElMessage } from "element-plus";

let api = axios.create({ baseURL: `${process.env.VUE_APP_API_ROOT}/` });

const token = localStorage.getItem("access_token");
if (token) {
  api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

const chara_id = localStorage.getItem("chara_id");
if (chara_id) {
  api.defaults.headers.common["Chara-ID"] = chara_id;
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
  (res) => {
    var display_message = res.data["display_message"];
    if (display_message) {
      ElMessage.success(display_message);
    } else if (res.data["status"] === "success") {
      ElMessage.success("操作成功");
    }
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    ElMessage.error(flat_data(err.response.data).join("<br/>"));
    return Promise.reject(err);
  }
);

export default api;
