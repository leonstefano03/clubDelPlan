// Native
import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
// Components
import { formatDate } from "../services/formatDate";
import styles from "../styles/ImageContainerStyles";

export const ImageContainer = ({ plan, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(plan)}>
      <Image source={{ uri: plan?.img }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{plan?.title}</Text>
        <Text style={styles.subtitle}>
          {plan?.event_date && formatDate(plan?.event_date)}
        </Text>
        <Text style={styles.subtitle}>{plan?.category?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
