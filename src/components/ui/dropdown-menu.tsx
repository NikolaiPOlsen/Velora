import { Dimensions, Pressable, StyleSheet, Text, useColorScheme, Animated, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Colors } from '../constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState } from 'react';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function DropdownMenu() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const rotation = useRef(new Animated.Value(0)).current;
    const [isOpen, setIsOpen] = useState(false);

    const onPress = () => {
        const next = !isOpen;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(next);
        Animated.spring(rotation, {
            toValue: next ? 1 : 0,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    };

    return (
        <View>
            <Pressable
                style={[styles.dropdownMenu, isOpen && styles.dropdownMenuOpen, { backgroundColor: themeColors.reverse, borderColor: themeColors.border }]}
                onPress={onPress}
            >
                <Text style={{ color: themeColors.background, fontWeight: 'bold' }}>Problem</Text>
                <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['270deg', '360deg'] }) }] }}>
                    <MaterialIcons name="arrow-drop-down" size={24} color={themeColors.background} />
                </Animated.View>
            </Pressable>

            {isOpen && (
                <View style={[styles.dropdownMenuList, { backgroundColor: themeColors.reverse, borderColor: themeColors.border }]}>
                    <Text style={{ color: themeColors.background }}>Skjerm</Text>
                    <Text style={{ color: themeColors.background }}>Batteri</Text>
                    <Text style={{ color: themeColors.background }}>Lading</Text>
                    <Text style={{ color: themeColors.background }}>Annet</Text>
                </View>
            )}
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    dropdownMenu: {
        width: width * 0.6,
        height: height * 0.06,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 20,
        maxWidth: 400,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dropdownMenuOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 0,
        marginBottom: 0,
    },
    dropdownMenuList: {
        width: width * 0.6,
        maxWidth: 400,
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        gap: 8,
        marginBottom: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});
