import { Dimensions, Pressable, StyleSheet, Text, useColorScheme, Animated } from 'react-native';
import { Colors } from '../constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef } from 'react';

export default function DropdownMenu() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const rotation = useRef(new Animated.Value(0)).current;
    const isOpen = useRef(false);

    const onPressIn = () => {
        isOpen.current = !isOpen.current;
        Animated.spring(rotation, {
            toValue: isOpen.current ? 1 : 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable style={[styles.dropdownMenu, { backgroundColor: themeColors.reverse, borderColor: themeColors.border }]} onPress={onPressIn}>
            <Text style={{ color: themeColors.background, fontWeight: 'bold' }}>Problem</Text>
            <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['270deg', '360deg'] }) }] }}>
                <MaterialIcons name="arrow-drop-down" size={24} color={themeColors.background} />
            </Animated.View>
        </Pressable>
    )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    dropdownMenu: {
        width: width * 0.6,
        height: height * 0.06,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        maxWidth: 400,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdownIcon: {
        transform: [{ rotate: '270deg' }],
    },

});