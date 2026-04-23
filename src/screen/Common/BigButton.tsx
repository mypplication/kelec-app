import { getBlackColour, getWhiteColour } from "../../lib/graphics/utils";
import { ActivityIndicator, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import Text from "./CustomText";
import Icon from "react-native-vector-icons/MaterialIcons";
import commonStyles, { fontFamilyBold, fontWeightBold } from "../../lib/graphics/commonStyle";

enum ButtonColours {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
    DELETE = 'DELETE'
}

type BigButtonProps = {
    readonly onPress: () => void;
    readonly text?: string;
    readonly colour: ButtonColours;
    readonly testID?: string;
    readonly icon?: string;
    readonly isLoading?: boolean;
    readonly disabled?: boolean;
}

function BigButton({ onPress, text, colour, testID, icon, isLoading, disabled }: BigButtonProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const getButtonProps = () => {
        switch (colour) {
            case ButtonColours.PRIMARY:
                return { backgroundColor: getBlackColour(isDarkMode), color: getWhiteColour(isDarkMode) };
            case ButtonColours.SECONDARY:
                return {
                    backgroundColor: getWhiteColour(isDarkMode), color: getBlackColour(isDarkMode),
                    borderColor: getBlackColour(isDarkMode), borderWidth: 1
                };
            case ButtonColours.DELETE:
                return { backgroundColor: 'red', color: 'white' };
        }
    }

    const getTextColours = () => {
        switch (colour) {
            case ButtonColours.PRIMARY:
                return getWhiteColour(isDarkMode);
            case ButtonColours.SECONDARY:
                return getBlackColour(isDarkMode);
            case ButtonColours.DELETE:
                return 'white';
        }
    }

    return (
        <View style={styles.flex}>
            <TouchableOpacity
                disabled={disabled}
                testID={testID}
                onPress={() => {
                    onPress();
                }}
                style={styles.fullScreenWidth}>
                <View
                    testID="bigButtonWrapper"
                    style={[styles.buttonWrapper, getButtonProps(), commonStyles.rowFlex]}>
                    {text && !isLoading && (
                        <Text
                            testID="bigButtonText"
                            style={[styles.buttonText, { color: getTextColours(), flexWrap: "wrap", paddingHorizontal: 50 }]}
                        >
                            {text}
                        </Text>

                    )}
                    {isLoading && (
                        <ActivityIndicator />
                    )}
                    {icon && !isLoading && (
                        <Icon
                            testID="bigButtonIcon"
                            name={icon}
                            size={20}
                            color={getTextColours()}
                            style={{ position: text ? 'absolute' : 'relative', right: text ? 10 : 0 }}

                        />

                    )}

                </View>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    flex: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    fullScreenWidth: {
        width: '100%'
    },
    buttonWrapper: {
        borderRadius: 10,
        minHeight: 50,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: fontFamilyBold,
        fontWeight: fontWeightBold
    }
});

export default BigButton;
export { ButtonColours };