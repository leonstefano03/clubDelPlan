import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    color: "white",
    backgroundColor: "rgba(225, 200, 200, 0.2)",
    maxWidth: "80%",
  },
  button: {
    marginBottom: 50,
    marginTop: 30,
  },
  badge: {
    backgroundColor: "rgba(25, 20, 20, 0.3)",
  },
  scroll: {
    flex: 1,
    width: "100%",
    paddingTop: "10%",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  logo:{
    width: 120,
    height: 35,
  },
  logoutContainer: {
    paddingTop: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    width: "65%",
    backgroundColor:'rgba(0, 0, 0, 0.4)',
  },
});
