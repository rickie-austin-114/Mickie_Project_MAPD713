// src/screens/ViewProfileScreen.tsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform } from 'react-native';

const EditProfileScreen = ({ route, navigation }) => {
  const { patient } = route.params;

  const backendURL = Platform.OS === "android" ? "http://10.0.2.2:3030/" : "http://localhost:3030/"

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');

    useEffect(() => {
        setName(patient.name);
        setAge(patient.age);
        setGender(patient.gender);
        setAddress(patient.address);
        setEmail(patient.email);
        setDateOfBirth(patient.dateOfBirth);
        setPhone(patient.phone)
        setProfilePicture(patient.profilePicture);
    }, [])

    const updatePatient = async () => {
        try {
            const response = await axios.put(`${backendURL}api/patients/${patient._id}`, {
              name,
              age: Number(age),
              gender,
              address,
              email,
              phone,
              dateOfBirth,
              profilePicture,
            });
            Alert.alert('Success', 'Patient updated successfully');
            navigation.goBack();
          } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
          }
    }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} />
      <TextInput placeholder="Profile Image Link" value={profilePicture} onChangeText={setProfilePicture} />
      <Button title="Update Patient" onPress={updatePatient} />
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
});

export default EditProfileScreen;