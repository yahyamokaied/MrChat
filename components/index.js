import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

import Screen from './Screen';
import * as AppButton from './AppButton';
import * as AppColor from './AppColor';
import * as AppStyle from './AppStyle';
import * as AppText from './AppText';
import AppTextInput from './AppTextInput';
import ContactItem from './ContactItem';
import LinearLayer from './LinearLayer';
import Icons from './Icons';
import TimeStampToDate from './TimeStampToDate';

import LoadingModal from './LoadingModal';
import UserItem from './UserItem';
import ChatItem from './ChatItem';

import ShowError from './ShowError';
import useUpdate from './hooks/useUpdate';


export {
    Screen, AppButton, AppColor, AppStyle, AppText,ImagePicker, 
    AppTextInput, ChatItem, ContactItem,ShowError, 
    LinearLayer, Icons, TimeStampToDate, UserItem,useUpdate,
    Icon, LinearGradient, LoadingModal
};