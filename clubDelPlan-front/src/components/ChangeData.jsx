// Native
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./DatePicker";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
// Components
import { ProfileText } from "../components/ProfileText";
import { updateUser } from "../state/user";
import { API_URL } from "../services/urls";
import { updateSelectedPlan } from "../state/selectedPlan";

export const ChangeData = ({
  mode,
  data,
  baseData,
  propName,
  keyboardType,
  styles,
}) => {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState(baseData);
  const [change, setChange] = useState(false);
  const plan = useSelector((state) => state.selectedPlan);

  const handleChange = async (propName, newValue) => {
    if (change) {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          if (mode == "user") {
            await axios.put(
              `${API_URL}/api/users/`,
              {
                [propName]: newValue,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            dispatch(updateUser({ key: propName, value: newValue }));
          } else if (mode == "event") {
            await axios.put(
              `${API_URL}/api/events/${plan._id}`,
              {
                [propName]: newValue,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            dispatch(updateSelectedPlan({ key: propName, value: newValue }));
          }
        }
      } catch (error) {
        console.log(error.response.data);
        Alert.alert("Error", error.response.data);
      }
    }
    setChange(!change);
  };
  let date = mode == "user" ? "birthdate" : "event_date";
  const formattedData =
    propName === date ? moment(newData).format("DD/MM/YYYY") : newData;

  return (
    <>
      {!change ? (
        <View style={styles.container3}>
          <View style={styles.dataUserContainer}>
            <Text style={styles.textData}>{data}:</Text>
          </View>
          <ProfileText
            customStyle={styles.container3}
            customStyleText={styles.text3}
            text={formattedData}
          />
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={handleChange}
          >
            <EvilIcons name="pencil" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container3}>
          {keyboardType !== "date" ? (
            <View style={styles.containerChange}>
              <View style={styles.dataUserContainer2}>
                <Text style={styles.textData}>{data}:</Text>
              </View>

              <TextInput
                style={styles.text3}
                keyboardType={keyboardType}
                value={newData}
                onChangeText={setNewData}
              />
            </View>
          ) : (
            <DatePicker
              selectedDate={newData}
              onChange={(date) => setNewData(date.toISOString())}
            />
          )}
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={() => handleChange(propName, newData)}
          >
            <Feather name="check-square" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
