import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import dietData from "../data/diet";

const DietScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Underweight");
  const [dietPlans, setDietPlans] = useState({});
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    // Load diet plans from diet.json
    setDietPlans(dietData);
    // Calculate the current day index
    const today = new Date().getDay();
    setCurrentDayIndex(today === 0 ? 6 : today - 1); // Convert Sunday (0) to 6 for array index
  }, []);

  const renderMeal = (meal, index) => (
    <View key={index} style={styles.mealItem}>
      <Text style={styles.mealTitle}>{meal.meal}</Text>
      <Text style={styles.mealFood}>{meal.food}</Text>
      <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
    </View>
  );

  const renderDay = (day, meals) => (
    <View key={day} style={styles.dayContainer}>
      <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>
      {meals.map(renderMeal)}
    </View>
  );

  const orderedDays = (days) => {
    // Reorder days so that today's diet is shown first, then sequentially
    const firstPart = days.slice(currentDayIndex);
    const secondPart = days.slice(0, currentDayIndex);
    return firstPart.concat(secondPart);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Weekly Diet Plan</Text>
      <Picker
        style={{ marginBottom: 20 , backgroundColor: "#f5f5f5", color: "#4b1985", size: 20, fontWeight: "bold", borderRadius: 15, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5,}}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        {Object.keys(dietPlans).map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      {orderedDays(Object.keys(dietPlans[selectedCategory] || {})).map((day) =>
        renderDay(day, dietPlans[selectedCategory][day])
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4e2fa", // Slightly off-white background
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4b1985", // Orange color for the header
    textAlign: "center",
    marginVertical: 30,
  },
  dayContainer: {
    marginBottom: 30,
    backgroundColor: "#f5f5f5", // Light orange background
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4b1985", // Orange color for the day title
    marginBottom: 15,
    textAlign: "center",
  },
  mealItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#4b1985", // Light salmon color for meal item borders
    paddingBottom: 15,
    marginBottom: 15,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4b1985", // Orange color for meal titles
    marginBottom: 5,
  },
  mealFood: {
    fontSize: 18,
    color: "#666",
  },
  mealCalories: {
    fontSize: 16,
    color: "#e83f3a", // Orange color for calories
    fontStyle: "italic",
    marginTop: 5,
  },
});

export default DietScreen;
