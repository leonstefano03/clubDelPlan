// Native
import { View, Text, ScrollView, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import axios from "axios";
//Components
import { GenericInput } from "../components/GenericInput";
import { GenericButton } from "../components/GenericButton";
import { Navbar } from "../components/Navbar";
import { API_URL } from "../services/urls";
import { styles } from "../styles/registerScreenStyles";
import { DatePicker } from "../components/DatePicker";
import { useSelector } from "react-redux";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [address, setAddress] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const user = useSelector((state) => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    setBirthdate(birthdate);
  }, [birthdate]);

  const handleSubmit = async () => {
    let formattedBirthdate = null;
    if (birthdate instanceof Date) {
      formattedBirthdate = birthdate.toISOString();
    }
    try {
      const res = await axios.post(`${API_URL}/api/users/signup`, {
        username,
        password,
        email,
        phone,
        birthdate: formattedBirthdate,
        first_name,
        last_name,
        address,
      });
      Alert.alert("Hecho", res.data.message, [{ text: "OK" }]);
      navigation.navigate("Login");
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setBirthdate("");
      setAddress("");
      setFirst_name("");
      setLast_name("");
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
          <GenericInput value={user?.username} onChangeText={setUsername} />

          <View style={styles.container2}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                value={user?.first_name}
                style={styles.input2}
                onChangeText={setFirst_name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}> Apellido</Text>
              <TextInput
                value={user?.last_name}
                onChangeText={setLast_name}
                style={styles.input2}
              />
            </View>
          </View>

          <Text style={styles.text}>Contraseña</Text>
          <GenericInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Text style={styles.text}>Email</Text>
          <GenericInput
            value={user?.email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.text}>Fecha de nacimiento</Text>
          <DatePicker
            type="date"
            value={birthdate}
            onChange={(date) => setBirthdate(new Date(date))}
            placeholder="DD/MM/YYYY"
            customStyle={styles.birthdate}
          />

          <Text style={styles.text}>Direccion</Text>
          <GenericInput value={user?.address} onChangeText={setAddress} />
          <Text style={styles.text}>Numero de telefono</Text>
          <GenericInput value={user?.phone} onChangeText={setPhone} />

          <View style={styles.container2}>
            <View style={styles.crearCuenta}>
              <GenericButton onPress={handleSubmit} text={"Actualizar Datos"} />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
