import api from "@/api";

export async function get_team_join_requests() {
  var res = await api.get(`team/join-requests/`);
  return res.data;
}
export async function review_team_join_request({ id, action }) {
  await api.post(`team/join-requests/${id}/review/`, { action });
}
