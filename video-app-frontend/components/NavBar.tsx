// components/NavBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Clear auth token
      router.replace('/login'); // Navigate to login screen
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boom App</Text>

      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.uploadButton} onPress={() => router.push('/upload')}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  uploadButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
