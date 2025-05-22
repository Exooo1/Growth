import { BACKGROUND_COLOR_SCREEN } from "@/styles/constants/color-cst";
import { COMMON_COLOR_GREEN } from "@/styles/constants/color-cst";
import { router } from "expo-router";
import { Image, TouchableOpacity, Text, View, Platform } from "react-native";

import BackIcon from "../../assets/icons/back.svg";
import { blStyles } from "@/styles/common/bl-styles";
import { IButtonBack } from "@/types/components/buttons-types";

export const ButtonBack: React.FC<IButtonBack> = ({ name = "Back" }) => (
  <View
    style={[
      {
        height: Platform.OS === "ios" ? 140 : 60,
        backgroundColor: BACKGROUND_COLOR_SCREEN,
        paddingLeft: "3%",
        justifyContent: "center",
        position: "absolute",
      },
    ]}
  >
    <TouchableOpacity
      onPress={router.back}
      style={[{ marginLeft: 10 }, blStyles.blCnRow]}
    >
      <BackIcon width={20} height={20} />
      <Text style={{ color: COMMON_COLOR_GREEN, fontSize: 16 }}>{name}</Text>
    </TouchableOpacity>
  </View>
);
