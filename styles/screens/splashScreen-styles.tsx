import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR_SCREEN, BACKGROUND_COLOR_SCREEN_BLACK } from "@/styles/constants/color-cst";
import { DEFAULT_WIDTH_HEIGHT_SCREEN } from "@/styles/constants/size-cst";

export const splashScreenStyles = StyleSheet.create({
    container: {
        ...DEFAULT_WIDTH_HEIGHT_SCREEN,
        backgroundColor: BACKGROUND_COLOR_SCREEN_BLACK
    },
    startApp: {
        position: 'absolute',
        borderRadius: '100%',
        backgroundColor: BACKGROUND_COLOR_SCREEN
    }
})
