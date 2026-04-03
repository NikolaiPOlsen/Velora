import { Dimensions, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/theme';

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

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    homeButton: {
        height: height * 0.06,
        width: width * 0.6,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 400,
    },
});