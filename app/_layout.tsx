import { Colors } from '@/src/constants/theme';
import { useAuthContext } from '@/src/hooks/use-auth-context';
import AuthProvider from '@/src/providers/auth-provider';
import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export function RootNavigation() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Redirect href={"/(auth)/login"}/>;
  }
  if (isLoggedIn) {
    return <Redirect href={"/(tabs)/home"}/>;
  }
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  return (
    <AuthProvider>
        <Stack>
          <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="screens/register-customer" options={{ headerBackTitle: 'Tilbake', title: 'Registrer kunde', headerTintColor: themeColors.text, headerStyle: { backgroundColor: themeColors.background } }}/>
          <Stack.Screen name="screens/new-order" options={{ headerBackTitle: 'Tilbake', title: 'Ny bestilling', headerTintColor: themeColors.text, headerStyle: { backgroundColor: themeColors.background } }}/>
        </Stack>
        <RootNavigation/>
    </AuthProvider>
  );
}