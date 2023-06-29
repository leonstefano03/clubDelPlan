import axios from "axios";
import { API_URL } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function getHistory() {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${API_URL}/api/events/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return [];
  }
}
