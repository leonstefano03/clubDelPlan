import React from "react";
import axios from "axios";
import { API_URL } from "../services/urls";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
// Components
import { ProfilePicture } from "../components/ProfilePicture";
import { GenericButton } from "../components/GenericButton";
import { styles } from "../styles/profileScreenStyles";
import { clearUser, updateUser } from "../state/user";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import cerrarSesion from "../assets/cerrarSesion.png";
import preferencias from "../assets/preferencias.png";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    axios.post(`${API_URL}/api/users/logout`);
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handlePreferences = () => {
    navigation.navigate("Preferences");
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const path = result?.assets[0]?.uri;
      if (token && path) {
        if (path !== "") {
          const formData = new FormData();
          formData.append("image", {
            uri: path,
            name: "image.jpg",
            type: "image/jpeg",
          });
          const response = await axios.post(`${API_URL}/api/upload`, formData);
          await axios.put(
            `${API_URL}/api/users/`,
            {
              profile_img: response.data.imageUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(
            updateUser({ key: "profile_img", value: response.data.imageUrl })
          );
          Alert.alert("Hecho", "Imagen de perfil actualizada correctamente");
        }
      }
    } catch (error) {
      console.log(error.response.data);
      Alert.alert("Error", "Error al actualizar la imagen de perfil");
      console.log(error);
    }
  };
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      {user._id ? (
        <View style={styles.container}>
          <Navbar />
          <ScrollView>
            <View style={styles.imageContainer}>
              {user.profile_img ? (
                <TouchableOpacity onPress={selectImage}>
                  <ProfilePicture imageSource={user.profile_img} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={selectImage}>
                  <Text style={styles.buttonText}>Seleccionar imagen</Text>
                </TouchableOpacity>
              )}
            </View>
            <ChangeData
              keyboardType="default"
              baseData={user?.username}
              propName={"username"}
              data={"Usuario"}
              mode={"user"}
              styles={styles}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.first_name}
              propName={"first_name"}
              data={"Nombre"}
              mode={"user"}
              styles={styles}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.last_name}
              propName={"last_name"}
              data={"Apellido"}
              mode={"user"}
              styles={styles}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.address}
              propName={"address"}
              data={"Direccion"}
              mode={"user"}
              styles={styles}
            />
            <ChangeData
              keyboardType="email-address"
              baseData={user?.email}
              propName={"email"}
              data={"Email"}
              mode={"user"}
              styles={styles}
            />
            <ChangeData
              keyboardType="numeric"
              baseData={user?.phone}
              propName={"phone"}
              data={"Telefono"}
              mode={"user"}
              styles={styles}
            />
            <ChangeData
              keyboardType="date"
              baseData={user?.birthdate}
              propName={"birthdate"}
              data={"Nacimiento"}
              mode={"user"}
              styles={styles}
            />
           
            <View style={styles.logout1Container}>
            <View style={styles.preferenciasContainer}>
              <TouchableOpacity onPress={handlePreferences}>
                <Image style={styles.logoPref} source={preferencias} />
              </TouchableOpacity>
             
            </View>
            </View>

            <View style={styles.logout1Container}>
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={cerrarSesion} />
              </TouchableOpacity>
             
            </View>
            </View>
          </ScrollView>
        </View>
         
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}
