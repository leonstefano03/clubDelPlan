import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/preferencesStyles";
import { Navbar } from "../components/Navbar";
import MultipleDropdown from "../components/MultipleDropdown";
import { GenericButton } from "../components/GenericButton";
import { getCategories } from "../services/getCategories";
import { addPreferences } from "../services/addPreferences";
import { useNavigation } from "@react-navigation/core";
import refetchData from "../services/refetchData";
import actualizar from'../assets/actualizar.png'
import { updateUser } from "../services/updateUser";

export default function PreferencesScreen() {
  const [selected, setSelected] = useState("");
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();
  const { refetch, triggerRefetch } = refetchData();

  useEffect(() => {
    getCategories().then((data) =>
      setCategories(
        data.map((item, index) => ({ key: index, value: item.name }))
      )
    );
  }, [refetch]);

  const handleSubmit = async () => {
    const status = await addPreferences(selected);
    if (status == 200) {
      triggerRefetch();
      updateUser({ new_user: false });
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <ScrollView style={styles.scroll}>
        <Text style={styles.subtitle}>
          Mostraremos eventos que sean acordes a tus preferencias
        </Text>
        <View style={styles.container}>
          <MultipleDropdown
            setSelected={(val) => setSelected(val)}
            data={categories}
            save="value"
            onSelect={() => {}}
            label="Preferencias"
            placeholder="Preferencias"
            search={false}
            textStyles={styles.text}
            boxStyles={styles.inputContainer}
            dropdownStyles={styles.inputContainer}
            badgeStyles={styles.badge}
          />
        

<View style={styles.logoutContainer}>
           <TouchableOpacity onPress={handleSubmit}>
             <Image style={styles.logo} source={actualizar} />
           </TouchableOpacity>
         </View>
         
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
