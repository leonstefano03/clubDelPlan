import axios from "axios";
import { API_URL } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addFriend(friendId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/api/users/add-friend`,
      { friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
