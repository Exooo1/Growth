import { useEffect } from "react";
import { SplashScreen } from "@/components/splashScreen";
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from "expo-font";
import { useSettingsStore } from "@/store/settings-store";
import { FONTS } from "@/constants/other";

export default function App() {
    const setWHScreen = useSettingsStore(state => state.setWHScreen);
    const [fontsLoaded] = useFonts(FONTS);

    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        setWHScreen(width, height, Constants.statusBarHeight ?? 0);

        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setWHScreen(window.width, window.height, Constants.statusBarHeight ?? 0);
        });

        return () => subscription.remove();
    }, []);

    return <SplashScreen />;
}
