import {create} from "zustand";
import {ISettings} from "@/types/store/setttings-types";

export const useSettingsStore = create<ISettings>((set) => ({
    widthScreen: 0,
    heightScreen: 0,
    statusBarHeight: 0,
    setWHScreen: (widthScreen: number, heightScreen: number, statusBarHeight: number) => set({
        widthScreen,
        heightScreen,
        statusBarHeight
    }),
}))
