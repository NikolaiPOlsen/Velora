import AppButton from '@/src/components/ui/app-button';
import { ThemedView } from '@/src/components/ui/themed-view';
import { Colors } from '@/src/constants/theme';
import { supabase } from '@/src/utils/supabase';
import { useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

     async function signIn() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <ThemedView style={styles.container}>
                        <Text style={[styles.loginHeader, { color: themeColors.text }]}>Login</Text>

                        <View>
                            <TextInput style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} placeholder='E-post' value={email} onChangeText={setEmail} />
                            <TextInput style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} placeholder='Passord' value={password} onChangeText={setPassword} secureTextEntry />
                        </View>
                        <AppButton onPress={signIn} label='Logg inn' disabled={loading} />
                </ThemedView>
            </KeyboardAvoidingView>
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
    inputBox: {
        width: width * 0.6,
        height: height * 0.06,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        maxWidth: 400,
    },
    loginHeader: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});