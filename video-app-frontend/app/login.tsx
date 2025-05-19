import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import API from '../utils/api';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await API.post('/auth/login', { email, password });
      await SecureStore.setItemAsync('token', response.data.token);
      router.replace('/home');
    } catch (error) {
        console.log(error)
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => router.push("/register")}
        color="gray"
      />
    </View>
  );
}
