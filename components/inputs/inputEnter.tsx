import { inputStyles } from "@/styles/components/inputs-styles";
import { TEXT_COLOR_GREY } from "@/styles/constants/color-cst";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

interface InputEnterProps extends Omit<TextInputProps, "style"> {
  placeholder: string;
  style?: StyleProp<TextStyle>;
}

export const InputEnter = ({
  placeholder,
  style,
  ...props
}: InputEnterProps) => {
  const anySettings = {
    returnKeyType: "done",
  } as const;

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={TEXT_COLOR_GREY}
      style={[inputStyles.inputEnter, style]}
      {...props}
      {...anySettings}
    />
  );
};
