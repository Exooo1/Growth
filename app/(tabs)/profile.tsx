import { BACKGROUND_COLOR_SCREEN } from "@/styles/constants/color-cst";
import React from "react";
import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR_SCREEN,
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}
