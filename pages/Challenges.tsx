import React from 'react'
import colors from '../colors';
import Constants from "expo-constants";

import { Text, SafeAreaView, StyleSheet, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight;

export default function Challenges({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
        {/* SECTION */}
        <Text>Test</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      paddingTop: statusBarHeight,
      paddingHorizontal: 10,
      // backgroundColor: colors.background,
      color: "white",
      gap: 10,
    },
    mainContainer: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      height: 50,
      backgroundColor: colors.primary,
    },
  });