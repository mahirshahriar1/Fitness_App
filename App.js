import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { FitnessProvider } from "./Context"; // Adjusted z
import StackNavigator from "./StackNavigator";
import HomeScreen from "./screens/HomeScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import FitScreen from "./screens/FitScreen";
import RestScreen from "./screens/RestScreen";
import CompletedScreen from "./screens/CompletedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from 'react-native';
import BMIScreen from "./screens/BMIScreen";
import DietScreen from "./screens/DietScreen";

const Tab = createBottomTabNavigator();
const WorkoutStack = createNativeStackNavigator();

function WorkoutStackScreen() {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <WorkoutStack.Screen name="Workout" component={WorkoutScreen} options={{headerShown:false}}/>
      <WorkoutStack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
      <WorkoutStack.Screen name="Rest" component={RestScreen} options={{headerShown:false}}/>
    </WorkoutStack.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, }) => ({
        headerShown: false,  
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Completed Exercises") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "BMI") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else if (route.name === "Diet") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          }

          return (
            <Icon name={iconName} type="ionicon" size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Completed Exercises" component={CompletedScreen} />
      <Tab.Screen name="BMI" component={BMIScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Workout" component={WorkoutStackScreen} options={{title: 'Workout',tabBarButton: () => <View/>}} />      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FitnessProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </FitnessProvider>
  );
}
