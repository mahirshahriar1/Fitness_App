import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { FitnessItems } from "../Context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const CompletedScreen = () => {
  const { completed, setCompleted } = useContext(FitnessItems);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to control whether to show all exercises or filter by date

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll); // Toggle the state
  };

  const filteredData = showAll
    ? completed
    : completed.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === date.toDateString();
      });
  const deleteAllExercises = async () => {
    await AsyncStorage.removeItem("completedExercises"); // Remove from storage
    setCompleted([]); // Clear the state
  };
  // Function to show confirmation dialog
  const confirmDeleteAll = () => {
    Alert.alert(
      "Clear All Exercises",
      "Are you sure you want to delete all completed exercises? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          onPress: deleteAllExercises,
          style: "destructive",
        },
      ]
    );
  };

  const deleteItem = async (id) => {
    const filteredEntries = completed.filter((item) => item.id !== id);
    setCompleted(filteredEntries);
    await AsyncStorage.setItem(
      "completedExercises",
      JSON.stringify(filteredEntries)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.column}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sets}>{item.sets} sets</Text>
      </View>
      <Pressable
        onPress={() => deleteItem(item.id)} // Assuming each item has a unique 'id'
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Exercises</Text>
      <Button
        title={showAll ? "Filter by Date" : "Show All"}
        onPress={toggleShowAll}
        color="#01786f" // Different color for different button
      />
      {!showAll && (
        <>
          <Button
            title="Select Date"
            onPress={() => setShowDatePicker(true)}
            color="#242424" // Different color for different button
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          )}
        </>
      )}

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable onPress={confirmDeleteAll} style={styles.deleteAllButton}>
        <Text style={styles.deleteAllButtonText}>Delete All History</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4e2fa",
  },
  deleteAllButton: {
    backgroundColor: "#e74c3c", // A red color for emphasis on deletion
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  deleteAllButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c", // A more subtle red color
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25, // Fully rounded corners
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2c3e50",
  },
  itemContainer: {
    flexDirection: "row", // Use row to facilitate two columns
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    backgroundColor: "#f3f6f4",
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  column: {
    flex: 1, // Each column takes half the space
    flexDirection: "column", // Organize content vertically within each column
  },
  date: {
    color: "#34495e",
    fontSize: 16,
    fontWeight: "500",
  },
  name: {
    color: "#16a085",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5, // Add margin to separate from the date
  },
  sets: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5, // Add margin to separate from the name
  },
  category: {
    color: "#8e44ad",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5, // Add margin to separate from the sets
  },
});

export default CompletedScreen;
