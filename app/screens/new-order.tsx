import AppButton from '@/components/app-button';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useShowSearchItems } from '@/hooks/show-search-items';
import { Device } from '@/services/Suppliers/types';
import { useState } from 'react';
import { Dimensions, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, useColorScheme, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddToCartButton } from '@/components/app-button';

export default function RegisterCustomerScreen() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const [customername, setCustomerName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [phoneModel, setPhoneModel] = useState('');
    const { fetchParts, addToCart } = useShowSearchItems();
    const [parts, setParts] = useState<Device[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <ThemedView style={styles.container}>
                    <TextInput placeholder='Navn' style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} value={customername} onChangeText={setCustomerName} />
                    <TextInput placeholder='Telefonnummer' style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} value={phonenumber} onChangeText={setPhonenumber} keyboardType="numeric" />
                    <TextInput placeholder='Telefon modell' style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} value={phoneModel} onChangeText={setPhoneModel} />

                    <FlatList
                        data={parts}
                        keyExtractor={(item) => item.Artikelnummer}
                        renderItem={({ item }) => (
                            <View style={[styles.partsList, { borderColor: themeColors.border }]}>
                                <Image source={{ uri: item.Artikelthumbnail }} style={{ width: width * 0.2, height: height * 0.27, marginBottom: 10 }} />
                                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                                    <Text style={[{ color: themeColors.text }]}>Brand: {item.Hersteller}</Text>
                                    <Text style={[{ color: themeColors.text }]}>Type: {item.Artikelbezeichnung}</Text>
                                </View>

                            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '20%' }}>
                                    <Text style={[{ color: themeColors.text, fontWeight: 'bold', fontSize: 16 }]}>{(item.Bruttopreis * 1.25).toFixed(2)} kr</Text>
                                    <TextInput placeholder='Antall' style={[styles.quantityInput, { borderColor: themeColors.border, color: themeColors.text }]} keyboardType="numeric" 
                                        onChangeText={(val) => setQuantities(prev => ({ ...prev, [item.Artikelnummer]: Number(val) }))}
                                        value={String(quantities[item.Artikelnummer] ?? 1)}/>
                                </View>

                                    <AddToCartButton label='Legg i handlekurv' onPress={async () => {
                                        try {
                                            await addToCart(item.Artikelnummer, quantities[item.Artikelnummer] ?? 1);
                                            alert('Delen er lagt i handlekurven!');
                                        } catch (error) {
                                            alert('Det skjedde en feil ved legging i handlekurven.');
                                        }
                                    }} />
                                    </View>
                            </View>
                        )}
                    />

                    <AppButton label='Søk etter deler' onPress={async () => {
                        try {
                            const results = await fetchParts(phoneModel);
                            setParts(results);
                        } catch (error) {
                            alert('Noe gikk galt ved søk etter deler.');
                            console.error(error);
                        }
                    }} />

                </ThemedView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
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
    inputBoxMultiline: {
        width: width * 0.6,
        height: height * 0.15,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        maxWidth: 400,
    },
    partsList: {
        width: width * 0.8,
        maxWidth: width * 0.9,
        height: height * 0.3,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    quantityInput: {
        width: width * 0.2,
        height: height * 0.06,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        maxWidth: 100,
    }
});