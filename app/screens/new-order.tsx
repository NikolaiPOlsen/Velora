import AppButton from '@/components/app-button';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useShowSearchItems } from '@/hooks/show-search-items';
import { Device } from '@/services/Suppliers/types';
import { useState } from 'react';
import { Dimensions, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, useColorScheme, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterCustomerScreen() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const [customername, setCustomerName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [phoneModel, setPhoneModel] = useState('');
    const { fetchParts, fetchPartDetails, fetchPartPhotos, addToCart } = useShowSearchItems();
    const [parts, setParts] = useState<Device[]>([]);
    const [details, setDetails] = useState(null);
    const [photos, setPhotos] = useState([]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <ThemedView style={styles.container}>
                    <TextInput placeholder='Navn' style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} value={customername} onChangeText={setCustomerName} />
                    <TextInput placeholder='Telefonnummer' style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} value={phonenumber} onChangeText={setPhonenumber} keyboardType="numeric" />
                    <TextInput placeholder='Telefon modell' style={[styles.inputBox, { borderColor: themeColors.border, color: themeColors.text }]} value={phoneModel} onChangeText={setPhoneModel} />

                    <FlatList
                        data={parts}
                        keyExtractor={(item) => item.Geraeteid.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.partsList}>
                                <Image source={{ uri: `data:image/jpeg;base64,${item.Photos?.[0] ?? ''}` }} style={{ width: 100, height: 100, marginBottom: 10 }} />
                                <Text>{item.Name}</Text>
                                <Text>{item.Price}</Text>
                                <TextInput placeholder='Antall' style={[styles.quantityInput, { borderColor: themeColors.border, color: themeColors.text }]} keyboardType="numeric" />
                                <AppButton label='Legg i handlekurv' onPress={async () => {
                                    try {
                                        await addToCart(item.Geraeteid, 1);
                                        alert('Delen er lagt i handlekurven!');
                                    } catch (error) {
                                        alert('Det skjedde en feil ved legging i handlekurven.');
                                    }
                                }} />
                            </View>
                        )}
                    />

                    <AppButton label='Søk etter deler' onPress={async () => {
                        const results = await fetchParts(phoneModel);
                        const partsWithDetails = await Promise.all(
                            results.map(async (part) => {
                                const [details, photos] = await Promise.all([
                                    fetchPartDetails(part.Geraeteid),
                                    fetchPartPhotos(part.Geraeteid),
                                ]);
                                return { ...part, details, photos };
                            })
                        );
                        setParts(partsWithDetails);
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
        maxWidth: 600,
        height: height * 0.3,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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