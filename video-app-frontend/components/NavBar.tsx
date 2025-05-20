// components/NavBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/login');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to logout. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.titleContainer}>
        <Ionicons name="home-outline" size={30} color="#4cd137" />
        <Text style={styles.title}>Boom App</Text>
      </TouchableOpacity>

      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/upload')}>
          <Ionicons name="add-circle-outline" size={32} color="#0097e6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={32} color="#e84118" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,           // increased padding top for height
    paddingBottom: 10,        // increased padding bottom for height
    paddingHorizontal: 25,
    backgroundColor: 'green',  // very dark background
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // subtle shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: 'white',        // bright green text color for contrast
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    padding: 8,
  },
});
