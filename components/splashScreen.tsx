import { Routes } from "@/constants/routes";
import { blStyles } from "@/styles/common/bl-styles";
import { splashScreenStyles } from "@/styles/screens/splashScreen-styles";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Dimensions,
  DimensionValue,
  ImageSourcePropType,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import logo from "../assets/images/logo.webp";

export const SplashScreen = () => {
  const logoSize = "30%";
  const sizeCircle = useSharedValue(0);
  const scaleCircle = useSharedValue(1);
  const scale = useSharedValue(1);
  const navigate = useRouter();

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const handleNavigate = () => {
    navigate.push(Routes.SignIn);
  };

  const startAppAnimation = () => {
    const width = Dimensions.get("window").width;
    sizeCircle.value = withTiming(width, {
      duration: 700,
      easing: Easing.inOut(Easing.ease),
    });
    scaleCircle.value = withTiming(
      3,
      { duration: 700, easing: Easing.inOut(Easing.ease) },
      () => {
        runOnJS(handleNavigate)();
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedCircle = useAnimatedStyle(() => {
    return {
      width: sizeCircle.value as DimensionValue,
      height: sizeCircle.value as DimensionValue,
      transform: [{ scale: scaleCircle.value }],
    };
  });

  useEffect(() => {
    setTimeout(() => startAppAnimation(), 1500);
  }, []);

  return (
    <View style={[blStyles.blCnRow, splashScreenStyles.container]}>
      <Animated.View style={[splashScreenStyles.startApp, animatedCircle]} />
      <Animated.Image
        style={[{ width: logoSize, height: logoSize }, animatedStyle]}
        source={logo as ImageSourcePropType}
        resizeMode="contain"
      />
    </View>
  );
};
