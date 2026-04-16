import AppButton from '@/src/components/ui/app-button';
import { ThemedView } from '@/src/components/ui/themed-view';
import { Colors } from '@/src/constants/theme';
import { useCreateCard } from '@/src/hooks/use-create-card';
import { router } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, useColorScheme, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterCustomerScreen() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const { handleCreateCard } = useCreateCard();
    const { width, height } = useWindowDimensions();
    const inputHeight = Math.round(height * 0.06);
    const TRELLO_LISTID_ARBEID = process.env.EXPO_PUBLIC_TRELLO_LIST_ID_ARBEID || '';
    const [customername, setCustomerName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [desc, setDesc] = useState('');
    const [pris, setPris] = useState('');

    const handlePress = async (listId: string) => {
        const result = await handleCreateCard(listId, customername, phonenumber, desc, pris);
        if (result) {
            setCustomerName('');
            setPhonenumber('');
            setDesc('');
            setPris('');
            router.replace('/home');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', backgroundColor: themeColors.background }}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                keyboardVerticalOffset={0}>

                <ThemedView style={styles.container}>
                    <View style={styles.wrapper}>

                        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Ny kunde</Text>
                        <Text style={[styles.sectionSubtitle, { color: themeColors.icon }]}>Fyll inn informasjon om kunden</Text>

                        <Text style={[styles.inputLabel, { color: themeColors.text }]}>Navn</Text>
                            <TextInput 
                            placeholder='Navn'
                            placeholderTextColor={themeColors.icon}
                            style={[styles.inputBox, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]} 
                            value={customername} 
                            onChangeText={setCustomerName} />

                        <Text style={[styles.inputLabel, { color: themeColors.text }]}>Telefonnummer</Text>
                            <TextInput 
                            placeholder='Telefon'
                            placeholderTextColor={themeColors.icon}
                            style={[styles.inputBox, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]} 
                            value={phonenumber} 
                            onChangeText={setPhonenumber} 
                            keyboardType="numeric" />

                        <Text style={[styles.inputLabel, { color: themeColors.text }]}>Beskrivelse</Text>
                            <TextInput 
                            multiline 
                            placeholder='Beskrivelse' 
                            placeholderTextColor={themeColors.icon}
                            style={[styles.inputBoxMultiline, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]} 
                            value={desc} 
                            onChangeText={setDesc} />

                        <Text style={[styles.inputLabel, { color: themeColors.text }]}>Pris</Text>
                            <TextInput 
                            placeholder='Pris' 
                            placeholderTextColor={themeColors.icon}
                            style={[styles.inputBox, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]} 
                            value={pris} 
                            onChangeText={setPris}/>

                        <AppButton label='Registrer kunde' onPress={() => handlePress(TRELLO_LISTID_ARBEID)} />

                    </View>

                </ThemedView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        width: '100%',
        maxWidth: 420,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 15,
        marginBottom: 28,
    },
    inputBox: {
        marginBottom: 18,
        paddingHorizontal: 14,
        borderRadius: 12,
        fontSize: 16,
        maxWidth: 380,
    },
    inputBoxMultiline: {
        marginBottom: 18,
        padding: 14,
        borderRadius: 12,
        fontSize: 16,
        maxWidth: 380,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
        marginLeft: 2,
    }
});