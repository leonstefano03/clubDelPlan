import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  contactText: {
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  usernameText: {
    color: "#fff",
    position: "absolute",
    left: "5%",
    fontWeight: "bold",
    fontSize: 18,
  },
  phoneText: {
    color: "#fff",
    position: "absolute",
    left: "70%",
    right: "5%",
    fontWeight: "bold",
    fontSize: 15,
  },
});
