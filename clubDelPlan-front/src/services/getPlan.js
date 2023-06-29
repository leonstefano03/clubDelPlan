import axios from "axios";
import { API_URL } from "./urls";

export async function getPlan(id) {
  try {
    const res = await axios.get(`${API_URL}/api/events/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
