import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Alert,
  Pressable,
} from "react-native";
import colors from "../colors";
import { useEffect, useState } from "react";
import { loginApiCall, registerApiCall } from "../utils/apiCalls";

// Import the image
import logo from "../assets/testgym.png";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../AuthContext";

export default function Login({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { signIn } = useAuth();


  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const loginRequest = async () => {
    try {
      if (!isValidEmail(username)) return;

      const response = await loginApiCall(username, password);
      if (!response) {
        Alert.alert("Login failed", "Invalid email or password");
        setPassword("");
        return;
      }

      if (response.status === 200 && response.data.token) {
        await SecureStore.setItem("token", response.data.token);
        await signIn(response.data.token);
      } else {
        Alert.alert("Login failed", "Invalid email or password");
        setPassword("");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Login failed", "An error occurred. Please try again.");
    }
  };
  const registerRequest = async () => {
    const response = await registerApiCall(username, password);

    if (!response) {
      Alert.alert("Registration failed", "Problem with request");
      return;
    }

    if (response.status === 200 && response.data.token) {
      await signIn(response.data.token);
    } else {
      Alert.alert("Register failed", "Error on server");
      cleanValues();
    }
  };
  const cleanValues = () => {
    setUsername("");
    setPassword("");
  };

  if (register) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Add the Image component */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>BuddyChallenge</Text>
        <TextInput
          style={[styles.input, !isValid && styles.invalidInput]}
          onChangeText={(e) => {
            setUsername(e);
            setIsValid(isValidEmail(e));
          }}
          value={username}
          placeholder="username"
          placeholderTextColor="gray" // Add a custom color for the placeholder here
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => setPassword(e)}
          value={password}
          placeholder="password"
          placeholderTextColor="gray" // Add a custom color for the placeholder here
          secureTextEntry={true}
        />
        <Pressable onPress={registerRequest} style={styles.buttonLogin}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Register
          </Text>
        </Pressable>

        <Text
          style={styles.register}
          onPress={() => {
            cleanValues();
            setRegister(false);
          }}
        >
          Already have an account? Login
        </Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Add the Image component */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>BuddyChallenge</Text>
      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        onChangeText={(e) => {
          setUsername(e);
          setIsValid(isValidEmail(e));
        }}
        value={username}
        placeholder="username"
        placeholderTextColor="gray" // Add a custom color for the placeholder here
      />
      <TextInput
        style={styles.input}
        onChangeText={(e) => setPassword(e)}
        value={password}
        placeholder="password"
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      <Pressable onPress={loginRequest} style={styles.buttonLogin}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Login
        </Text>
      </Pressable>

      <Text
        style={styles.register}
        onPress={() => {
          cleanValues();
          setRegister(true);
        }}
      >
        Don't have an account? Register
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    gap: 15,
  },
  title: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    height: 55,
    width: 300,
    borderColor: "white",
    backgroundColor: "white",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 10,
    fontSize: 20,
  },
  register: {
    color: "gray",
    paddingTop: 10,
  },
  buttonLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    gap: 10,
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 2,
    borderStyle: "solid",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
