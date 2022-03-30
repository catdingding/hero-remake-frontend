import api from "@/api";
import store from "@/store";

export async function set_introduction(data) {
  await api.put("/chara/introduction/", data);
}
export async function set_config(data) {
  await api.put("/chara/config/", data);
  await store.dispatch("chara/apply_config", data);
}
export async function change_avatar(avatar) {
  var form_data = new FormData();
  form_data.append("avatar", avatar);

  await api.post("/chara/change-avatar/", form_data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export async function set_custom_title(data) {
  await api.put("/chara/custom-title/", data);
}
export async function expand_custom_title(data) {
  await api.post("/chara/custom-title/expand/", data);
}
