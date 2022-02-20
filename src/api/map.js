import api from "@/api";

export async function get_map({ x, y }) {
  let res = await api.get(`/map/?x=${x}&y=${y}&radius=3`);
  return res.data;
}
