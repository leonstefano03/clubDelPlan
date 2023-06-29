import React, { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import { rateEvent } from "../services/rateEvent";
import { View, Text, Alert } from "react-native";
import { styles } from "../styles/PlanDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../services/urls";

const Rating = ({ plan }) => {
  const [rating, setRating] = useState(-1);

  const fetchRating = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await axios.get(
          `${API_URL}/api/events/${plan._id}/rating`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRating(res.data.rating);
        return res.data.rating;
      } else {
        return -1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const handleRating = async (e) => {
    const userRating = await fetchRating();
    if (userRating === -1) {
      const data = await rateEvent(e, plan._id);
      const newRating = await fetchRating();
      setRating(newRating);
      Alert.alert("Exito", data.message);
    }
  };

  return (
    <View style={styles.input}>
      <Text style={styles.text}>Tu calificación:</Text>
      <Text style={styles.text}>
        {rating === -1 ? (
          <StarRating rating={rating} onChange={handleRating} />
        ) : (
          <StarRating rating={rating} onChange={handleRating} color="#A9A9A9" />
        )}
      </Text>
    </View>
  );
};

export default Rating;
