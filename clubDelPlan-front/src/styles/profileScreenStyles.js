import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  container2: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    // flex: 1,
  },
  containerChange: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderStyle: "solid",
    width: windowWidth,
  },
  container3: {
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dataUserContainer: {
    position: "absolute",
    left: "0.01%",
    bottom: "35%",
  },
  dataUserContainer2: {
    position: "absolute",
    left: "0.01%",
    bottom: "65%",
  },
  pencilIconContainer: {
    position: "absolute",
    left: "90%",
    bottom: "25%",
  },

  text3: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 20,
    textAlign: "center",
  },

  textData: {
    color: "#FFF",
    fontSize: 13,

    marginLeft: 20,
    textAlign: "center",
  },

  label: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 4,
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  input2: {
    paddingLeft: 10,
    fontSize: 16,
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 45,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 18,
    color: "white",
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  logout: {
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 155,
    height: 43,
  },
  logoutContainer: {
    paddingTop: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    width: "75%",
    backgroundColor:'rgba(0, 0, 0, 0.4)',
  
  },
  logoPref: {
    width: 140,
    height: 35,
  },
  preferenciasContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom:10,
    borderRadius:25,
    alignItems: "center",
    marginTop: 10,
    width: "75%",
    backgroundColor:'rgba(0, 0, 0, 0.4)',
  },
  logout1Container: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  prefContainer: {
    paddingTop: 20,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#7D0166",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    borderWidth: 1,
    borderColor: "white",
    color: "#fff",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  selectedImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});
