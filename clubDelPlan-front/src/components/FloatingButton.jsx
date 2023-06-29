import { styles } from "../styles/floatingButtonStyles";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

export const FloatingButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => {
        navigation.navigate("AddContact");
      }}
    >
      <Octicons name="person-add" size={35} color="white" />
    </TouchableOpacity>
  );
};
