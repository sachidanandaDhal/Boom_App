import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import API from '../utils/api';
import { useRouter } from 'expo-router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await API.post('/auth/register', { username, email, password });
      Alert.alert('Registration Successful', 'Please log in.');
      router.replace('/login');
    } catch (error: any) {
      console.log(error);
      // Try to show backend message if exists
      const message = error.response?.data?.message || 'An error occurred.';
      Alert.alert('Registration Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
      />
      <Button title={loading ? 'Registering...' : 'Register'} onPress={handleRegister} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});
