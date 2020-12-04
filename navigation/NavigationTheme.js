import { DefaultTheme } from '@react-navigation/native';
import * as AppColor from '../components/AppColor';

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: AppColor.SDarkColor,
        background: AppColor.WhiteColor,
    },
};