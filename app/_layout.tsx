import { router, Stack } from "expo-router";
import {
  BACKGROUND_COLOR_SCREEN,
  COMMON_COLOR_GREEN,
} from "@/styles/constants/color-cst";
import { useErrorsStore } from "@/store/error-store";
import { Errors } from "@/components/errors";
import { TouchableOpacity, Text, View, Platform } from "react-native";

const CustomHeader = () => (
  <View
    style={{
      height: Platform.OS === "ios" ? 140 : 60,
      backgroundColor: BACKGROUND_COLOR_SCREEN,
      paddingLeft: "3%",
      justifyContent: "center",
      position: "absolute",
    }}
  >
    <TouchableOpacity onPress={router.back} style={{ marginLeft: 10 }}>
      <Text style={{ color: COMMON_COLOR_GREEN, fontSize: 16 }}>Back</Text>
    </TouchableOpacity>
  </View>
);

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
            header: () => <CustomHeader />,
            statusBarBackgroundColor: BACKGROUND_COLOR_SCREEN,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="auth/forgotPassword"
          options={{
            header: () => <CustomHeader />,
            statusBarBackgroundColor: BACKGROUND_COLOR_SCREEN,
            headerShown: true,
          }}
        />
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
