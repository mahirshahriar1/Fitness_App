import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DietScreen = () => {
  const dietPlan = {
    monday: [
      { meal: 'Breakfast', food: 'Oatmeal with fruits', calories: 300 },
      { meal: 'Lunch', food: 'Grilled chicken salad', calories: 400 },
      { meal: 'Dinner', food: 'Salmon with quinoa and broccoli', calories: 500 },
    ],
    tuesday: [
      { meal: 'Breakfast', food: 'Greek yogurt with honey and almonds', calories: 250 },
      { meal: 'Lunch', food: 'Turkey and avocado wrap', calories: 350 },
      { meal: 'Dinner', food: 'Beef stir-fry with mixed vegetables', calories: 450 },
    ],
    // ... Other days
  };

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Weekly Diet Plan</Text>
      {Object.entries(dietPlan).map(([day, meals]) => renderDay(day, meals))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 20,
  },
  dayContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  mealItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 10,
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
  },
  mealFood: {
    fontSize: 16,
    color: '#2c3e50',
  },
  mealCalories: {
    fontSize: 16,
    color: '#e74c3c',
    fontStyle: 'italic',
  },
});

export default DietScreen;
