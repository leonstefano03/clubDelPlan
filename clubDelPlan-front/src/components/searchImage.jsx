// Native
import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
// Components
import { formatDate } from "../services/formatDate";
import styles from "../styles/searchImageStyle";

export const SearchImg = ({ plan, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(plan)}>
      <Image source={{ uri: plan?.img }} style={styles.image} />

      <Text style={styles.text}>{plan?.title}</Text>
      <Text style={styles.textFecha}>
        {plan?.event_date && formatDate(plan?.event_date)}
      </Text>
    </TouchableOpacity>
  );
};
