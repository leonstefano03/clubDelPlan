import { StyleSheet } from "react-native";

export const genericButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: "rgba(225, 200, 200, 0.3)",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(10, 7, 7, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",

  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
