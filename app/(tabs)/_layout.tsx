import { Colors } from '@/src/constants/theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themedColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name={'home'} options={{ headerShown: false }} />
    </Tabs>
  );
}
