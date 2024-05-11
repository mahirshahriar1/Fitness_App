import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BMIScreen = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [weightToReachNormal, setWeightToReachNormal] = useState(null);
  const calculateBMI = () => {
    if (height && weight) {
      const h = height / 100; // Convert height from cm to meters
      const w = weight;
      const bmiValue = (w / (h * h)).toFixed(2); // Formula: weight (kg) / (height (m) * height (m))
      setBmi(bmiValue);
      categorizeBMI(bmiValue, height, weight);
    }
  };

  const categorizeBMI = (bmiValue, height, weight) => {
    const bmiCategories = [
      { limit: 18.5, category: "Underweight", advice: "You should eat more!" },
      { limit: 24.9, category: "Normal weight", advice: "Great job! Keep it up!", },
      { limit: 29.9, category: "Overweight", advice: "You should eat less!" },
      { limit: 34.9, category: "Obesity", advice: "You should eat much less!" },
      { limit: Infinity, category: "Severe obesity", advice: "You should see a doctor!", },
    ];

    const { category, advice } = bmiCategories.find((c) => bmiValue <= c.limit);

    setBmiCategory(category);
    setAdvice(advice);

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    const normalBmiUpperLimit = 24.9;
    const normalBmiLowerLimit = 18.5;
    const targetWeightForNormalBmiUpper = ( normalBmiUpperLimit *heightInMeters ** 2).toFixed(2);
    const targetWeightForNormalBmiLower = ( normalBmiLowerLimit * heightInMeters ** 2 ).toFixed(2);

    let weightToReachNormal;

    if (bmiValue < normalBmiLowerLimit) {
      weightToReachNormal = `You need to gain ${(targetWeightForNormalBmiLower - weightInKg).toFixed(2)} kg to reach a normal BMI.`;
    } else if (bmiValue > normalBmiUpperLimit) {
        weightToReachNormal = `You need to lose ${(weightInKg - targetWeightForNormalBmiUpper).toFixed(2)} kg to reach a normal BMI.`;
    } else {
      weightToReachNormal = "You are already in the normal BMI range!";
    }
    setWeightToReachNormal(weightToReachNormal);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BMI Calculator</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Height (cm)"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight (kg)"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.bmiValue}>BMI: {bmi}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.bmiCategory}>{bmiCategory}</Text>
            <View
              style={[
                styles.indicator,
                { backgroundColor: getColorForCategory(bmiCategory) },
              ]}
            />
          </View>
          <Text style={styles.advice}>{advice}</Text>
          {weightToReachNormal && (
            <Text style={styles.targetWeight}>{weightToReachNormal}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const getColorForCategory = (category) => { 
  switch (category) {
    case 'Underweight':
      return '#FFC93C';
    case 'Normal weight':
      return '#32A287';
    case 'Overweight':
      return '#FF6B6B';
    case 'Obesity':
      return '#C34A36';
    default:
      return '#2F3C7E';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d4e2fa',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4b1985',
    textAlign: 'center',
    marginVertical: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DADADA',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4b1985',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#303030',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bmiCategory: {
    fontSize: 20,
    fontWeight: '600',
    color: '#303030',
    marginRight: 10,
  },
  advice: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6C757D',
    marginBottom: 10,
  },
  targetWeight: {
    fontSize: 16,
    fontWeight: '500',
    color: '#C34A36',
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default BMIScreen;