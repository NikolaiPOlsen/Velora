import { Stack } from 'expo-router';

export default function authLayout() {
    return (
        <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' options={{ headerShown: false }}/>
        </Stack>
    )
}