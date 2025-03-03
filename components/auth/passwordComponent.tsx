import { blStyles } from "@/styles/common/bl-styles"
import { COMMON_COLOR_GREEN, TEXT_COLOR_GREY } from "@/styles/constants/color-cst"
import { signInStyles } from "@/styles/screens/auth/signIn-styles"
import { useEffect, useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated"

import Svg, { Path } from "react-native-svg"

export const PasswordComponent = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const scale = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 11,
        velocity: -20,
        stiffness: 60,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    scale.value = withSequence(
      withTiming(0, { duration: 150 }),
      withSpring(1, {
        damping: 10,
        velocity: -20,
        stiffness: 60,
        mass: 0.5
      })
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      width: 32,
      height: 32,
    };
  }, []);

  return (
    <View style={[blStyles.blStCnRow, signInStyles.passwordComponent, { width: '100%', gap: 10 }]}>
      <TextInput
        placeholder="Password"
        secureTextEntry={isPasswordVisible}
        placeholderTextColor={TEXT_COLOR_GREY}
        style={{
          width: '85%',
          height: 60,
          color: 'white',
          fontFamily: 'lato'
        }}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Animated.View style={animatedStyle}>
          <Svg width="100%" height="100%" viewBox="0 0 15 15">
            {!isPasswordVisible ? (
              <Path
                fill={COMMON_COLOR_GREEN}
                d="M7.5 9C5.186 9 3.561 7.848 2.497 6.666a9.4 9.4 0 0 1-1.449-2.164l-.08-.18l-.004-.007v-.001L.5 4.5l-.464.186v.002l.003.004l.026.063l.078.173a10.4 10.4 0 0 0 1.61 2.406C2.94 8.652 4.814 10 7.5 10zm7-4.5l-.464-.186l-.003.008l-.015.035l-.066.145a9.4 9.4 0 0 1-1.449 2.164C11.44 7.848 9.814 9 7.5 9v1c2.686 0 4.561-1.348 5.747-2.666a10.4 10.4 0 0 0 1.61-2.406a6 6 0 0 0 .104-.236l.002-.004v-.001h.001zM8 12V9.5H7V12zm-6.646-1.646l2-2l-.708-.708l-2 2zm10.292-2l2 2l.708-.708l-2-2z"
              />
            ) : (
              <Path
                fill={COMMON_COLOR_GREEN}
                d="M7.5 7.686V9a1.5 1.5 0 0 1 0-3zM7.5 5a2.5 2.5 0 0 0 0 5v3c-2.686 0-4.561-1.348-5.747-2.665a10.4 10.4 0 0 1-1.61-2.407a6 6 0 0 1-.099-.222l-.006-.014l-.001-.004l-.001-.002L.5 7.5l-.464.186a.5.5 0 0 1 0-.372l.066.027l-.066-.028v-.001l.002-.004l.006-.014a4 4 0 0 1 .1-.222a10.4 10.4 0 0 1 1.61-2.406C2.938 3.348 4.813 2 7.5 2zm0 1v3a1.5 1.5 0 1 0 0-3m0 4a2.5 2.5 0 0 0 0-5V2c2.686 0 4.561 1.348 5.747 2.666a10.4 10.4 0 0 1 1.61 2.406a6 6 0 0 1 .099.222l.005.014l.002.004l.001.002l-.364.146l.364-.146a.5.5 0 0 1 0 .372L14.5 7.5l.464.187v.001l-.003.004l-.005.014a3 3 0 0 1-.1.222a10.4 10.4 0 0 1-1.61 2.406C12.062 11.653 10.187 13 7.5 13z"
              />
            )}
          </Svg>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}