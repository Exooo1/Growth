import { PasswordComponent } from "@/components/auth/passwordComponent";
import { GradientButtonEnter } from "@/components/buttons/GradientButton";
import { InputEnter } from "@/components/inputs/inputEnter";
import {
  INITIAL_SIGNUP_STATE,
  SIGNUP_VALIDATION_RULES,
} from "@/constants/hooks";
import { LOGO_SIZE } from "@/constants/pages";
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
import logo from "../../assets/images/logo.webp";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validation";

export default function SignUp() {
  const addError = useErrorsStore((state) => state.addError);
  const { form, setFieldValue, validateFields } = useForm<UserFormData>(
    {
      name: { value: "", error: "" },
      surname: { value: "", error: "" },
      email: { value: "", error: "" },
      password: { value: "", error: "" },
    },
    {
      name: [(value) => validateName(value, "name")],
      surname: [(value) => validateName(value, "surname")],
      email: [validateEmail],
      password: [validatePassword],
    }
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

  const handlerSignUp = () => {
    const error = validateFields(["name", "surname", "email", "password"]);
    // if (error) {
    //   addError(error, ETypeError.ERROR);
    //   return;
    // }
    router.push(Routes.VerifyEmail);
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
                }}
              >
                Growth
              </Text>
              <Text
                style={{
                  ...textStyles.calStart,
                  fontSize: 15,
                  color: TEXT_COLOR_GREY,
                }}
              >
                Time is your most valuable asset—use it wisely.
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
                autoCorrect={false}
                spellCheck={false}
                style={
                  currentFocus === "name"
                    ? {
                        borderColor: COMMON_COLOR_GREEN_FOCUS,
                        borderWidth: 1.7,
                      }
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
                autoCorrect={false}
                spellCheck={false}
                style={
                  currentFocus === "surname"
                    ? {
                        borderColor: COMMON_COLOR_GREEN_FOCUS,
                        borderWidth: 1.7,
                      }
                    : {}
                }
              />
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
              <GradientButtonEnter
                // disabled={
                //   !(
                //     form.email.value &&
                //     form.password.value &&
                //     form.name.value &&
                //     form.surname.value
                //   )
                // }
                title="Sign Up"
                onPress={handlerSignUp}
              />
            </View>
          </View>
        </View>
        <View style={{ height: "15%" }}>
          <Text style={{ color: TEXT_COLOR_GREY }}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push(Routes.SignIn);
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
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
