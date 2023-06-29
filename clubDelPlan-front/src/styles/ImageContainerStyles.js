import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: 250,
    height: 110,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: 250,
    justifyContent: "flex-end",
    backgroundColor: "#0004",
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 600,
    marginLeft: 7,
  },
  subtitle: {
    marginLeft: 7,
    color: "#FFF",
    fontSize: 16,
    fontWeight: 500,
  },
});
