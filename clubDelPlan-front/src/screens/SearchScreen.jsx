// React Components
import { Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState, useContext } from "react";
// Components
import { GenericInput } from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { API_URL } from "../services/urls";
import { styles } from "../appCss";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { setSelectedPlan, setOrganizer } from "../state/selectedPlan";
import { getPlan } from "../services/getPlan";
import { SearchImg } from "../components/searchImage";
import { getOrganizer } from "../services/getOrganizer";
import refetchData from "../services/refetchData";
import RadioButton from "../components/RadioButton";

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const options = [
    { label: "Texto", value: "text" },
    { label: "Categoría", value: "category" },
    { label: "Usuario", value: "user" },
  ];
  const [option, setOption] = useState(options[0].value);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { refetch } = refetchData();

  const handlePress = async (plan) => {
    const updatedPlan = await getPlan(plan._id);
    dispatch(setSelectedPlan(updatedPlan));
    const organizer = await getOrganizer(plan._id);
    dispatch(setOrganizer(organizer));
    navigation.navigate("PlanDetail");
  };

  const handleQueryChange = (text) => {
    setQuery(text);
  };

  const handleSearch = () => {
    if (option == "text") {
      axios
        .get(`${API_URL}/api/events/search?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (option == "category") {
      axios
        .get(`${API_URL}/api/events/search/category?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (option == "user") {
      axios
        .get(`${API_URL}/api/events/search/user?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refetch]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <View style={styles.searchContainer}>
          <GenericInput
            value={query}
            onSubmitEditing={handleSearch}
            onChangeText={handleQueryChange}
            placeholder="Buscar plan"
          />
        </View>
        <RadioButton
          style={{ flexDirection: "row", marginVertical: 10 }}
          options={options}
          onSelect={setOption}
          defaultValue={option}
        />
        <View style={styles.content}>
          <ScrollView style={{ width: "100%" }}>
            {results ? (
              results.map((item, index) => (
                <SearchImg key={index} plan={item} onPress={handlePress} />
              ))
            ) : (
              <Text>Cargando datos...</Text>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}
