import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ScrollView, View, Text, Image } from "react-native";

// Components
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
import { SwiperComponent } from "../components/Swiper";
import { MainEvent } from "../components/MainEvent";

// Other Imports
import { getAllPlans } from "../services/getAllPlans";
import { getUserPlans } from "../services/getUserPlans";
import { getFilteredPlans } from "../services/getFilteredPlans";
import { getUser } from "../services/getUser";
import { getPlan } from "../services/getPlan";

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { setSelectedPlan, setOrganizer } from "../state/selectedPlan";
import { setPlanHistory, setUser, setUserPlans } from "../state/user";
import { setPlans } from "../state/plans";

import { getOrganizer } from "../services/getOrganizer";
import refetchData from "../services/refetchData";
import { getPlanHistory } from "../services/getPlanHistory";

import noTienesPlanes from "../assets/noTienesPlanes.png";
import recomendaciones from "../assets/recomendaciones.png";
import misPlanes from "../assets/misPlanes.png";
import noPlanesCreados from "../assets/noPlanesCreados.png";
import planesPasados from "../assets/planesPasados.png";

export default function HomeScreen() {
  const user = useSelector((state) => state.user);
  const plans = useSelector((state) => state.plans);

  const { refetch } = refetchData();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = async (plan) => {
    try {
      const updatedPlan = await getPlan(plan._id);
      dispatch(setSelectedPlan(updatedPlan));
      const organizer = await getOrganizer(plan._id);
      dispatch(setOrganizer(organizer));
      navigation.navigate("PlanDetail");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser().then((userData) => {
      if (userData._id) {
        dispatch(setUser(userData));
        getUserPlans().then((userPlans) => dispatch(setUserPlans(userPlans)));
        getPlanHistory().then((planHistory) =>
          dispatch(setPlanHistory(planHistory))
        );
        if (userData.preferences && userData.preferences[0]) {
          getFilteredPlans().then((plans) => dispatch(setPlans(plans)));
        } else {
          getAllPlans().then((plans) => dispatch(setPlans(plans)));
        }
      } else {
        getAllPlans().then((plans) => dispatch(setPlans(plans)));
      }
    });
  }, [refetch]);

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar></Navbar>
      <ScrollView>
        {plans[0] && (
          <MainEvent
            plan={plans[0]}
            title="Patrocinado"
            onPress={handlePress}
          />
        )}
        <SwiperComponent
          plans={plans}
          onPress={handlePress}
          image={recomendaciones}
          styleLogo={styles.logoReco}
        />

        {user._id && (
          <View>
            {user.plans && user.plans[0] ? (
              <SwiperComponent
                plans={user.plans}
                image={misPlanes}
                onPress={handlePress}
                styleLogo={styles.logoMisP}
              />
            ) : (
              <View style={{ textAlign: "center" }}>
                <View style={styles.logoutContainer}>
                  <Image style={styles.logo} source={noTienesPlanes} />
                </View>
              </View>
            )}
            {user.history && user.history[0] ? (
              <SwiperComponent
                plans={user.history}
                onPress={handlePress}
                image={planesPasados}
                styleLogo={styles.logoMisPPasados}
              />
            ) : (
              <View style={{ textAlign: "center" }}>
                <View style={styles.logoutContainer}>
                  <Image style={styles.logoNoPlanes} source={noPlanesCreados} />
                </View>
              </View>
            )}
          </View>
        )}
        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>
    </LinearGradient>
  );
}
