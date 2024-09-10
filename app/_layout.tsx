import React from 'react';
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';

export default function RootLayout() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="ExpenseScreen" />
    </Stack>
  );
}


