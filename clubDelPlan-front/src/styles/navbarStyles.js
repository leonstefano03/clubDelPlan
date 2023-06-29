import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,

    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: windowWidth,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: { width: 160, height: 75 },
});
