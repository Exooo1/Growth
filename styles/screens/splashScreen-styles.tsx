import { StyleSheet } from "react-native";
import {
  BACKGROUND_COLOR_SCREEN,
  BACKGROUND_COLOR_SCREEN_BLACK,
} from "@/styles/constants/color-cst";
import { blStyles } from "@/styles/common/bl-styles";

export const splashScreenStyles = StyleSheet.create({
  container: {
    ...blStyles.defaultContainerWidthHeight,
    backgroundColor: BACKGROUND_COLOR_SCREEN_BLACK,
  },
  startApp: {
    position: "absolute",
    borderRadius: "100%",
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
});
