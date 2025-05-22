import { ViewStyle } from "react-native";

export interface IVerificationCodeInput {
  length?: number;
  onCodeComplete?: (code: string) => void;
}
export interface IPasswordComponent {
  onFocus: () => void;
  onBlur: () => void;
  value: string;
  onChangeText: (value: string) => void;
  viewStyle?: ViewStyle;
}
