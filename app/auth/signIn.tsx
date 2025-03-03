import { InputEnter } from "@/components/inputs/inputEnter";
import { INITIAL_SIGNIN_STATE, SIGNIN_VALIDATION_RULES } from "@/constants/hooks";
import { useForm } from "@/hooks/useForm";
import { useSettingsStore } from "@/store/settings-store";
import { blStyles } from "@/styles/common/bl-styles";
import { textStyles } from "@/styles/common/text-styles";
import { COMMON_COLOR_GREEN, TEXT_COLOR_GREY } from "@/styles/constants/color-cst";
import { signInStyles } from "@/styles/screens/auth/signIn-styles";
import { SignInFormData } from "@/types/hooks/form-types";
import { GestureResponderEvent, Image, Keyboard, PixelRatio, Text, TouchableOpacity, View } from "react-native";
import logo from '../../assets/images/logo.webp';
import { GradientButtonEnter } from "@/components/buttons/GradientButton";
import { Svg, Path } from 'react-native-svg';
import { PasswordComponent } from "@/components/auth/passwordComponent";

export default function SignIn() {
    const { form, setFieldValue } = useForm<SignInFormData>(
        INITIAL_SIGNIN_STATE,
        SIGNIN_VALIDATION_RULES
    );
    const sizeImg = PixelRatio.getPixelSizeForLayoutSize(50);
    const statusBarHeight = useSettingsStore(state => state.statusBarHeight)
    return <View style={[signInStyles.container, blStyles.blStCnColum]}>
        <View style={[blStyles.blStCnColum, { width: '85%', height: '100%' }]} onTouchStart={(e: GestureResponderEvent) => {
            Keyboard.dismiss();
        }}>
            <View style={[{ marginTop: statusBarHeight }, blStyles.blCnRow, signInStyles.header,]}>
                <Image style={{ width: sizeImg, height: sizeImg }} source={logo} />
                <View style={[blStyles.blCnStColum, { height: '100%' }]}>
                    <Text style={{ ...textStyles.calBCenter, fontSize: 50, color: COMMON_COLOR_GREEN }}>Growth</Text>
                    <Text style={{ ...textStyles.calStart, fontSize: 15, color: TEXT_COLOR_GREY }}>Let's master time together</Text>
                </View>
            </View>
            <View style={[blStyles.blCnCnColumn, { width: '100%', gap: 10 }]} onTouchStart={(e: GestureResponderEvent) => {
                e.stopPropagation();
            }}>
                <Text style={[signInStyles.headerText, textStyles.calBStart]}>Sign In</Text>
                <View style={[blStyles.blCnStColum, { width: '100%', gap: 12 }]}>
                    <InputEnter
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email.value}
                        onChangeText={(value) => setFieldValue('email', value)}
                    />
                    <PasswordComponent />
                    <GradientButtonEnter
                        title="Sign In"
                        onPress={() => console.log('Login pressed')}
                    />
                </View>
            </View>
        </View>
    </View>
}