import api from "@/api";

export async function smith_upgrade(data) {
  await api.post("smith/upgrade/", data);
}

export async function smith_replace_ability(data) {
  await api.post("smith/replace-ability/", data);
}

export async function smith_replace_element_type(data) {
  await api.post("smith/replace-element-type/", data);
}
