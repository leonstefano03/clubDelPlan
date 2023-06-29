import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { FloatingButton } from "../components/FloatingButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/stylesContact";
import { AntDesign } from "@expo/vector-icons";
import { Navbar } from "../components/Navbar";
import { setSelectedContact } from "../state/selectedContact";
import { SingleContact } from "../components/SingleContact";
import { GenericButton } from "../components/GenericButton";
import iniciaSesion from '../assets/iniciaSesion.png'
import { getUserFriends } from "../services/getUserFriends";
import { setContacts } from "../state/contacts";
import amigos from '../assets/amigos.png'

export default function ContactsScreen() {
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.selectedContact);
  const user = useSelector((state) => state.user);
  const contacts = useSelector((state) => state.contacts);

  const fetchFriends = async () => {
    try {
      const friends = await getUserFriends();
      dispatch(setContacts(friends));
      setFilteredContacts(friends);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetch = async () => {
    try {
      await fetchFriends();
    } catch (error) {
      console.log("fetch friends error", error);
    }
  };

  useEffect(() => {
    try {
      handleFetch();
    } catch (error) {
      console.log("user effect error", error);
    }
  }, [user]);

  const handleQueryChange = (text) => {
    setQuery(text);
    filterContacts(text);
  };

  const filterContacts = (text) => {
    const filtered = contacts?.filter(
      (contact) =>
        contact.username &&
        contact.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate("ContactInfoScreen");
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.containerr}
    >
      <Navbar />
      {user?.username ? (
        <View style={styles.container}>
          <View style={styles.container3}>
            <GenericInput
              value={query}
              onChangeText={handleQueryChange}
              placeholder={"Buscar"}
              customStyle={styles.input}
            />
            <TouchableOpacity onPress={fetchFriends}>
              <AntDesign
                name="reload1"
                size={30}
                color="white"
                style={styles.reload}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.logoCont}>
          <Image style={styles.logo1} source={amigos}/>
          </View>
          <ScrollView>
            <View>
              {filteredContacts?.map((contact, i) => (
                <Text
                  style={styles.text2}
                  key={i}
                  onPress={() => handleContactPress(contact)}
                >
                  <SingleContact {...contact} />
                </Text>
              ))}
            </View>
          </ScrollView>
          <FloatingButton />
        </View>
      ) : (
        <View style={[styles.container, { flex: 1, justifyContent: "center" }]}>
          <Text style={styles.loginText}>
            Para ver contactos, inicie sesión
          </Text>
          <View style={{ flex: 1, alignItems: "center", marginTop: "5%" }}>
          
<View style={styles.logoutContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Image style={styles.logo} source={iniciaSesion} />
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      )}
    </LinearGradient>
  );
}
