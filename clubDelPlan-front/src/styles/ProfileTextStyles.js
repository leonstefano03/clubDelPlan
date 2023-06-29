import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderStyle: "solid",
    width: windowWidth,
    justifyContent: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    textAlign: "center",
  },
});
