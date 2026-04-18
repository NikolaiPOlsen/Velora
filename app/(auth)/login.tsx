import AppButton from '@/src/components/ui/app-button';
import { Colors } from '@/src/constants/theme';
import { supabase } from '@/src/utils/supabase';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ExternalLink } from '@/src/components/ui/external-link'
import { InputField, PasswordField } from '@/src/components/ui/input-field'

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
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: themeColors.background }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

                <View style={styles.container}>
                        <Text style={[styles.loginHeader, { color: themeColors.primary }]}>Login her</Text>
                        <Text style={[styles.subHeader, { color: themeColors.text }]}>Velkommen tilbake! Logg inn for å fortsette der du slapp.</Text>

                            <InputField name='E-post' value={email} onChange={setEmail} />
                            <PasswordField name='Passord' value={password} onChange={setPassword} />

                        <AppButton onPress={signIn} label='Logg inn' disabled={loading} />

                </View>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginHeader: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 15,
        flexWrap: 'wrap',
        maxWidth: '75%',
        textAlign: 'center',
    }
});