import axios from "axios";
import { API_URL } from "./urls";

export async function getCategories() {
  try {
    const res = await axios.get(`${API_URL}/api/categories/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
