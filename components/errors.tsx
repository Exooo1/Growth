import ErrorIcon from "../assets/icons/error.svg";
import SuccessIcon from "../assets/icons/success.svg";
import { useErrorsStore } from "@/store/error-store";
import { useSettingsStore } from "@/store/settings-store";
import { blStyles } from "@/styles/common/bl-styles";
import { errorsStyles } from "@/styles/components/errors-styles";
import { ETypeError, IError } from "@/types/store/errors-types";
import { Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { Circle, Text as SvgText } from "react-native-svg";
import Svg from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { ERRORS_COLOR_GREEN } from "@/styles/constants/color-cst";
import { ERRORS_COLOR_RED } from "@/styles/constants/color-cst";

export const ContentError = ({
  text,
  type,
  id,
  removeError,
}: IError & { removeError: (id: string) => void }) => {
  const [count, setCount] = useState(5);
  const [progress, setProgress] = useState(0);
  const translateX = useSharedValue(-200);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 0.85;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [id, removeError]);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(countInterval);
          removeError(id);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countInterval);
  }, [id, removeError]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const icon = type === ETypeError.ERROR ? <ErrorIcon /> : <SuccessIcon />;
  const color =
    type === ETypeError.ERROR ? ERRORS_COLOR_RED : ERRORS_COLOR_GREEN;

  return (
    <View style={{ width: "100%" }}>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={[blStyles.blCnSpArRow, errorsStyles.blError]}
          onPress={() => removeError(id)}
        >
          {icon}
          <Text
            style={{
              color,
              width: "40%",
              textAlign: "center",
            }}
          >
            {text}
          </Text>
          <Svg height="36" width="36">
            <Circle
              cx="18"
              cy="18"
              r="16"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            <SvgText
              x="18"
              y="18"
              textAnchor="middle"
              fill={color}
              fontSize="14"
              dy=".3em"
            >
              {count}
            </SvgText>
          </Svg>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export const Errors = () => {
  const errors = useErrorsStore((state) => state.errors);
  const removeError = useErrorsStore((state) => state.removeError);
  const statusBarHeight = useSettingsStore((state) => state.statusBarHeight);
  return (
    <View style={errorsStyles.container}>
      <View
        style={[
          errorsStyles.content,
          blStyles.blStStColum,
          { marginTop: statusBarHeight },
        ]}
      >
        {errors.map((error) => (
          <ContentError removeError={removeError} key={error.id} {...error} />
        ))}
      </View>
    </View>
  );
};
