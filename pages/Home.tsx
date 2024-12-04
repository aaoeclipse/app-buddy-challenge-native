import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import colors from "../colors";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native/Libraries/Alert/Alert";
import { jwtDecode } from "jwt-decode";
import { getLatestChallenge } from "../utils/apiCalls";
import MainCard from "../components/MainCard";
import { useAuth } from "../AuthContext";
import ProfileBar from "../components/ProfileBar";

const statusBarHeight = Constants.statusBarHeight;

export default function Home({ navigation }: { navigation: any }) {
  // const { signOut } = useAuth();
  // signOut();
  const [token, setToken] = useState("");
  const [challenges, setChallenges] = useState<Challenge | null>(null);
  const [email, setEmail] = useState("");
  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      const decoded = decodeToken(token || "");
      // @ts-ignore
      setEmail(decoded?.email || "");
      setToken(token || "");
      getChallenges(token || "");
    };

    const getChallenges = async (token: string) => {
      const challenges = await getLatestChallenge(token);
      if (!challenges) return;
      setChallenges(challenges);
    };

    fetchToken();
  }, []);

  const getToken = async () => {
    try {
      const credentials = await SecureStore.getItem("token");
      if (credentials) {
        return credentials;
      } else {
        console.log("No token stored");
        Alert.alert("No token", "please log in");
        navigation.navigate("Login");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ProfileBar email={email} />
        <Text
          style={{
            alignSelf: "baseline",
            fontSize: 25,
            color: "white",
            paddingVertical: 15,
            fontWeight: "bold",
          }}
        >
          Latest Challenge
        </Text>
        {challenges && (
          <MainCard challenge={challenges} navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    paddingTop: statusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    color: "white",
  },
  mainContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    color: "white",
  },
});
