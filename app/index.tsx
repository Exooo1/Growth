import { SplashScreen } from "@/components/splashScreen";
import { FONTS } from "@/constants/other";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);

  return <SplashScreen />;
}
