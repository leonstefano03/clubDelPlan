// Native
import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { Linking } from 'react-native';
// import Mailer from 'react-native-mail';
// Components
import { GenericButton } from "../components/GenericButton";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import { ProfilePicture } from "../components/ProfilePicture";
import { ProfileText } from "../components/ProfileText";
import { styles } from "../styles/ProfileTextStyles";
import { addFriend } from "../services/addFriend";
import { removeFriend } from "../services/removeFriend";
import { getUserFriends } from "../services/getUserFriends";

export default function ContactInfoScreen() {
  const contact = useSelector((state) => state.selectedContact);
  const { _id, first_name, last_name, address, phone, username, email } =
    contact;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(true);

  const fullName = `${first_name}  ${last_name}`;
  const birthdate = contact?.birthdate?.split("-");
  const formattedBirthdate = `${birthdate[2]?.split("T")[0]} / ${
    birthdate[1]
  } / ${birthdate[0]}`;

  const isAlreadyFriend = async () => {
    const userFriends = await getUserFriends(user._id);
    setIsFriend(userFriends.some((friend) => friend._id === contact._id));
  };

  useEffect(() => {
    isAlreadyFriend();
  }, [user._id, contact]);

  const handleAddFriend = async (friendId) => {
    try {
      setLoading(true);
      await addFriend(friendId);
      setIsFriend(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      setLoading(true);
      await removeFriend(user._id, friendId);
      setLoading(false);
      setIsFriend(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        flex: 1,
      }}
    >
      <Navbar />
      <ScrollView style={{ marginTop: "15%" }}>
        <View style={styles.container}>
          <ProfilePicture imageSource={contact.profile_img} />
          <View style={{ marginTop: "5%" }}></View>
          <ProfileText style={styles.text} text={username} />
          <ProfileText style={styles.text} text={`Nombre: ${fullName}`} />
          {birthdate ? (
            <ProfileText
              style={styles.text}
              text={`Cumpleaños: ${formattedBirthdate}`}
            />
          ) : (
            ""
          )}
          {phone ? (
            <ProfileText style={styles.text} text={`Teléfono: ${phone}`} />
          ) : (
            ""
          )}
          {email ? (
            <ProfileText style={styles.text} text={`Email: ${email}`} />
          ) : (
            ""
          )}
          {address ? (
            <ProfileText style={styles.text} text={`Dirección: ${address}`} />
          ) : (
            ""
          )}
          <View style={{ alignItems: "center" }}>
            {!loading ? (
              <>
                {!isFriend ? (
                  <GenericButton
                    text={"Agregar amigo"}
                    onPress={() => handleAddFriend(_id)}
                    customStyle={{ marginTop: "4%" }}
                  />
                ) : (
                  <GenericButton
                    text={"Eliminar amigo"}
                    onPress={() => handleRemoveFriend(_id)}
                    customStyle={{ marginTop: "4%" }}
                  />
                )}
              </>
            ) : (
              <GenericButton
                text={"Cargando..."}
                customStyle={{ marginTop: "4%", backgroundColor: "#7D0166" }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
