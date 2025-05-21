import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR_SCREEN_ERROR } from "../constants/color-cst";

export const errorsStyles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    maxHeight: "100%",
    zIndex: 1,
  },
  content: {
    width: "100%",
    height: "100%",
  },
  blError: {
    marginTop: "1%",
    width: "95%",
    height: 60,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: BACKGROUND_COLOR_SCREEN_ERROR,
  },
});
