import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { FitnessItems } from "../Context";
import DateTimePicker from "@react-native-community/datetimepicker";

const CompletedScreen = () => {
  const { completed } = useContext(FitnessItems);
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

  const filteredData = showAll ? completed : completed.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.toDateString() === date.toDateString();
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.sets}>{item.sets} sets</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Exercises</Text>
      <Button title={showAll ? "Filter by Date" : "Show All"} onPress={toggleShowAll} />
      {!showAll && (
        <>
          <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
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
    </View>
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
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    flex: 1,
    color: '#34495e',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    flex: 2,
    color: '#16a085',
    fontSize: 16,
    fontWeight: '500',
  },
  sets: {
    flex: 1,
    textAlign: 'right',
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '500',
  }
});

export default CompletedScreen;
