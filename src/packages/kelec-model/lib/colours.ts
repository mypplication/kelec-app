export const PRIMARY_COLOUR: string = '#63D2A3';
export const SECONDARY_COLOUR: string = '#2FC084';

export const BLUE_ONE: string = '#82A9F1';
export const BLUE_TWO: string = '#ADCAFF';

export const ORANGE_ONE: string = '#FFA95D';
export const ORANGE_TWO: string = '#FFBB80';
export const ORANGE_GRADIENT: string = 'linear-gradient(-45deg, #FFA95D 0%, #FFBB80 100%)';
export const NEUTRAL_ZERO: string = 'white';
export const NEUTRAL_50: string = '#F7F7F7';
export const NEUTRAL_100: string = '#E5E5E5';
export const NEUTRAL_200: string = '#CACACA';
export const NEUTRAL_300: string = '#7C7C7C';
export const NEUTRAL_400: string = '#4D4D4D';
export const NEUTRAL_450: string = '#292929';
export const NEUTRAL_500: string = '#1B1B1B';
export const NEUTRAL_FULL: string = 'black';
export const NEUTRAL_ZERO_30: string = 'rgba(255, 255, 255, 0.3)';
export const NEUTRAL_ZERO_70: string = 'rgba(255, 255, 255, 0.7)';

export const WHITE_COLOUR = (isDarkMode: boolean): string => isDarkMode ? NEUTRAL_FULL : NEUTRAL_ZERO;
export const BLACK_COLOUR = (isDarkMode: boolean): string => isDarkMode ? NEUTRAL_ZERO : NEUTRAL_FULL;