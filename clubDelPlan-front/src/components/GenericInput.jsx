import { TextInput } from "react-native";
import { styles } from "../styles/genericInputStyles";
import React from "react";

export const GenericInput = ({ customStyle, ...props }) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, customStyle, { flexDirection: "row" }]}
      placeholderTextColor="#999"
    />
  );
};
