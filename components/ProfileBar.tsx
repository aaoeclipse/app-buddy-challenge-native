import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../AuthContext";

interface ProfileBarProps {
  email: string;
}

const ProfileBar = ({ email }: ProfileBarProps) => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rightContainer}>
        <Text style={{ color: "gray" }}>
        👋 Welcome
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold"}}>{email}!</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={require("../assets/profile.png")} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "20%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    minHeight: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 10,
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default ProfileBar;