// Native
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
// Components
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { API_URL } from "../services/urls";
import ChevronImg from "../assets/images/chevron.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../services/getCategories";
import ModalSelector from "react-native-modal-selector";
import { Feather } from "@expo/vector-icons";

export default function AddPlanScreen2({ route }) {
  const { title, description, location, event_date, path } = route.params;

  const [min_age, setMin_age] = useState("");
  const [max_age, setMax_age] = useState("");
  const [min_to_pay, setMin_to_pay] = useState("");
  const [total_to_pay, setTotal_to_pay] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [category, setCategory] = useState("Categoría");
  const [categories, setCategories] = useState([]);
  const [link_to_pay, setLink_to_pay] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(
        data.map((item, index) => ({ key: index, label: item.name }))
      );
    });
  }, []);

  const handleSubmit = async () => {
    try {
      let formattedDate = event_date;
      if (formattedDate instanceof Date) {
        formattedDate = formattedDate.toISOString().split("T")[0];
      }
      const token = await AsyncStorage.getItem("token");
      if (token) {
        let imageUrl;

        if (path !== "") {
          const formData = new FormData();
          formData.append("image", {
            uri: path,
            type: "image/jpeg",
            name: "image.jpg",
          });
          const res = await axios.post(`${API_URL}/api/upload`, formData);
          imageUrl = res.data.imageUrl;
        }

        await axios.post(
          `${API_URL}/api/events/`,
          {
            title,
            description,
            location,
            img: imageUrl,
            event_date: formattedDate,
            start_time,
            end_time,
            min_age,
            max_age,
            min_to_pay,
            total_to_pay,
            category,
            link_to_pay,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Exito", "Evento agregado");
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Error", "Ingresá sesión para publicar un evento");
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("Error", error.response.data);
      } else {
        Alert.alert("Error", "Error de red");
      }
    }
  };

  const handleBack = () => {
    navigation.navigate("AddPlanScreen1");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            left: "-20%",
            marginTop: "5%",
            marginBottom: "5%",
          }}
          onPress={handleBack}
        >
          <Feather
            name="arrow-left"
            size={30}
            color="white"
            style={{ marginLeft: "5%" }}
          />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Minima Edad</Text>
                <GenericInput
                  value={min_age}
                  onChangeText={setMin_age}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Maxima Edad</Text>
                <GenericInput
                  value={max_age}
                  onChangeText={setMax_age}
                  style={styles.input2}
                />
              </View>
            </View>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pago Minimo</Text>
                <GenericInput
                  value={min_to_pay}
                  onChangeText={setMin_to_pay}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pago Total</Text>
                <GenericInput
                  value={total_to_pay}
                  onChangeText={setTotal_to_pay}
                  style={styles.input2}
                />
              </View>
            </View>

            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de Inicio</Text>
                <GenericInput
                  value={start_time}
                  onChangeText={setStart_time}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de Cierre</Text>
                <GenericInput
                  value={end_time}
                  onChangeText={setEnd_time}
                  style={styles.input2}
                />
              </View>
            </View>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <ModalSelector
                  data={categories}
                  onChange={(option) => {
                    setCategory(option.label);
                  }}
                  overlayStyle={{ backgroundColor: "transparent" }}
                  optionContainerStyle={{
                    backgroundColor: "#691359",
                    borderWidth: 8,
                    borderRadius: 4,
                    borderColor: "#59104c",
                  }}
                  optionTextStyle={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                  cancelStyle={{
                    backgroundColor: "#781365",
                  }}
                  cancelTextStyle={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                  cancelText="Cancelar"
                >
                  <Text style={styles.categoryContainer} value={category}>
                    {category}
                    <Image
                      source={ChevronImg}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  </Text>
                </ModalSelector>
              </View>
            </View>
            <Text style={styles.text}>Link para pagar</Text>
            <GenericInput value={link_to_pay} onChangeText={setLink_to_pay} />
            <View style={styles.crearPlan}>
              <GenericButton onPress={handleSubmit} text={"Crear Plan"} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
