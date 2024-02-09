import { Stack } from "expo-router";
import { Appearance } from 'react-native';

export default function Layout() {
    const colorScheme = Appearance.getColorScheme();

    return (
        <Stack>
            <Stack.Screen
            name="index"
            options={{
                title: 'Todo List',
                headerStyle: { backgroundColor: colorScheme === 'dark' ? '#424242' : '#ffffff' },
                headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000'
            }}
            />
        </Stack>
    )
}