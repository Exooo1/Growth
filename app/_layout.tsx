import { ButtonBack } from "@/components/buttons/buttonBack";
import { Errors } from "@/components/errors";
import { useErrorsStore } from "@/store/error-store";
import { BACKGROUND_COLOR_SCREEN } from "@/styles/constants/color-cst";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  const errors = useErrorsStore((state) => state.errors);
  return (
    <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR_SCREEN }}>
      {errors.length ? <Errors /> : null}
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarColor: BACKGROUND_COLOR_SCREEN,
          statusBarBackgroundColor: BACKGROUND_COLOR_SCREEN,
        }}
      >
        <Stack.Screen name="auth/signIn" />
        <Stack.Screen name="auth/signUp" />
        <Stack.Screen
          name="auth/verifyEmail"
          options={{
            header: () => <ButtonBack name="Sign Up" />,
            statusBarBackgroundColor: BACKGROUND_COLOR_SCREEN,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="auth/forgotPassword"
          options={{
            header: () => <ButtonBack name="Sign In" />,
            statusBarBackgroundColor: BACKGROUND_COLOR_SCREEN,
            headerShown: true,
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
