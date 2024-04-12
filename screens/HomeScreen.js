import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "../Context";

const HomeScreen = () => {
  const {
    minutes,

    calories,

    workout,
  } = useContext(FitnessItems);
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View>
        <View
          style={{
            backgroundColor: "#242424",
            padding: 20,
            height: 200,
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            HOME WORKOUT
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {workout}
              </Text>
              <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                WORKOUTS
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {calories}
              </Text>
              <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                KCAL
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {minutes}
              </Text>
              <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                MINS
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{
                width: "90%",
                height: 120,
                marginTop: 20,
                borderRadius: 7,
              }}
              source={{
                uri: "https://t3.ftcdn.net/jpg/04/94/01/92/360_F_494019215_jZTW9skIs18uoKjZinCbxOflLhJm14iy.jpg",
              }}
            />
          </View>
        </View>
        <View style={{ padding: 40 }}></View>
        <FitnessCards />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
