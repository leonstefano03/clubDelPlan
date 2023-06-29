import { useEffect, useState } from "react";
import { styles } from "../styles/loginScreenStyles";
import { createNewUser } from "../services/createUser";
import { GenericButton } from "./GenericButton";
import { getUserPlans } from "../services/getUserPlans";
import { getUser } from "../services/getUser";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser, setUserPlans } from "../state/user";
import { API_URL, expoClientId, iosClientId, androidClientId } from "@env";
import iniciarConGoogle from "../assets/iniciarConGoogle.png";

import * as ReactNative from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //Google
  const [isUserInfoFetched, setIsUserInfoFetched] = useState(false);
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoClientId,
    androidClientId: androidClientId,
    iosClientId: iosClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      if (!isUserInfoFetched) {
        getUserInfo();
      }
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();

      const checkExistingUsers = await axios.post(
        `${API_URL}/api/users/find-email`,
        {
          email: user.email,
        }
      );

      if (!checkExistingUsers?.data) {
        await handleSignup(user);
        await handleLogin(user.name, "Prueba1234");
      } else {
        await handleLogin(user.name, "Prueba1234");
      }
      setIsUserInfoFetched(true);
    } catch (error) {
      console.warn("handle login error: " + error);
    }
  };

  const handleSignup = async (user) => {
    try {
      const { email, given_name, family_name, picture, name } = user;
      // const userPassword = token.toUpperCase().substring(0, 9);
      const userData = {
        username: name,
        password: "Prueba1234",
        email: email,
        first_name: given_name,
        last_name: family_name,
        profile_img: picture,
      };

      await createNewUser(userData);
    } catch (error) {
      console.log("Error al hacer la petición:", error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const jwtToken = await axios.post(`${API_URL}/api/users/login`, {
        username: username,
        password: password,
      });
      if (jwtToken.data.token) {
        await AsyncStorage.setItem("token", jwtToken.data.token);
        await axios.get(`${API_URL}/api/users/secret`, {
          headers: {
            Authorization: `Bearer ${jwtToken.data.token}`,
          },
        });
        const userData = await getUser();
        dispatch(setUser(userData));
        const userPlans = await getUserPlans();
        dispatch(setUserPlans(userPlans));
        navigation.navigate(userData.new_user ? "Preferences" : "HomeScreen");
      }
    } catch (error) {
      console.log("handle login error", error);
    }
  };

  const onPressButton = async () => {
    try {
      await promptAsync();
      await getUserInfo();
    } catch (error) {
      console.log("fallo onPress", error);
    }
  };
  return (
    <ReactNative.SafeAreaView style={{width:'100%', alignItems: "center",}}>
     
        <ReactNative.View style={styles.googleContainer}>
          <ReactNative.TouchableOpacity

            disabled={!request}
            onPress={onPressButton}
          >
            <ReactNative.Image
              style={styles.logoGoogle}
              source={iniciarConGoogle}
            />
          </ReactNative.TouchableOpacity>
        </ReactNative.View>
     
    </ReactNative.SafeAreaView>
  );
};

export default GoogleSignInButton;
