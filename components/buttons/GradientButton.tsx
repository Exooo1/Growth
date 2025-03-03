import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COMMON_COLOR_GREEN, GRADIENT_COLOR_GREEN } from '@/styles/constants/color-cst';
import { gradientButtonStyles } from '@/styles/components/gradient-buttons-styles';
import { textStyles } from '@/styles/common/text-styles';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

export const GradientButtonEnter = ({
  onPress,
  title,
}: GradientButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ width: '100%' }}
    >
      <LinearGradient
        colors={[GRADIENT_COLOR_GREEN, COMMON_COLOR_GREEN, GRADIENT_COLOR_GREEN]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={gradientButtonStyles.gradientButtonEnter}
      >
        <Text style={[textStyles.latoBCenter, { fontSize: 15, color: 'white', }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};