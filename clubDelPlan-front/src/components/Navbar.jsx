import { View, Image } from "react-native";
import logo from "../assets/logo.png";
import { styles } from "../styles/navbarStyles";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}source={logo} />
      <View style={styles.bottom}></View>
    </View>
  );
};
