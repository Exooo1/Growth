import { COMMON_COLOR_GREEN } from "@/styles/constants/color-cst";
import { router } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { blStyles } from "@/styles/common/bl-styles";
import { IButtonBack } from "@/types/components/buttons-types";
import BackIcon from "../../assets/icons/back.svg";
import { useSettingsStore } from "@/store/settings-store";

export const ButtonBack: React.FC<IButtonBack> = ({ name = "Back" }) => {
  const statusBarHeight = useSettingsStore((state) => state.statusBarHeight);
  return (
    <View
      style={[
        {
          marginTop: statusBarHeight + (Platform.OS === "ios" ? 0 : 10),
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
};
