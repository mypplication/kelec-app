import React, { useContext } from "react";
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../../Common/CustomText";
import commonStyles from "../../../lib/graphics/commonStyle";
import MainContext from "../../../lib/Contexts/MainContext";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAccentOrange } from "../../../lib/graphics/utils";
import { SafeAreaView } from "react-native-safe-area-context";

function TopSettingsView(): React.JSX.Element {


    const { languageHandler, currentUser } = useContext(MainContext);


    const getTitle = (): React.ReactNode => {
        // if the user has first name and last name, display it else display "Settings" string
        let found = 0;
        let firstName = '';
        let lastName = '';
        // loop of user cars to find if there is a renault with firstname and last name
        currentUser.getCars().forEach(car => {
            if (car.firstName !== undefined && car.lastName !== undefined) {
                found = 1;
                firstName = car.firstName;
                lastName = car.lastName;
            }
        });

        if (found === 1) {
            return <Text testID="settingsTitle" style={[commonStyles.navTitle, { color: 'white' }]}>{firstName.toUpperCase()}{'\n'}{lastName.toUpperCase()}</Text>
        }

        return <Text testID="settingsTitle" style={[commonStyles.navTitle, { color: 'white' }]}>{languageHandler.getTranslation("settings").toUpperCase()}</Text>
    }

    return (
        <View style={{ backgroundColor: getAccentOrange(), paddingHorizontal: 15, paddingTop: 10, position: 'relative' }}>
            <SafeAreaView edges={['top']}>
                <Text style={[commonStyles.navTitle]}>{getTitle()}</Text>
                <View style={[commonStyles.rowFlex, commonStyles.centerFlex, commonStyles.gap5, styles.marginVertical, { flexWrap: "wrap" }]}>
                    <Text style={{ color: 'white' }}>{languageHandler.getTranslation('developedWith')} </Text>
                    <MaterialIcon name="heart" size={15} color="red"></MaterialIcon>
                    <Text style={{ color: 'white' }}>{languageHandler.getTranslation('by')}</Text>
                    <TouchableOpacity
                        testID='linkedinButton'
                        onPress={() => {
                            Linking.openURL('https://www.linkedin.com/in/kelyan-pegeotselme/');
                        }}>
                        <Text style={{ color: 'lightblue' }}>Kelyan Pegeot Selme</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <View style={{ width: Dimensions.get('window').width, height: 100, backgroundColor: getAccentOrange(), position: 'absolute', bottom: 0, transform: [{ translateY: 100 }] }}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    marginVertical: {
        marginVertical: 10
    },
    mediumTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    }
});

export default TopSettingsView;