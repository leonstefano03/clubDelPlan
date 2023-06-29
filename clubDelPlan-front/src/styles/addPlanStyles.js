import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 110,
  },
  date: {
    paddingTop: "5%",
    paddingBottom: "5%",
    width: "50%",
    textAlign: "center",
    marginBottom: 4,
  },
  container2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
  },
  categoryContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(225, 200, 200, 0.3)",
    borderColor: "rgba(10, 7, 7, 0.2)",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    marginTop: "20%",
  },
  crearPlan: {
    alignItems: "center",
    flex: 1,
    width: "65%",
    marginTop: "5%",
  },
  label: {
    paddingTop: "15%",
    marginBottom: 4,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input2: {
    width: "65%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 45,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  text: {
    paddingTop: "5%",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  logo: {
    width: 140,
    height: 30,
  },
  logoutContainer: {
    paddingTop: 10,
    paddingBottom:10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    width: "60%",
    backgroundColor:'rgba(0, 0, 0, 0.4)',
  
  },
  logout1Container: {
    marginTop:"5%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
