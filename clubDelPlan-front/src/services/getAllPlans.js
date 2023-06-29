import axios from "axios";
import { API_URL } from "./urls";

export async function getAllPlans() {
  try {
    const res = await axios.get(`${API_URL}/api/events`);

    return res.data;
  } catch (error) {
    return [];
  }
}
