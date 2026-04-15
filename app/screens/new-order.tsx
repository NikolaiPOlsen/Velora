import AppButton, { AddToCartButton, SearchButton } from '@/src/components/ui/app-button';
import { Colors } from '@/src/constants/theme';
import { useShowSearchItems } from '@/hooks/show-search-items';
import { Device } from '@/src/services/Suppliers/types';
import { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    useColorScheme,
    useWindowDimensions,
    Text,
    View,
    Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateCard } from '@/hooks/use-create-card';
import { router } from 'expo-router';

export default function RegisterCustomerScreen() {
    // Color theme
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const insets = useSafeAreaInsets();

    // Dimension screen
    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    // Input height
    const inputHeight = Math.round(height * 0.06);

    const [customername, setCustomerName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [phoneModel, setPhoneModel] = useState('');
    const [price, setPrice] = useState('');

    const { fetchParts, addToCart } = useShowSearchItems();
    const [parts, setParts] = useState<Device[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const { handleCreateCard } = useCreateCard();
    const [cartItems, setCartItems] = useState<{ item: Device; quantity: number }[]>([]);
    const listId = process.env.EXPO_PUBLIC_TRELLO_LIST_ID_ORDRE || '';

    const handlePress = async () => {
        if (cartItems.length === 0) {
            alert('Handlekurven er tom. Vennligst legg til deler før du registrerer kunden.');
            return;
        }

        const partsDesc = cartItems
            .map(c => `- x${c.quantity} ${c.item.Artikelbezeichnung} (#${c.item.Artikelnummer})`)
            .join('\n');
        const desc = `\n${partsDesc}\n`;

        const result = await handleCreateCard(listId, customername, phonenumber, desc, price);
        if (result) {
            setCustomerName('');
            setPhonenumber('');
            setPrice('');
            setCartItems([]);
            router.replace('/home');
        }
    };

    const handleAddAllToCart = async () => {
        const selected = parts.filter(p => (quantities[p.Artikelnummer] ?? 0) > 0);
            if (selected.length === 0) {
                alert('Ingen deler valgt.');
                return;
            }
        try {
            for (const part of selected) {
                await addToCart(part.Artikelnummer, quantities[part.Artikelnummer]);
            }
            setCartItems(selected.map(p => ({ item: p, quantity: quantities[p.Artikelnummer] })));
            alert(`${selected.length} del(er) lagt i handlekurven!`);
        }
        catch (error) {
            alert('Noe gikk galt ved å legge i handlekurven.');
            console.error(error);
        }
    };


    const handleSearch = async () => {
        try {
            const results = await fetchParts(phoneModel);
            setParts(results);
        } catch (error) {
            alert('Noe gikk galt ved søk etter deler.');
            console.error(error);
        }
    };

    const renderPartCard = ({ item }: { item: Device }) => (
        <View style={[styles.partCard, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
            <Image source={{ uri: item.Artikelthumbnail }} style={styles.partImage} resizeMode="contain" />
            <View style={styles.partInfo}>
                <Text style={[styles.partBrand, { color: themeColors.text }]}>{item.Hersteller}</Text>
                <Text style={[styles.partName, { color: themeColors.icon }]}>{item.Artikelbezeichnung}</Text>
                <Text style={[styles.partPrice, { color: themeColors.text }]}>
                    {(item.Bruttopreis * 1.25).toFixed(2)} kr
                </Text>
            </View>
            <View style={styles.partActions}>
                <TextInput
                    placeholder="0"
                    placeholderTextColor={themeColors.icon}
                    style={[styles.quantityInput, { borderColor: themeColors.border, color: themeColors.text, backgroundColor: themeColors.card }]}
                    onChangeText={(val) => setQuantities((prev) => ({ ...prev, [item.Artikelnummer]: Number(val) }))}
                    value={String(quantities[item.Artikelnummer] ?? 0)}
                />
            </View>
        </View>
    );

    if (isPortrait) {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: themeColors.background }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <FlatList
                    data={parts}
                    keyExtractor={(item) => item.Artikelnummer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: insets.top + 28,
                        paddingBottom: insets.bottom + 20,
                        paddingHorizontal: insets.left + 20,
                    }}
                    ListHeaderComponent={
                        <View>
                            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Ny kunde</Text>
                            <Text style={[styles.sectionSubtitle, { color: themeColors.icon }]}>Fyll inn detaljer og velg deler</Text>

                            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Kundenavn</Text>
                            <TextInput
                                placeholder="Navn"
                                placeholderTextColor={themeColors.icon}
                                style={[styles.inputBox, styles.inputBoxPortrait, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                                value={customername}
                                onChangeText={setCustomerName}
                            />

                            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Telefonnummer</Text>
                            <TextInput
                                placeholder="Telefonnummer"
                                placeholderTextColor={themeColors.icon}
                                style={[styles.inputBox, styles.inputBoxPortrait, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                                value={phonenumber}
                                onChangeText={setPhonenumber}
                            />

                            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Telefonmodell</Text>
                            <TextInput
                                placeholder="Telefonmodell"
                                placeholderTextColor={themeColors.icon}
                                style={[styles.inputBox, styles.inputBoxPortrait, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                                value={phoneModel}
                                onChangeText={setPhoneModel}
                            />

                            <AppButton label="Søk etter deler" onPress={handleSearch} />

                            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Pris</Text>
                            <TextInput
                                placeholder="Pris"
                                placeholderTextColor={themeColors.icon}
                                style={[styles.inputBox, styles.inputBoxPortrait, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                                value={price}
                                onChangeText={setPrice}
                            />

                            {parts.length > 0 && (
                                <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 28, marginBottom: 12 }]}>
                                    Søkeresultater - {parts.length} {parts.length === 1 ? 'del' : 'deler'} funnet
                                </Text>
                            )}
                            {parts.length > 0 && (
                                <AddToCartButton
                                    label="Legg i handlekurv"
                                    onPress={handleAddAllToCart}
                                />
                            )}
                        </View>
                    }
                    ListEmptyComponent={null}
                    renderItem={renderPartCard}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <AppButton 
                        label="Registrer kunde"
                        onPress={handlePress} />

                </View>
            </KeyboardAvoidingView>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={[
                    styles.leftPanel,
                    {
                        backgroundColor: themeColors.background,
                        paddingTop: insets.top + 28,
                        paddingBottom: insets.bottom + 20,
                        paddingLeft: insets.left + 28,
                        paddingRight: 28,
                    }
                ]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Ny kunde</Text>
                    <Text style={[styles.sectionSubtitle, { color: themeColors.icon }]}>Fyll inn detaljer og velg deler</Text>

                    <Text style={[styles.inputLabel, { color: themeColors.text }]}>Kundenavn</Text>
                    <TextInput
                        placeholder="Navn"
                        placeholderTextColor={themeColors.icon}
                        style={[styles.inputBox, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                        value={customername}
                        onChangeText={setCustomerName}
                    />

                    <Text style={[styles.inputLabel, { color: themeColors.text }]}>Telefonnummer</Text>
                    <TextInput
                        placeholder="Telefonnummer"
                        placeholderTextColor={themeColors.icon}
                        style={[styles.inputBox, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                        value={phonenumber}
                        onChangeText={setPhonenumber}
                    />

                    <Text style={[styles.inputLabel, { color: themeColors.text }]}>Telefonmodell</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TextInput
                            placeholder="Telefonmodell"
                            placeholderTextColor={themeColors.icon}
                            style={[styles.inputBox, { flex: 1, backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                            value={phoneModel}
                            onChangeText={setPhoneModel}
                        />
                        <SearchButton icon="search" onPress={handleSearch} />
                    </View>

                    <Text style={[styles.inputLabel, { color: themeColors.text }]}>Pris</Text>
                        <TextInput
                            placeholder="Pris"
                            placeholderTextColor={themeColors.icon}
                            style={[styles.inputBox, { backgroundColor: themeColors.card, color: themeColors.text, height: inputHeight }]}
                            value={price}
                            onChangeText={setPrice}
                        />

                        <AppButton label="Registrer kunde" onPress={handlePress} />
                </View>

                <View style={{ width: 1, backgroundColor: themeColors.card }} />

                <View style={[
                    styles.rightPanel,
                    {
                        backgroundColor: themeColors.card,
                        paddingTop: insets.top + 28,
                        paddingBottom: insets.bottom + 20,
                        paddingRight: insets.right + 28,
                        paddingLeft: 28,
                    }
                ]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Søkeresultater - {parts.length} {parts.length === 1 ? 'del' : 'deler'} funnet</Text>

                    {parts.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={[styles.emptyText, { color: themeColors.icon }]}>
                                Søk etter deler for å se resultater her
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={parts}
                            keyExtractor={(item) => item.Artikelnummer}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            renderItem={renderPartCard}
                        />
                        
                    )}
                    {parts.length > 0 && (
                        <AddToCartButton 
                            label="Legg i handlekurv"
                            onPress={handleAddAllToCart}
                        />
                    )}
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    leftPanel: {
        flex: 1,
    },
    rightPanel: {
        flex: 1,
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
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
        marginLeft: 2,
    },
    inputBox: {
        marginBottom: 18,
        paddingHorizontal: 14,
        borderRadius: 12,
        fontSize: 16,
        maxWidth: 380,
    },
    inputBoxPortrait: {
        maxWidth: undefined,
        width: '100%',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 15,
        textAlign: 'center',
        maxWidth: 260,
        lineHeight: 22,
    },
    partCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        gap: 14,
    },
    partImage: {
        width: 64,
        height: 80,
        borderRadius: 8,
    },
    partInfo: {
        flex: 1,
        gap: 4,
    },
    partBrand: {
        fontSize: 15,
        fontWeight: '700',
    },
    partName: {
        fontSize: 13,
    },
    partPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    partActions: {
        alignItems: 'center',
        gap: 10,
    },
    quantityInput: {
        width: 56,
        height: 42,
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 16,
    },
});