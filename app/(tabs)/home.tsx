import AppButton from '@/src/components/ui/app-button';
import { ThemedView } from '@/src/components/ui/themed-view';
import { Colors } from '@/src/constants/theme';
import * as expo from 'expo-router';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
                <ThemedView style={styles.container}>
                        <AppButton label='Ny ordre' onPress={() => expo.router.push('/screens/new-order')} />
                        <AppButton label='Registrer kunde' onPress={() => expo.router.push('/screens/register-customer')} />
                </ThemedView>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});