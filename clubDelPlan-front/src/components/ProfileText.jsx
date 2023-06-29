import { styles } from "../styles/ProfileTextStyles";
import { View, Text } from "react-native";
import React from "react";

export const ProfileText = ({ text, customStyle, customStyleText,}) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={[styles.text, customStyleText]}>{text}</Text>
    </View>
  );
};
