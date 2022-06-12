import api from "@/api";
import store from "@/store";

export async function getAdventures() {
  let res = await api.get(`/adventure/adventures/`);
  return res.data;
}

export async function getAdventure(id) {
  let res = await api.get(`/adventure/adventures/${id}/`);
  return res.data;
}

export async function startAdventure(id) {
  let res = await api.post(`/adventure/adventures/${id}/start/`);
  return res.data;
}
export async function terminateAdventure(id) {
  let res = await api.post(`/adventure/adventures/${id}/terminate/`);
  return res.data;
}
export async function processBattle(id) {
  let res = await api.post(`/adventure/adventures/${id}/process-battle/`);
  store.commit("battle/set_battle_result_dialog_visible", true);
  store.commit("battle/set_battle_result", res.data);
  return res.data;
}
export async function processEvent(id) {
  let res = await api.post(`/adventure/adventures/${id}/process-event/`);
  return res.data;
}
export async function processScene(id) {
  let res = await api.post(`/adventure/adventures/${id}/process-scene/`);
  return res.data;
}
