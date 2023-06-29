import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: 'space-evenly',
    color: "white",
  
  },
  row: {
 
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center', 
  },

  cubo: {
    height: 120,
    width: 120,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
