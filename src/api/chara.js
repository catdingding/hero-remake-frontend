import api from "@/api";
import { apply_config } from "@/utils/chara.js";

export async function set_introduction(data) {
  await api.put("/chara/introduction/", data);
}
export async function set_config(data) {
  await api.put("/chara/config/", data);
  apply_config(data);
}
export async function change_avatar(avatar) {
  var form_data = new FormData();
  form_data.append("avatar", avatar);

  await api.post("/chara/change-avatar/", form_data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
