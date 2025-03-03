import { StyleSheet } from "react-native";
import { blStyles } from "../common/bl-styles";

export const gradientButtonStyles = StyleSheet.create({
  gradientButtonEnter: {
    marginTop: 10,
    width: '100%',
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
    ...blStyles.blCnCnColumn,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  }
});