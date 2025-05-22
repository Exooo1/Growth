import { StyleProp, TextStyle, TextInputProps } from "react-native";

export interface IInputEnterProps extends Omit<TextInputProps, "style"> {
  placeholder: string;
  style?: StyleProp<TextStyle>;
}
