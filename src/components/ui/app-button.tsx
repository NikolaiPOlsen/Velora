import { type ComponentProps } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../constants/theme';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

type Props = {
    onPress: () => void;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export default function AppButton({ onPress, label, icon, disabled }: Props) {
        const colorScheme = useColorScheme();
        const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.homeButton,
                {backgroundColor: themeColors.primary},
                (pressed || disabled) && {opacity: 0.5}
            ]}>
            <Text style={[styles.buttonText, { color: themeColors.background }]}>{label}</Text>
            {icon}
        </Pressable>
    )
}

export function AddToCartButton({ onPress, label, icon, disabled }: Props) {
        const colorScheme = useColorScheme();
        const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.addToCartButton,
                {backgroundColor: themeColors.primary},
                (pressed || disabled) && {opacity: 0.5}
            ]}>
            <Text style={[styles.buttonTextCart, { color: themeColors.background }]}>{label}</Text>
            {icon}
        </Pressable>
    )
}

type SearchButtonProps = {
    onPress: () => void;
    icon: MaterialIconName;
    disabled?: boolean;
}

export function SearchButton({ onPress, icon, disabled }: SearchButtonProps) {
        const colorScheme = useColorScheme();
        const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.searchButton,
                {backgroundColor: themeColors.primary},
                (pressed || disabled) && {opacity: 0.5}
            ]}>
            <MaterialIcons name={icon} size={24} color={themeColors.background} />
        </Pressable>
    )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    homeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        height: height * 0.06,
        gap: 10,
        marginBottom: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        maxWidth: 380,
    },
    addToCartButton: {
        height: height * 0.06,
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: width * 0.9,
        marginBottom: 15,
    },
    searchButton: {
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextCart: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});