import { inputStyles } from "@/styles/components/inputs-styles";
import { BACKGROUND_COLOR_SCREEN } from "@/styles/constants/color-cst";
import { DEFAULT_WIDTH_HEIGHT_SCREEN } from "@/styles/constants/size-cst";
import { StyleSheet } from "react-native";

export const signInStyles = StyleSheet.create({
  container: {
    ...DEFAULT_WIDTH_HEIGHT_SCREEN,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
  },
  headerText: {
    alignSelf: "flex-start",
    fontSize: 30,
    color: "white",
  },
  passwordComponent: {
    ...inputStyles.inputEnter,
  },
});
