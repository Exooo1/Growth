import { create } from "zustand";
import { ISettings } from "@/types/store/setttings-types";
import { Dimensions } from "react-native";
import Constants from "expo-constants";

export const useSettingsStore = create<ISettings>((set) => ({
  widthScreen: Dimensions.get("window").width,
  heightScreen: Dimensions.get("window").height,
  statusBarHeight: Constants.statusBarHeight ?? 0,
}));
