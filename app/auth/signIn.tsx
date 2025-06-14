import { PasswordComponent } from "@/components/auth/passwordComponent";
import { GradientButtonEnter } from "@/components/buttons/GradientButton";
import { InputEnter } from "@/components/inputs/inputEnter";
import {
  INITIAL_SIGNIN_STATE,
  SIGNIN_VALIDATION_RULES,
} from "@/constants/hooks";
import { Routes } from "@/constants/routes";
import { useForm } from "@/hooks/useForm";
import { useErrorsStore } from "@/store/error-store";
import { useSettingsStore } from "@/store/settings-store";
import { blStyles } from "@/styles/common/bl-styles";
import { textStyles } from "@/styles/common/text-styles";
import {
  BUTTON_COLOR_GREY,
  COMMON_COLOR_GREEN,
  COMMON_COLOR_GREEN_FOCUS,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";
import { signInStyles } from "@/styles/screens/auth/signIn-styles";
import { SignInFormData } from "@/types/hooks/form-types";
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
import logo from "../../assets/images/logo.webp";
import { LOGO_SIZE } from "@/constants/pages";

export default function SignIn() {
  const addError = useErrorsStore((state) => state.addError);
  const { form, setFieldValue, validateFields } = useForm<SignInFormData>(
    INITIAL_SIGNIN_STATE,
    SIGNIN_VALIDATION_RULES
  );
  const [currentFocus, setCurrentFocus] = useState<string>("");

  const sizeImg = PixelRatio.getPixelSizeForLayoutSize(LOGO_SIZE);
  const statusBarHeight = useSettingsStore((state) => state.statusBarHeight);

  const handleBlur = () => {
    setCurrentFocus("");
  };

  const handleFocusInput = (input: string) => {
    setCurrentFocus(input);
  };

  const handlerSignIn = () => {
    const error = validateFields(["email", "password"]);
    if (error) {
      addError(error, ETypeError.ERROR);
      return;
    }
    router.push(Routes.Profile);
  };

  return (
    <View style={[signInStyles.container, blStyles.blStCnColum]}>
      <View
        style={[blStyles.blCnSpBtColumn, { width: "85%", height: "100%" }]}
        onTouchStart={Keyboard.dismiss}
      >
        <View
          style={[
            blStyles.blStCnColum,
            {
              width: "100%",
              height: "85%",
              gap: "3%",
            },
          ]}
        >
          <View
            style={[
              {
                marginTop: statusBarHeight * 2,
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
                Track your time, improve yourself, achieve more!
              </Text>
            </View>
          </View>
          <View
            style={[blStyles.blCnCnColumn, { width: "100%", gap: 10 }]}
            onTouchStart={(e: GestureResponderEvent) => {
              e.stopPropagation();
            }}
          >
            <Text style={[signInStyles.headerText, textStyles.calBStart]}>
              Sign In
            </Text>
            <View style={[blStyles.blCnStColum, { width: "100%", gap: 12 }]}>
              <InputEnter
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
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
              <PasswordComponent
                onFocus={() => handleFocusInput("password")}
                onBlur={handleBlur}
                onChangeText={(value) => setFieldValue("password", value)}
                value={form.password.value}
                viewStyle={
                  currentFocus === "password"
                    ? {
                        borderColor: COMMON_COLOR_GREEN_FOCUS,
                        borderWidth: 1.7,
                      }
                    : {}
                }
              />

              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  router.push(Routes.ForgotPassword);
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-end",
                    marginVertical: 5,
                    color: BUTTON_COLOR_GREY,
                  }}
                >
                  Forget password
                </Text>
              </TouchableOpacity>
              <GradientButtonEnter
                disabled={!(form.email.value && form.password.value)}
                title="Sign In"
                onPress={handlerSignIn}
              />
            </View>
          </View>
        </View>
        <View style={{ height: "15%" }}>
          <Text style={{ color: TEXT_COLOR_GREY }}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push(Routes.SignUp);
            }}
          >
            <Text
              style={[
                {
                  color: COMMON_COLOR_GREEN,
                  textDecorationLine: "underline",
                  textAlign: "center",
                  fontSize: 15,
                },
                textStyles.calCenter,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
