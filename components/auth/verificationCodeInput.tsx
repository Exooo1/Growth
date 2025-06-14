import { authStyles } from "@/styles/components/auth-styles";
import {
  COMMON_COLOR_GREEN,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";
import { IVerificationCodeInput } from "@/types/components/auth-types";
import { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, Keyboard, TextInput, View } from "react-native";

export const VerificationCodeInput: React.FC<IVerificationCodeInput> = ({
  length = 6,
  onCodeComplete,
}) => {
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
      for (let i = index + 1; i < newCode.length; i++) {
        if (newCode[i] === "") {
          inputRefs.current[i]?.focus();
          return;
        }
      }
      for (let i = 0; i < index; i++) {
        if (newCode[i] === "") {
          inputRefs.current[i]?.focus();
          return;
        }
      }
    }
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
      ]}
    >
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[
            {
              fontWeight: "bold",
              borderWidth: digit ? 1.5 : 1,
              borderColor: digit ? COMMON_COLOR_GREEN : TEXT_COLOR_GREY,
            },
            authStyles.textInputCode,
          ]}
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
