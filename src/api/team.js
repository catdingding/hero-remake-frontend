import api from "@/api";

export async function get_team_join_requests() {
  var res = await api.get(`team/join-requests/`);
  return res.data;
}
export async function review_team_join_request({ id, action }) {
  await api.post(`team/join-requests/${id}/review/`, { action });
}
export async function get_team_dungeons() {
  var res = await api.get(`team/dungeons/`);
  return res.data;
}
export async function start_team_dungeon(dungeon, data) {
  await api.post(`team/dungeons/${dungeon}/start/`, data);
}
export async function recover_team_dungeon(dungeon) {
  await api.post(`team/dungeons/${dungeon}/recover/`);
}
export async function terminate_team_dungeon(dungeon) {
  let res = await api.post(`team/dungeons/${dungeon}/terminate/`);
  return res.data;
}
