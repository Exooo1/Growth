import logo from "@/assets/images/logo.webp";
import { VerificationCodeInput } from "@/components/auth/verificationCodeInput";
import { GradientButtonEnter } from "@/components/buttons/GradientButton";
import { LOGO_SIZE } from "@/constants/pages";
import { Routes } from "@/constants/routes";
import { useSettingsStore } from "@/store/settings-store";
import { blStyles } from "@/styles/common/bl-styles";
import { textStyles } from "@/styles/common/text-styles";
import {
  COMMON_COLOR_GREEN,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";
import { signInStyles } from "@/styles/screens/auth/signIn-styles";
import { verifyEmailStyles } from "@/styles/screens/auth/verifyEmail-styles";
import { router } from "expo-router";
import { useState } from "react";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Keyboard,
  PixelRatio,
  Platform,
  Text,
  View,
} from "react-native";

export default function VerifyEmail() {
  const [code, setCode] = useState<string>("");
  const sizeImg = PixelRatio.getPixelSizeForLayoutSize(LOGO_SIZE);
  const statusBarHeight = useSettingsStore((state) => state.statusBarHeight);

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
      <View style={[blStyles.blStCnColum, { width: "85%", height: "100%" }]}>
        <View
          style={[
            {
              marginTop: statusBarHeight * 2 + (Platform.OS === "ios" ? 0 : 10),
            },
            blStyles.blCnRow,
            signInStyles.header,
          ]}
        >
          <Image
            style={{ width: sizeImg, height: sizeImg }}
            source={logo as ImageSourcePropType}
          />
          <View style={[blStyles.blCnStColum, { width: "55%" }]}>
            <Text
              style={{
                ...textStyles.calBStart,
                fontSize: 30,
                color: COMMON_COLOR_GREEN,
                width: "100%",
              }}
            >
              Verify Email
            </Text>
            <Text
              style={{
                ...textStyles.calStart,
                fontSize: 15,
                color: TEXT_COLOR_GREY,
                width: "100%",
              }}
            >
              You're so close, just enter and join.
            </Text>
          </View>
        </View>
        <View
          style={[
            blStyles.blCnCnColumn,
            { width: "100%", marginTop: "50%", gap: "10%" },
          ]}
        >
          <VerificationCodeInput onCodeComplete={handleCodeComplete} />
          <View style={{ width: "100%" }}>
            <GradientButtonEnter
              disabled={code.length < 6}
              title="Verify"
              onPress={handleVerify}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
