import { PasswordComponent } from "@/components/auth/passwordComponent";
import { InputEnter } from "@/components/inputs/inputEnter";
import {
  INITIAL_SIGNUP_STATE,
  SIGNUP_VALIDATION_RULES,
} from "@/constants/hooks";
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
import { signInStyles } from "@/styles/screens/auth/signIn-styles";
import { UserFormData } from "@/types/hooks/form-types";
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
import logo from "../../assets/images/logo.webp";
import { GradientButtonEnter } from "@/components/buttons/GradientButton";

export default function SignUp() {
  const addError = useErrorsStore((state) => state.addError);
  const { form, setFieldValue, isValid } = useForm<UserFormData>(
    INITIAL_SIGNUP_STATE,
    SIGNUP_VALIDATION_RULES
  );
  const [currentFocus, setCurrentFocus] = useState<string>("");

  const hasError = isValid();
  const sizeImg = PixelRatio.getPixelSizeForLayoutSize(45);
  const statusBarHeight = useSettingsStore((state) => state.statusBarHeight);
  const height = useSharedValue(20);

  const animatedFocusBlur = useAnimatedStyle(() => {
    return {
      height: withTiming(`${height.value}%`, { duration: 300 }),
      overflow: "hidden",
      opacity: height.value === 8 ? 0 : 1,
    };
  });

  const scale = useSharedValue(1);

  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 400 }) }],
    };
  });

  const handleFocus = () => {
    height.value = 8;
  };

  const handleBlur = () => {
    height.value = 20;
    setCurrentFocus("");
  };
  const handleFocusInput = (input: string) => {
    setCurrentFocus(input);
    handleFocus();
  };
  const handlerSignUp = () => {
    if (hasError.length) {
      addError(hasError, ETypeError.ERROR);
      return;
    }
    router.push(Routes.VerifyEmail);
  };

  return (
    <View style={[signInStyles.container, blStyles.blStCnColum]}>
      <View
        style={[blStyles.blStCnColum, { width: "85%" }]}
        onTouchStart={Keyboard.dismiss}
      >
        <Animated.View
          style={[
            {
              marginTop: statusBarHeight,
            },
            blStyles.blCnRow,
            signInStyles.header,
            animatedFocusBlur,
          ]}
        >
          <Image
            style={{ width: sizeImg, height: sizeImg }}
            source={logo as ImageSourcePropType}
          />
          <View style={[blStyles.blCnStColum, { width: "55%" }]}>
            <Text
              style={{
                ...textStyles.calBCenter,
                fontSize: 50,
                color: COMMON_COLOR_GREEN,
              }}
            >
              Growth
            </Text>
            <Text
              style={{
                ...textStyles.calStart,
                fontSize: 15,
                color: TEXT_COLOR_GREY,
                width: "100%",
              }}
            >
              Time is your most valuable asset—use it wisely.
            </Text>
          </View>
        </Animated.View>
        <View
          style={[blStyles.blCnCnColumn, { width: "100%", gap: 10 }]}
          onTouchStart={(e: GestureResponderEvent) => {
            e.stopPropagation();
          }}
        >
          <Text style={[signInStyles.headerText, textStyles.calBStart]}>
            Sign Up
          </Text>
          <View style={[blStyles.blCnStColum, { width: "100%", gap: 12 }]}>
            <InputEnter
              placeholder="Name"
              autoCapitalize="words"
              value={form.name.value}
              onChangeText={(value) => setFieldValue("name", value)}
              onFocus={() => handleFocusInput("name")}
              onBlur={handleBlur}
              style={
                currentFocus === "name"
                  ? { borderColor: COMMON_COLOR_GREEN_FOCUS, borderWidth: 1.7 }
                  : {}
              }
            />
            <InputEnter
              placeholder="Surname"
              autoCapitalize="words"
              value={form.surname.value}
              onChangeText={(value) => setFieldValue("surname", value)}
              onFocus={() => handleFocusInput("surname")}
              onBlur={handleBlur}
              style={
                currentFocus === "surname"
                  ? { borderColor: COMMON_COLOR_GREEN_FOCUS, borderWidth: 1.7 }
                  : {}
              }
            />
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
                  ? { borderColor: COMMON_COLOR_GREEN_FOCUS, borderWidth: 1.7 }
                  : {}
              }
            />
            <PasswordComponent
              onFocus={() => handleFocusInput("password")}
              onBlur={handleBlur}
              onChangeText={(value) => setFieldValue("password", value)}
              value={form.password.value}
              viewStyle={
                currentFocus === "password"
                  ? { borderColor: COMMON_COLOR_GREEN_FOCUS, borderWidth: 1.7 }
                  : {}
              }
            />
            <GradientButtonEnter
              disabled={
                // !(form.name.value && form.email.value && form.password.value)
                false
              }
              title="Sign Up"
              onPress={handlerSignUp}
            />
          </View>
        </View>
        <View style={{ marginTop: "45%" }}>
          <Text style={{ color: TEXT_COLOR_GREY }}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push(Routes.SignIn);
            }}
          >
            <Text
              style={{
                color: COMMON_COLOR_GREEN,
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
