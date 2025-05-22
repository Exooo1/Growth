import { inputStyles } from "@/styles/components/inputs-styles";
import { BACKGROUND_COLOR_SCREEN } from "@/styles/constants/color-cst";
import { blStyles } from "@/styles/common/bl-styles";
import { StyleSheet } from "react-native";

export const signInStyles = StyleSheet.create({
  container: {
    ...blStyles.defaultContainerWidthHeight,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
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
