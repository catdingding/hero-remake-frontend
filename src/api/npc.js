import api from "@/api";

export async function get_npcs() {
  let res = await api.get(`/npc/npcs/`);
  return res.data;
}
export async function get_npc_profile(npc_id) {
  let res = await api.get(`/npc/npcs/${npc_id}/profile/`);
  return res.data;
}
export async function submit_favorite({ favorite, number, npc_id }) {
  let res = await api.post(`/npc/submit-favorite/`, { favorite, number });
  return res.data;
}
export async function exchange({ exchange_option, number, npc_id }) {
  let res = await api.post(`/npc/exchange/`, { exchange_option, number });
  return res.data;
}
export async function fight_npc(npc_id) {
  let res = await api.post(`/npc/npcs/${npc_id}/fight/`);
  return res.data;
}
