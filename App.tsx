import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppContent = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {userToken == null ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              animationTypeForReplace: userToken ? "pop" : "push",
            }}
          />
        ) : (
          <Stack.Screen name="Dashboard" options={{ headerShown: false}}>
            {() => (
              <Tab.Navigator
                initialRouteName="Home" >
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="Challenges"
                  component={Challenges}
                  options={{ headerShown: false }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
