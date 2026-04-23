import { PropsWithoutRef } from "react";
import { Text as RNText, StyleSheet, useColorScheme } from "react-native";
import { getBlackColour } from "../../lib/graphics/utils";


type TextProps = PropsWithoutRef<{
    readonly style?: any;
    readonly children?: React.ReactNode;
    readonly testID?: string;
    readonly numberOfLines?: number;
    readonly adjustsFontSizeToFit?: boolean;
}>;

function Text({ style, ...otherProps }: TextProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const mergedStyles = [{ color: getBlackColour(isDarkMode) }, styles.defaultFont, style,];
    return <RNText testID={otherProps.testID} style={mergedStyles} {...otherProps} />;
};

const styles = StyleSheet.create({
    defaultFont: {
        fontFamily: 'NouvelR'
    }
});

export default Text;