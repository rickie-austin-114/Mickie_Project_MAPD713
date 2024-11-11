// src/screens/ViewProfileScreen.tsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import { logToLogBoxAndConsole } from "react-native-reanimated/lib/typescript/logger";

const ViewProfileScreen = ({ route, navigation }) => {
  const { patient } = route.params;
  const [records, setRecords] = useState([]);

  const backendURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:3030/"
      : "http://localhost:3030/";

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `${backendURL}api/patientRecords/patient/${patient._id}`
      );
      setRecords(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: patient.profilePicture }} />
      <Text>id: {patient._id}</Text>
      <Text>Name: {patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Gender: {patient.gender}</Text>
      <Text>Phone: {patient.phone}</Text>
      <Text>Email: {patient.email}</Text>
      <Text>Address: {patient.address}</Text>
      <Text>Date of Birth: {patient.dateOfBirth}</Text>
      <Text>Condition: {patient.condition}</Text>
      <Text>Records:</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.recordContainer}>
            <Text style={styles.recordText}>{item.datatype}</Text>
            <Text style={styles.recordText}>{item.readingValue}</Text>
            <Text style={styles.recordText}>{item.measurementDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5",
  },
  logo: {
    width: 100,
    height: 100,
  },
  recordText: {
    fontSize: 24,
  },
  recordContainer: {
    marginVertical: 10,
    backgroundColor: "#eeeeee",
  },
});

export default ViewProfileScreen;
