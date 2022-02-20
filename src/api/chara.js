import api from "@/api";

export async function set_introduction(data) {
  await api.put("/chara/introduction/", data);
}
export async function set_config(data) {
  await api.put("/chara/config/", data);
}
export async function change_avatar(avatar) {
  var form_data = new FormData();
  form_data.append("avatar", avatar);

  await api.post("/chara/change-avatar/", form_data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}