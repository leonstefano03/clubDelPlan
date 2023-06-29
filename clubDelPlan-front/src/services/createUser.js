import axios from "axios";
import { API_URL } from "./urls";

export async function createNewUser(user) {
  try {
    const res = await axios.post(`${API_URL}/api/users/signup`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}
