import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, Image, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserPlans } from "../services/getUserPlans";
import { styles } from "../styles/PlanDetails";
import { useSelector, useDispatch } from "react-redux";
import { setUserPlans } from "../state/user";
import axios from "axios";
import { API_URL } from "../services/urls";
import Comments from "./Comments";
import Rating from "./Rating";
import { GenericButton } from "./GenericButton";
import MultipleDropdown from "./MultipleDropdown";
import { useNavigation } from "@react-navigation/core";
import refetchData from "../services/refetchData";
import RadioButton from "./RadioButton";
import { Entypo } from "@expo/vector-icons";
import { getUserFriends } from "../services/getUserFriends";
import fecha from'../assets/fecha.png'
import descripcion from '../assets/descripcion.png'
import organizador from '../assets/organizador.png'

export const PlanDetailCard = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.selectedPlan);
  const user = useSelector((state) => state.user);
  const screenHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [invited, setInvited] = useState([]);
  const navigation = useNavigation();
  const [canEdit, setCanEdit] = useState(false);
  const { triggerRefetch } = refetchData();

  const sendMethods = [
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "phone" },
  ];

  const [sendMethod, setSendMethod] = useState(sendMethods[0].value);

  const fetchInfo = async () => {
    try {
      let users = await getUserFriends();
      users = users.map((item) => ({
        username: item.username,
        email: item.email,
        phone: item.phone,
      }));
      setUsers(users);

      let friends = users.filter((item) => item.email);
      friends = friends.map((item) => ({
        label: item.username,
        value: item.email,
      }));
      setFriends(friends);

      const token = await AsyncStorage.getItem("token");
      if (token) {
        res = await axios.get(`${API_URL}/api/events/${plan._id}/can-update`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCanEdit(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleChange = (method) => {
    try {
      let friends = users.filter((item) => item[method]);
      friends = friends.map((item) => ({
        label: item.username,
        value: item[method],
      }));
      setSendMethod(method);
      setFriends(friends);
    } catch (error) {
      console.log(error);
    }
  };
  const formattingDate = plan?.event_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const handleInvite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/api/users/invite`,
          {
            users: invited,
            plan,
            method: sendMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("OK", "Invitaciones enviadas");
      } else {
        Alert.alert("Error", "Error de autenticación");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar invitaciones");
    }
  };

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await axios.post(
          `${API_URL}/api/events/enroll`,
          { eventId: plan._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newPlans = await getUserPlans();
        dispatch(setUserPlans(newPlans));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleStopParticipating = async (id) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`${API_URL}/api/events/stop-participating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newPlans = await getUserPlans();
      dispatch(setUserPlans(newPlans));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios.delete(`${API_URL}/api/events/${plan._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        triggerRefetch();
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ minHeight: screenHeight }}>
        <View style={styles.card}>
          <Text style={styles.title}>{plan?.title}</Text>
          <Image
            source={{ uri: plan?.img }}
            style={{
              width: "100%",
              height: 200,
            }}
          />
          <View style={styles.detailsContainer}>
           

            <View>
              {plan.ended ? (
                <View>
                  <Text style={styles.subtitle}>
                    El evento finalizó el {formattingDate}
                  </Text>

                  {user._id &&
                    user.history &&
                    user.history.some((item) => item._id == plan._id) &&
                    plan.organizer &&
                    plan.ended && <Rating plan={plan} />}
                </View>
              ) : (
                <View>
                  {user._id && (
                    <View style={styles.buttonContainer}>
                      {!user.plans?.some(
                        (userPlan) => userPlan._id === plan._id
                      ) ? (
                        <>
                          {!loading ? (
                            <GenericButton
                              text={"+"}
                              onPress={handleEnroll}
                              customStyle={styles.btn}
                            />
                          ) : (
                            <GenericButton
                              text={"..."}
                              customStyle={styles.btn}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {!loading ? (
                            <GenericButton
                              text={"x"}
                              customStyle={styles.btn}
                              onPress={() => handleStopParticipating(plan._id)}
                            />
                          ) : (
                            <GenericButton
                              text={"..."}
                              customStyle={styles.btn}
                            />
                          )}
                        </>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
           
            <View style={styles.pContainer}>
              <Text style={styles.p}>
                {plan?.organizer?.rating?.toFixed(2)}/5.00{" "}
                <Entypo name="star" size={20} color={"#fdd835"} />
              </Text>
            </View>
 <View style={styles.date}>
              
              <Image style={styles.logo} source={fecha} />
              <Text style={styles.text2}>{formattingDate}</Text>
            </View>
           
            <View style={styles.orgCont}>
             <Image style={styles.logo5} source={organizador} /> 
             
             </View>
             <Text style={styles.text6}>{plan?.organizer?.username}</Text>
            <Image style={styles.logo3} source={descripcion} />
            <Text style={styles.text3}>{plan.description}</Text>
            {user._id && <Comments />}
            {canEdit && user._id ? (
              <View>
                <View style={styles.input}>
                  <GenericButton
                    text={"Editar evento"}
                    onPress={() => {
                      navigation.navigate("EditPlan");
                    }}
                  />
                </View>
                <View style={styles.input}>
                  <GenericButton
                    text={"Borrar evento"}
                    onPress={handleDelete}
                  />
                </View>
              </View>
            ) : (
              <>
                <View style={styles.input}>
                  <MultipleDropdown
                    setSelected={(val) => setInvited(val)}
                    data={friends}
                    save="value"
                    onSelect={() => {}}
                    label="Invitar personas"
                    placeholder="Invitar personas"
                    search={false}
                    textStyles={styles.item}
                    boxStyles={styles.dropdown}
                    dropdownStyles={styles.dropdown}
                    badgeStyles={styles.item}
                  />
                  <RadioButton
                    options={sendMethods}
                    onSelect={handleChange}
                    defaultValue={sendMethod}
                  />
                </View>
                {invited && invited[0] && (
                  <GenericButton
                    text={"Invitar"}
                    customStyle={{ marginHorizontal: 50 }}
                    onPress={handleInvite}
                  />
                )}
              </>
            )}
            <View style={{ marginBottom: 10 }}></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
