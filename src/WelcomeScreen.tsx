import { Platform, SafeAreaView, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import Text from "./screen/Common/CustomText";
import { useContext, useState } from "react";
import MainContext from "./lib/Contexts/MainContext";
import commonStyles, { fontFamilyBold, fontWeightBold } from "./lib/graphics/commonStyle";
import BigButton, { ButtonColours } from "./screen/Common/BigButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getAccentOrange, getBlackColour, getWhiteColour } from "./lib/graphics/utils";
import LazyRender from "./LazyRenderer";

function WelcomeScreen(): React.JSX.Element {

    const getWatchString = (): string => {
        // if plateform is android returns a string regarding android watches else returns a string regarding apple watches
        if (Platform.OS === "android") {
            return "androidWatchesInfo";
        } else {
            return "appleWatchesInfo";
        }
    }

    const isDarkMode = useColorScheme() === 'dark';

    const { languageHandler, storageHandler, checkOnboarding } = useContext(MainContext);

    // true if user has tried to continue without checking all
    const [shouldShowError, setShouldShowError] = useState<boolean>(false);

    const getCheckbox = (text: string, index: number) => {
        return (
            <BouncyCheckbox
                size={25}
                fillColor={getAccentOrange()}
                unFillColor={getWhiteColour(isDarkMode)}
                text={languageHandler.getTranslation(text)}
                iconStyle={{ borderColor: getAccentOrange() }}
                innerIconStyle={{ borderWidth: 2 }}
                testID={"checkbox" + index}
                textStyle={{ textDecorationLine: 'none', color: shouldShowError && !checked[index] ? 'red' : getBlackColour(isDarkMode) }}
                onPress={(hasChecked: boolean) => {
                    const newChecked = [...checked];
                    newChecked[index] = hasChecked;
                    setChecked(newChecked);
                }}

            />
        )
    }


    const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

    const getAmountOfCheckeds = (): number => {
        return checked.filter((value) => value).length;
    }

    // action when the button is pressed
    const handleButtonPress = async () => {
        // first check if all checkboxes are checked
        if (getAmountOfCheckeds() !== 4) {
            setShouldShowError(true);
            return;
        }
        // if all checkboxes are checked, continue
        await storageHandler.setHasSeenOnboarding();
        checkOnboarding();

    }

    return (
        <SafeAreaView testID="onboardingView" style={[commonStyles.flex, { backgroundColor: getWhiteColour(isDarkMode) }]}>
            <LazyRender delay={50}>
                <ScrollView style={commonStyles.flex} >
                    <View style={styles.content}>
                        <Text style={styles.mainTitle}>{languageHandler.getTranslation("welcomeOnKelec")} !</Text>
                        <View style={styles.cat}>
                            <Text style={styles.catTitle}>{languageHandler.getTranslation("whatIsKelec")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("kelecIsAnAppMadeByAStudent")} {languageHandler.getTranslation("itsPurposeIsToMakeABetterApp")}</Text>
                            <Text style={[styles.catText, styles.bold]}>{languageHandler.getTranslation("itIsNotAnOfficialApp")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("hereAreSomeInformationBeforeUsingKelec")}</Text>
                        </View>
                        <View style={styles.cat}>
                            <Text style={styles.catTitle}>{languageHandler.getTranslation("whatCanIDoWithKelec")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("kelecExtendsSomeMyRenaultFeatures")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("fasterLoadingTime")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("widgetIntegration")}</Text>
                            {Platform.OS === "ios" && (
                                <Text style={styles.catText}>{languageHandler.getTranslation("siriIntegration")}</Text>
                            )}
                            <Text style={styles.catText}>{languageHandler.getTranslation(getWatchString())}</Text>
                        </View>
                        <View style={styles.cat}>
                            <Text style={styles.catTitle}>{languageHandler.getTranslation("howDoesKelecWorks")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("kelecRequestsRenaultServers")} {languageHandler.getTranslation("bothAppsCanBeUsedInTheSameTime")}</Text>
                        </View>
                        <View style={styles.cat}>
                            <Text style={styles.catTitle}>{languageHandler.getTranslation("doesKelecCollectData")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("kelecDoesNotCollectData")} {languageHandler.getTranslation("dataIsStoredOnDeviceKeychain")}</Text>
                        </View>
                        <View style={styles.cat}>
                            <Text style={styles.catTitle}>{languageHandler.getTranslation("howCanIMakeSureOfIt")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("youCanListenToOutgoingConnections")}</Text>
                        </View>
                        <View style={styles.cat}>
                            <Text style={styles.catTitle}>{languageHandler.getTranslation("whatShouldIKnowBeforeUsingKelec")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("youMustHaveAnActiveMyRenaultConnection")}</Text>
                            <Text style={styles.catText}>{languageHandler.getTranslation("yourPasswordCannotContainAPlus")} {languageHandler.getTranslation("becauseOfNativeFeatures")}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        {getCheckbox("iUnderstandThatKelecIsNotAnOfficialApp", 0)}
                        {getCheckbox("iUnderstandThatKelecIsInBetaStatus", 1)}
                        {getCheckbox("thereIsNoPlusInMyPassword", 2)}
                        {getCheckbox("myCarHasAnActiveMyRenaultConnection", 3)}
                        <BigButton
                            colour={ButtonColours.PRIMARY}
                            onPress={handleButtonPress}
                            text={languageHandler.getTranslation("letsGo")}
                            testID="letsGoButton"
                        />
                    </View>
                </ScrollView>
            </LazyRender>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: 20
    },
    mainTitle: {
        fontSize: 30,
        fontFamily: fontFamilyBold,
        fontWeight: fontWeightBold,
        textAlign: 'center',
    },
    catTitle: {
        fontSize: 20,
        fontFamily: fontFamilyBold,
        fontWeight: fontWeightBold,
    },
    catText: {
        fontSize: 16,
    },
    cat: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    bold: {
        fontFamily: fontFamilyBold,
        fontWeight: fontWeightBold,
    },
    bottomView: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    }
});

export default WelcomeScreen;