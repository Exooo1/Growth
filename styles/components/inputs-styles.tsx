import { StyleSheet } from "react-native";
import { textStyles } from "../common/text-styles";
import { COMMON_COLOR_GREEN } from "../constants/color-cst";

export const inputStyles = StyleSheet.create({
  inputEnter: {
    backgroundColor: '#101012',
    width: '100%',
    height: 60,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: COMMON_COLOR_GREEN,
    padding: 10,
    color: 'white',
    fontSize: 14,
    ...textStyles.latoStart,
  }
})