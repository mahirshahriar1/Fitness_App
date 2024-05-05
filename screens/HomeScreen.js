import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "../Context";

const HomeScreen = () => {
  const { minutes, calories, workout, completed, setCalories, setMinutes, setWorkout } = useContext(FitnessItems);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const completedToday = completed.filter(item => item.date === today);
    const burnedCalories = completedToday.length * 6.3;
    const workoutMinutes = completedToday.length * 2.5;
    const workoutCount = completedToday.length;
    setCalories(burnedCalories);
    setMinutes(workoutMinutes);
    setWorkout(workoutCount);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <FitnessCards />
    </ScrollView>
  );
};

const Header = () => {
  const { workout, calories, minutes } = useContext(FitnessItems);

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>HOME WORKOUT</Text>
      <View style={styles.metricsContainer}>
        <MetricItem label="WORKOUTS" value={workout} />
        <MetricItem label="KCAL" value={calories} />
        <MetricItem label="MINS" value={minutes} />
      </View>
      <Image
        style={styles.image}
        source={{
          uri: "https://t3.ftcdn.net/jpg/04/94/01/92/360_F_494019215_jZTW9skIs18uoKjZinCbxOflLhJm14iy.jpg",
        }}
      />
    </View>
  );
};

const MetricItem = ({ label, value }) => (
  <View style={styles.metricItem}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#242424",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricItem: {
    alignItems: "center",
  },
  metricValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  metricLabel: {
    color: "#D0D0D0",
    fontSize: 17,
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
});

export default HomeScreen;
