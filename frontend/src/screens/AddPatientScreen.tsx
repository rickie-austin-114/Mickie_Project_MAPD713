// src/screens/AddPatientScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';



const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');


  const backendURL = Platform.OS === "android" ? "http://10.0.2.2:3030/" : "http://localhost:3030/"


  const addPatient = async () => {
    try {
      const response = await axios.post(`${backendURL}api/patients`, {name,
        age: Number(age),
        email,
        phone,
        address,
        profilePicture,
        gender,
        dateOfBirth
        });
      Alert.alert('Success', 'Patient added successfully');
      navigation.goBack();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Age" value={age} keyboardType="numeric" onChangeText={setAge} />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} />
      <TextInput placeholder="Profile Image Link" value={profilePicture} onChangeText={setProfilePicture} />

      <Button title="Add Patient" onPress={addPatient} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5"

  },
  errorText: {
    color: 'red',
  },
});

export default AddPatientScreen;