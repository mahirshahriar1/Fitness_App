import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessItems = createContext();

const FitnessProvider = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const fetchCompleted = async () => {
      const result = await AsyncStorage.getItem("completedExercises");
      if (result) {
        setCompleted(JSON.parse(result));
      }
    };
    fetchCompleted();
  }, []);

  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessProvider, FitnessItems };
