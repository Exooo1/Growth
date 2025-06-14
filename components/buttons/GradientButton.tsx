import { textStyles } from "@/styles/common/text-styles";
import { gradientButtonStyles } from "@/styles/components/gradient-buttons-styles";
import {
  COMMON_COLOR_GREEN,
  GRADIENT_COLOR_GREEN,
} from "@/styles/constants/color-cst";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { IGradientButtonEnter } from "@/types/components/buttons-types";

export const GradientButtonEnter: React.FC<IGradientButtonEnter> = ({
  onPress,
  title,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={{ width: "100%", opacity: disabled ? 0.5 : 1 }}
    >
      <LinearGradient
        colors={[
          GRADIENT_COLOR_GREEN,
          COMMON_COLOR_GREEN,
          GRADIENT_COLOR_GREEN,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={gradientButtonStyles.gradientButtonEnter}
      >
        <Text
          style={[textStyles.robotoCenter, { fontSize: 15, color: "white" }]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
