import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR_SCREEN } from "@/styles/constants/color-cst";
import { blStyles } from "@/styles/common/bl-styles";
export const forgotPasswordStyles = StyleSheet.create({
  container: {
    ...blStyles.defaultContainerWidthHeight,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
});
