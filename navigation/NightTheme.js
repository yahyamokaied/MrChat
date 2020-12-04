import { DarkTheme } from '@react-navigation/native';
import * as AppColor from '../components/AppColor';

export default {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: AppColor.WhiteColor,
        
        background: AppColor.NightColor,
    },
};