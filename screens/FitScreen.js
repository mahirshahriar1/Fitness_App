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
  // console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  // console.log(current, "first excersise");

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

  // Function to save completed exercises
  const saveExercise = async (exercise) => {
    const _date = new Date().toISOString(); 
    // trim the date to only show the date
    const date = _date.slice(0, 10);
    const newCompletedExercise = {
      name: exercise.name,
      sets: exercise.sets,
      date: date,
    };

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
  }

  useEffect(() => {
    const fetchCompleted = async () => {
      const result = await AsyncStorage.getItem("completedExercises");
      if (result) setCompleted(JSON.parse(result));
    };
    fetchCompleted();
  }, []);

  console.log(completed, "completed exercise");


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
            setCalories(calories + 6.3);
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
      <Pressable
            onPress={() => {
              clear_storage();
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
              delete
            </Text>
          </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
