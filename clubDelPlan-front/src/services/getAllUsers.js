import { API_URL } from "./urls";
import axios from "axios";

export async function getAllUsers() {
  const allUsers = await axios.get(`${API_URL}/api/users`);
  return allUsers.data;
}
