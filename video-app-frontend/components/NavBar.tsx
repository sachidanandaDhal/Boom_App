import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from '@expo/vector-icons';

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
      {/* Left: Home icon */}
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.iconButton}>
        <Ionicons name="home-outline" size={26} color="#000" />
      </TouchableOpacity>

      {/* Center: Logo/Title */}
      <Text style={styles.title}>Boom</Text>

      {/* Right: Upload and Logout */}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => router.push('/upload')} style={styles.iconButton}>
          <Ionicons name="add-circle-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Feather name="log-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  iconButton: {
    paddingHorizontal: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
