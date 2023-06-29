import React from "react";
import { View, Image } from "react-native";
import { styles } from "../styles/profilePictureStyles";

export const ProfilePicture = ({ imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
    </View>
  );
};
