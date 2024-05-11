import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);

  console.log(completed);
  // Function to save completed exercises
  const saveExercise = async (exercise) => {
    const _date = new Date().toISOString();
    // trim the date to only show the date
    const date = _date.slice(0, 10);
    
    const newCompletedExercise = {
      id: exercise.id,
      name: exercise.name,
      sets: exercise.sets,
      category: exercise.category,
      date: date,
    };
    console.log(newCompletedExercise);
    const updatedCompleted = [...completed, newCompletedExercise];

    setCompleted(updatedCompleted);
    await AsyncStorage.setItem(
      "completedExercises",
      JSON.stringify(updatedCompleted)
    );
  };
  const clear_storage = async () => {
    await AsyncStorage.removeItem("completedExercises");
    setCompleted([]);
  };

  useEffect(() => {
    const fetchCompleted = async () => {
      const result = await AsyncStorage.getItem("completedExercises");
      if (result) setCompleted(JSON.parse(result));
    };
    fetchCompleted();
  }, []);



  const estimateCalories = (exerciseName, sets) => {
    const baseCalories = {
      "JUMPING JACKS": 10,
      "INCLINE PUSH-UPS": 5,
      "INCLINED PUSH-UPS": 5,
      "WIDE ARM PUSH-UPS": 6,
      "COBRA STRETCH": 4,
      "CHEST STRETCH": 3,
      "MOUNTAIN CLIMBERS": 8,
      "HEEL TOUCH": 6,
      "PLANK": 4,
      "LEG RAISES": 7,
      "ARM RAISES": 5,
      "TRICEP DIPS": 6,
      "DIAMOND_PUSHUP": 7,
      "PUSH-UPS": 6,
      "DUMBELL CURL": 5,
      "INCH WORMS": 9,
      "TRICEP LIFT": 5,
      "DECLINE PUSH-UPS": 7,
      "HINDU PUSH-UPS": 8,
      "SHOULDER STRETCH": 2,
      "PUSH-UP & ROTATION": 7,
      "BURPEES": 10,
    };

    const caloriesPerSet = baseCalories[exerciseName];
    if (!caloriesPerSet) {
      return 6.3 * sets;
    }

    return sets * caloriesPerSet;
  };

  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 370 }}
        source={{ uri: current.image }}
      />

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {current.name}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 38,
          fontWeight: "bold",
        }}
      >
        x{current.sets}
      </Text>
      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate("Rest");
            saveExercise(current);
            // setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + estimateCalories(current.name, current.sets));
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      )}

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");

            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 20,
            width: 100,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            PREV
          </Text>
        </Pressable>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");

              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        )}
      </Pressable>      
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
