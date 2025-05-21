import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  PixelRatio,
  GestureResponderEvent,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import { Routes } from "@/constants/routes";
import { blStyles } from "@/styles/common/bl-styles";
import { textStyles } from "@/styles/common/text-styles";
import {
  COMMON_COLOR_GREEN,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";
import { verifyEmailStyles } from "@/styles/screens/auth/verifyEmail-styles";
import logo from "@/assets/images/logo.webp";
import { GradientButtonEnter } from "@/components/buttons/gradientButton";
import { VerificationCodeInput } from "@/components/auth/verificationCodeInput";

export default function VerifyEmail() {
  const [code, setCode] = useState<string>("");
  const sizeImg = PixelRatio.getPixelSizeForLayoutSize(45);

  const handleVerify = () => {
    if (code.length === 6) {
      router.push(Routes.SignIn);
    }
  };

  const handleCodeComplete = (verificationCode: string) => {
    setCode(verificationCode);
  };

  return (
    <View
      onTouchStart={(e: GestureResponderEvent) => {
        Keyboard.dismiss();
      }}
      style={[blStyles.blCnSpArColumn, verifyEmailStyles.container]}
    >
      <View style={[blStyles.blCnRow, { height: "20%", width: "100%" }]}>
        <Image
          style={{ width: sizeImg, height: sizeImg }}
          source={logo as ImageSourcePropType}
        />
        <View style={[blStyles.blCnCnColumn, { height: "100%", width: 180 }]}>
          <Text
            style={{
              ...textStyles.calBCenter,
              fontSize: 50,
              color: COMMON_COLOR_GREEN,
            }}
          >
            Verify Email
          </Text>
          <Text
            style={{
              ...textStyles.calStart,
              fontSize: 15,
              color: TEXT_COLOR_GREY,
              width: 170,
              textAlign: "left",
            }}
          >
            You're so close, just enter and join.
          </Text>
        </View>
      </View>

      <VerificationCodeInput
        onCodeComplete={handleCodeComplete}
        containerStyle={{ width: "85%" }}
      />

      <View style={{ width: "85%" }}>
        <GradientButtonEnter
          disabled={code.length < 6}
          title="Verify"
          onPress={handleVerify}
        />
      </View>
    </View>
  );
}
