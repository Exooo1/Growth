import logo from "@/assets/images/logo.webp";
import { VerificationCodeInput } from "@/components/auth/verificationCodeInput";
import { GradientButtonEnter } from "@/components/buttons/gradientButton";
import { InputEnter } from "@/components/inputs/inputEnter";
import { FORGOT_PASSWORD_VALIDATION_RULES } from "@/constants/hooks";
import { Routes } from "@/constants/routes";
import { useForm } from "@/hooks/useForm";
import { useErrorsStore } from "@/store/error-store";
import { useSettingsStore } from "@/store/settings-store";
import { blStyles } from "@/styles/common/bl-styles";
import { textStyles } from "@/styles/common/text-styles";
import {
  COMMON_COLOR_GREEN,
  COMMON_COLOR_GREEN_FOCUS,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";
import { forgotPasswordStyles } from "@/styles/screens/auth/forgotPassword-styles";
import { ETypeError } from "@/types/store/errors-types";
import { router } from "expo-router";
import { useState } from "react";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Keyboard,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

enum ForgotPasswordStep {
  EMAIL,
  VERIFY_CODE,
  RESET_PASSWORD,
}

export default function ForgotPassword() {
  const [step, setStep] = useState<ForgotPasswordStep>(
    ForgotPasswordStep.EMAIL
  );
  const addError = useErrorsStore((state) => state.addError);
  const sizeImg = PixelRatio.getPixelSizeForLayoutSize(45);
  const statusBarHeight = useSettingsStore((state) => state.statusBarHeight);
  const [currentFocus, setCurrentFocus] = useState<string>("");
  const height = useSharedValue(30);

  const { form, setFieldValue, isValid } = useForm(
    {
      email: { value: "", error: "" },
      code: { value: "", error: "" },
      newPassword: { value: "", error: "" },
      confirmPassword: { value: "", error: "" },
    },
    FORGOT_PASSWORD_VALIDATION_RULES
  );

  const animatedFocusBlur = useAnimatedStyle(() => {
    return {
      height: withTiming(`${height.value}%`, { duration: 400 }),
    };
  });

  const handleFocus = () => (height.value = 20);
  const handleBlur = () => {
    height.value = 30;
    setCurrentFocus("");
  };
  const handleFocusInput = (input: string) => {
    setCurrentFocus(input);
    handleFocus();
  };

  const handleSubmitEmail = () => {
    const errors = isValid();
    if (errors) {
      addError(errors, ETypeError.ERROR);
      return;
    }
    setStep(ForgotPasswordStep.VERIFY_CODE);
  };

  const handleSubmitCode = () => {
    const errors = isValid();
    if (errors) {
      addError(errors, ETypeError.ERROR);
      return;
    }
    setStep(ForgotPasswordStep.RESET_PASSWORD);
  };

  const handleVerificationComplete = (verificationCode: string) => {
    setFieldValue("code", verificationCode);
  };

  const handleResetPassword = () => {
    const errors = isValid();
    if (errors) {
      addError(errors, ETypeError.ERROR);
      return;
    }
    // Логика сброса пароля
  };

  return (
    <View style={[blStyles.blCnSpArColumn, forgotPasswordStyles.container]}>
      <View
        style={[blStyles.blCnSpArColumn, { width: "85%", height: "100%" }]}
        onTouchStart={Keyboard.dismiss}
      >
        <Animated.View
          style={[
            {
              marginTop: statusBarHeight,
            },
            blStyles.blCnRow,
            { width: "100%" },
            step === ForgotPasswordStep.RESET_PASSWORD && animatedFocusBlur,
          ]}
        >
          <Image
            style={{ width: sizeImg, height: sizeImg }}
            source={logo as ImageSourcePropType}
          />
          <View style={[blStyles.blCnStColum, { width: "60%" }]}>
            <Text
              style={{
                ...textStyles.calBCenter,
                fontSize: 50,
                color: COMMON_COLOR_GREEN,
              }}
            >
              {step === ForgotPasswordStep.EMAIL && "Forgot Password"}
              {step === ForgotPasswordStep.VERIFY_CODE && "Verify Code"}
              {step === ForgotPasswordStep.RESET_PASSWORD && "Reset Password"}
            </Text>
            <Text
              style={{
                ...textStyles.calStart,
                fontSize: 15,
                color: TEXT_COLOR_GREY,
                width: "100%",
              }}
            >
              {step === ForgotPasswordStep.EMAIL &&
                "Enter your email to reset your password."}
              {step === ForgotPasswordStep.VERIFY_CODE &&
                "Enter the code sent to your email."}
              {step === ForgotPasswordStep.RESET_PASSWORD &&
                "Enter your new password."}
            </Text>
          </View>
        </Animated.View>
        <View
          style={[blStyles.blCnCnColumn, { width: "100%", gap: 10 }]}
          onTouchStart={(e: GestureResponderEvent) => {
            e.stopPropagation();
          }}
        >
          <View style={[blStyles.blCnStColum, { width: "100%", gap: 12 }]}>
            {step === ForgotPasswordStep.EMAIL && (
              <>
                <InputEnter
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email.value}
                  onChangeText={(value) => setFieldValue("email", value)}
                  onFocus={() => handleFocusInput("email")}
                  onBlur={handleBlur}
                  style={
                    currentFocus === "email"
                      ? {
                          borderColor: COMMON_COLOR_GREEN_FOCUS,
                          borderWidth: 1.7,
                        }
                      : {}
                  }
                />
                <GradientButtonEnter
                  disabled={!form.email.value || !!form.email.error}
                  title="Next"
                  onPress={handleSubmitEmail}
                />
              </>
            )}
            {step === ForgotPasswordStep.VERIFY_CODE && (
              <>
                <VerificationCodeInput
                  onCodeComplete={handleVerificationComplete}
                  containerStyle={{ marginBottom: 20 }}
                />
                <GradientButtonEnter
                  disabled={
                    !form.code.value ||
                    form.code.value.length < 6 ||
                    !!form.code.error
                  }
                  title="Verify"
                  onPress={handleSubmitCode}
                />
              </>
            )}
            {step === ForgotPasswordStep.RESET_PASSWORD && (
              <>
                <InputEnter
                  placeholder="New Password"
                  secureTextEntry
                  value={form.newPassword.value}
                  onChangeText={(value) => setFieldValue("newPassword", value)}
                  onFocus={() => handleFocusInput("newPassword")}
                  onBlur={handleBlur}
                  style={
                    currentFocus === "newPassword"
                      ? {
                          borderColor: COMMON_COLOR_GREEN_FOCUS,
                          borderWidth: 1.7,
                        }
                      : {}
                  }
                />
                {form.newPassword.error && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {form.newPassword.error}
                  </Text>
                )}
                <InputEnter
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={form.confirmPassword.value}
                  onChangeText={(value) =>
                    setFieldValue("confirmPassword", value)
                  }
                  onFocus={() => handleFocusInput("confirmPassword")}
                  onBlur={handleBlur}
                  style={
                    currentFocus === "confirmPassword"
                      ? {
                          borderColor: COMMON_COLOR_GREEN_FOCUS,
                          borderWidth: 1.7,
                        }
                      : {}
                  }
                />
                {form.confirmPassword.error && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {form.confirmPassword.error}
                  </Text>
                )}
                <GradientButtonEnter
                  disabled={
                    !form.newPassword.value ||
                    !form.confirmPassword.value ||
                    !!form.newPassword.error ||
                    !!form.confirmPassword.error
                  }
                  title="Reset Password"
                  onPress={handleResetPassword}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
