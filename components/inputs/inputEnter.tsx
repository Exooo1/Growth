import { inputStyles } from "@/styles/components/inputs-styles";
import { TEXT_COLOR_GREY } from "@/styles/constants/color-cst";
import { TextInput, TextInputProps, StyleSheet } from "react-native"

interface InputEnterProps extends Omit<TextInputProps, 'style'> {
  placeholder: string;
}

export const InputEnter = ({ placeholder, ...props }: InputEnterProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={TEXT_COLOR_GREY}
      style={inputStyles.inputEnter}
      {...props}
    />
  )
}