import axios from "axios";
import { API_URL } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function updateUser(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.put(`${API_URL}/api/users/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
