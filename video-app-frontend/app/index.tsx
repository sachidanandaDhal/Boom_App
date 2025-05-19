import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

useEffect(() => {
  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  };

  checkAuth();
}, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
