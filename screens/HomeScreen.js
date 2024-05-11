import React, { useContext, useEffect, useState } from "react";
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
  const [currentDateTime, setCurrentDateTime] = useState(formatDateTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(formatDateTime(new Date()));
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);
  function formatDateTime(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    return `${addOrdinalSuffix(day)} ${month}, ${year} ${timeString}`;
  }
  
  function addOrdinalSuffix(day) {
    if (day > 3 && day < 21) return day + 'th'; // for teens
    switch (day % 10) {
      case 1:  return day + "st";
      case 2:  return day + "nd";
      case 3:  return day + "rd";
      default: return day + "th";
    }
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>HOME WORKOUT</Text>
      <View style={styles.metricsContainer}>
        <MetricItem label="WORKOUTS" value={workout} />
        <MetricItem label="KCAL" value={calories} />
        <MetricItem label="MINS" value={minutes} />
      </View>
      <Text style={styles.dateTime}>{currentDateTime}</Text>
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
  dateTime: {
    color: "white",
    backgroundColor: "#333",  // Darker background for contrast
    fontSize: 24,             // Larger font size for better visibility
    fontWeight: "bold",
    fontFamily: "monospace",  // Monospace font for a digital clock appearance
    textAlign: "center",
    marginTop: 20,            // More space above the clock display
    paddingVertical: 10,     // Vertical padding to give more space around the text
    paddingHorizontal: 20,   // Horizontal padding to enhance the clock-like appearance
    borderRadius: 10,        // Rounded corners for a softer look
    borderWidth: 2,          // Optional: border to define the clock area clearly
    borderColor: "#555",     // Border color that complements the background
  },
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
