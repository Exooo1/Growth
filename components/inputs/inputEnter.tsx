import { inputStyles } from "@/styles/components/inputs-styles";
import { TEXT_COLOR_GREY } from "@/styles/constants/color-cst";
import { IInputEnterProps } from "@/types/components/inputs-types";
import { TextInput } from "react-native";

export const InputEnter: React.FC<IInputEnterProps> = ({
  placeholder,
  style,
  ...props
}) => {
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
