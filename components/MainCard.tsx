import React from "react";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ChallengeProp {
  challenge: Challenge;
  navigation: any;
}

export default function MainCard({ challenge, navigation }: ChallengeProp) {
  return (
    <LinearGradient
      colors={["#cfcffa", "#9370DB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "smoke"}}>{challenge.name}</Text>
      <Text>{challenge.people ? challenge.people.join(",") : "something"}</Text>
      <Text>{challenge.goal ?? "test"}</Text>
      <Text>{challenge.deadLine ?? "no deadline"}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "25%",
    minHeight: 150,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    gap: 15,
    borderRadius: 15,
  },
});
