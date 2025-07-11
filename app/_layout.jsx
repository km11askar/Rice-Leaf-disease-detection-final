
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="index" />
        {/* This should match your folder structure */}
      <Stack.Screen name="tabs" />
      </Stack>
    </SafeAreaProvider>
  );
  
};

export default _layout;