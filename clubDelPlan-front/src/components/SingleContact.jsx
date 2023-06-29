import { Text, View } from "react-native";
import { styles } from "../styles/contactText";

export const SingleContact = ({ phone, username }) => {
  // return <Text>{`${first_name} ${last_name} ${phone}`}</Text>;
  return (
    <View style={styles.contactText}>
      <Text style={styles.usernameText}>{username}</Text>
      <Text style={styles.phoneText}>{phone}</Text>
    </View>
  );
};
