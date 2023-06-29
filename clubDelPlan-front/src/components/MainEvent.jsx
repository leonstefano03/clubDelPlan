import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles/mainEvent";
import { formatDate } from "../services/formatDate";

export const MainEvent = ({ plan, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(plan)}>
      <View>
        <Image source={{ uri: plan?.img }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text}>{plan?.title}</Text>
          <Text style={styles.subtitle}>
            {plan?.event_date && formatDate(plan?.event_date)}
          </Text>
          <Text style={styles.subtitle}>{plan?.category?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
