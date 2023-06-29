//Native
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { getUser } from "../services/getUser";
import { getUserPlans } from "../services/getUserPlans";
// Components
import GoogleSignInButton from "../components/GoogleSignInButton";
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/loginScreenStyles";
import { setPlanHistory, setUser, setUserPlans } from "../state/user";
import { API_URL } from "../services/urls";
import refetchData from "../services/refetchData";
import { Navbar } from "../components/Navbar";
import { getPlanHistory } from "../services/getPlanHistory";
import iniciaSesion from '../assets/iniciaSesion.png'
import { Image } from "react-native";
export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        username,
        password,
      });
      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        await axios.get(`${API_URL}/api/users/secret`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });
        const userData = await getUser();
        dispatch(setUser(userData));
        const userPlans = await getUserPlans();
        dispatch(setUserPlans(userPlans));

        const planHistory = await getPlanHistory();
        dispatch(setPlanHistory(planHistory));

        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      Alert.alert("Error", error.response.data, [{ text: "OK" }]);
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
        <View style={styles.container}>
          <Text style={styles.text}>Nombre de Usuario</Text>
          <GenericInput value={username} onChangeText={setUsername} />
          <Text style={styles.text}>Contraseña</Text>
          <GenericInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.inputContainer}>
         
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={handleLogin}>
                <Image style={styles.logo} source={iniciaSesion} />
              </TouchableOpacity>
            </View>
            

            <Text style={styles.text} onPress={handleSignup}>
              ¿No tienes cuenta? Crea una
            </Text>

          <GoogleSignInButton />
          
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
