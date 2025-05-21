import { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  GestureResponderEvent,
  Keyboard,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  COMMON_COLOR_GREEN,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";

interface VerificationCodeInputProps {
  length?: number;
  onCodeComplete?: (code: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const VerificationCodeInput = ({
  length = 6,
  onCodeComplete,
  containerStyle,
}: VerificationCodeInputProps) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>(Array(length).fill(null));
  const isCompleteRef = useRef(false);

  useEffect(() => {
    if (code.every((digit) => digit !== "") && !isCompleteRef.current) {
      isCompleteRef.current = true;
      const fullCode = code.join("");
      onCodeComplete?.(fullCode);
    } else if (!code.every((digit) => digit !== "")) {
      isCompleteRef.current = false;
    }
  }, [code, onCodeComplete]);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value) {
      // Move to next empty input
      for (let i = index + 1; i < newCode.length; i++) {
        if (newCode[i] === "") {
          inputRefs.current[i]?.focus();
          return;
        }
      }
      // If we're at the end or all filled after, move back to first empty
      for (let i = 0; i < index; i++) {
        if (newCode[i] === "") {
          inputRefs.current[i]?.focus();
          return;
        }
      }
    }
    // If all digits are entered, dismiss keyboard
    if (newCode.every((digit) => digit !== "")) {
      Keyboard.dismiss();
    }
  };

  return (
    <View
      onTouchStart={(e: GestureResponderEvent) => {
        e.stopPropagation();
      }}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        containerStyle,
      ]}
    >
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={{
            width: "15%",
            aspectRatio: 1,
            borderWidth: digit ? 1.5 : 1,
            borderColor: digit ? COMMON_COLOR_GREEN : TEXT_COLOR_GREY,
            borderRadius: 10,
            textAlign: "center",
            fontSize: 18,
            color: "white",
          }}
          placeholderTextColor={TEXT_COLOR_GREY}
          placeholder="*"
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(value) => handleCodeChange(index, value)}
        />
      ))}
    </View>
  );
};
