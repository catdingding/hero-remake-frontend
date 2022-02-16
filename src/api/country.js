import api from "@/api";

export async function review_country_join_request({ id, action }) {
  await api.post(`country/join-requests/${id}/review/`, { action });
}

export async function get_country_join_requests() {
  let res = await api.get(`country/join-requests/`);
  return res.data;
}
