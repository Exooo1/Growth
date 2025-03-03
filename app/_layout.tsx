import {Stack} from "expo-router";
import {BACKGROUND_COLOR_SCREEN} from "@/styles/constants/color-cst";

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            navigationBarColor: BACKGROUND_COLOR_SCREEN,
            statusBarBackgroundColor: BACKGROUND_COLOR_SCREEN
        }}>
            <Stack.Screen name="auth/signIn"/>
            <Stack.Screen name="auth/signUp"/>
            <Stack.Screen name="index"/>
        </Stack>
    );
}
