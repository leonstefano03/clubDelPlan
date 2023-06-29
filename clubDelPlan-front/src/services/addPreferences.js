import axios from "axios";
import { API_URL } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addPreferences(preferences) {
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const res = await axios.post(
        `${API_URL}/api/users/preferences/`,
        preferences,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.status;
    }
  } catch (error) {
    console.error(error);
  }
}
