import { ViewStyle } from "react-native";

export interface PasswordComponentProps {
  onFocus: () => void;
  onBlur: () => void;
  value: string;
  onChangeText: (value: string) => void;
  viewStyle?: ViewStyle;
}
