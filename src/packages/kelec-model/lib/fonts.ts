import { Platform } from "react-native";

export const fontFamilyBold = Platform.OS === 'ios' ? 'NouvelR' : 'NouvelRBold';
export const fontWeightBold = Platform.OS === 'ios' ? 'bold' : 'normal';

export const fontFamilyLight = Platform.OS === 'ios' ? 'NouvelR' : 'NouvelRLight';
export const fontWeightLight = Platform.OS === 'ios' ? '200' : 'normal';