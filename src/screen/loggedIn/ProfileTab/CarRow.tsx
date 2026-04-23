import { useContext, useEffect, useRef, useState } from "react";
import CarModel from "../../../lib/clients/cars/carModel";
import Text from "../../Common/CustomText";
import { StyleSheet, View, Image, TouchableOpacity, useColorScheme, Animated, Alert } from "react-native";
import commonStyles from "../../../lib/graphics/commonStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatPlate, getBlackColour, getCarMakerLogo, getGrayBackgroundColour } from "../../../lib/graphics/utils";
import MainContext from "../../../lib/Contexts/MainContext";
import { MoveDirection } from "../../../lib/clients/accounts/account";
import RenameModal from "./RenameModal";
import { RenaultCredentials } from "../../../lib/clients/carMakers/renaultCredentials";

type CarRowProps = {
    readonly carModel: CarModel;
    readonly index: number; // the index of the car among the user cars
    readonly editMode: boolean; // if the user is in edit mode (to move cars up and down)
    readonly email: string; // the email of the user, used to store the JWT token
}

function CarRow({ carModel, index, editMode, email }: CarRowProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const { languageHandler } = useContext(MainContext);

    const [image, setImage] = useState<string>('');

    useEffect(() => {
        loadCarImage();
        handleShake();
    }, [editMode]);

    const loadCarImage = async () => {
        const image = await AsyncStorage.getItem(`${carModel.getVin()}/image`);
        if (image) {
            setImage(image);
        }
    }

    // shake animation
    let loopedAnimation: any;
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const animationSequence =
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 2, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -2, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 2, duration: 100, useNativeDriver: true })
        ]);

    const handleShake = () => {
        // handle shake animation if edit mode is  enabled
        if (editMode) {
            // need to share cars
            loopedAnimation = Animated.sequence([
                Animated.delay(200 * index),
                Animated.loop(animationSequence)
            ]);
            loopedAnimation.start();
        } else {
            // stop shaking
            if (loopedAnimation)
                loopedAnimation.stop();
            shakeAnimation.setValue(0);
        }
    }

    const [shouldDisplayRenameModal, setShouldDisplayRenameModal] = useState(false);

    const { currentUser, storageHandler, reloadUser } = useContext(MainContext);
    return (
        <Animated.View style={[styles.card, { backgroundColor: getGrayBackgroundColour(isDarkMode), transform: [{ translateX: shakeAnimation }] }]}>
            <RenameModal shouldDisplay={shouldDisplayRenameModal} setShouldShowModal={setShouldDisplayRenameModal} vin={carModel.getVin()} currentCarName={carModel.getModel()} />
            {/* left side */}
            <View style={[commonStyles.rowFlex, { gap: 10, alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }]}>
                <View style={[commonStyles.rowFlex, { gap: 10, alignItems: 'center' }]}>
                    <Image style={styles.logo} source={getCarMakerLogo(carModel.getCarmaker(), isDarkMode)} />
                    <View style={{ gap: 5 }}>
                        <Text testID="profileCarRowModel" style={{
                            flexShrink: 1,
                            flexWrap: 'wrap',
                        }}>{carModel.getModel()}</Text>
                        <Text
                            testID="vinOrRegistrationCarRow"
                            style={commonStyles.verySmallText}>
                            {carModel.getRegistrationNumber() == undefined ?
                                carModel.getVin() : formatPlate(carModel.getRegistrationNumber())
                            }
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    testID="selectAsDefaultCar"
                    onPress={async () => {
                        // select as default car
                        currentUser.setSelectedCar(carModel.getVin());
                        await storageHandler.saveAccount(currentUser);
                        reloadUser();
                    }}
                >
                    <View
                        testID="selectAsDefaultCarIcon"
                        style={[commonStyles.centerFlex,
                        styles.rounded,
                        {
                            backgroundColor: carModel.getVin() === currentUser.getSelectedCar() ? getBlackColour(isDarkMode) : getGrayBackgroundColour(isDarkMode),
                            borderColor: getBlackColour(isDarkMode)
                        }]}>
                        <Icon name="check" color={getGrayBackgroundColour(isDarkMode)} size={20} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.carImage} source={{ uri: `data:image/jpeg;base64,${image}` }} />
                </View>

                {/* right part */}
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    {editMode ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, gap: 10, marginVertical: 5 }}>
                            {/* to move the car up */}
                            <View
                                style={[commonStyles.centerFlex, styles.iconWrapper]}>
                                {index !== 0 && (
                                    <TouchableOpacity
                                        testID="moveTheCarUp"
                                        onPress={async () => {
                                            // move up
                                            currentUser.moveCar(carModel.getVin(), MoveDirection.UP);
                                            await storageHandler.saveAccount(currentUser);
                                            reloadUser();

                                        }}
                                    >
                                        <View style={styles.iconWrapper}>
                                            <Icon name="expand-less" color={getBlackColour(isDarkMode)} size={20} style={{ paddingBottom: 10 }} />
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>{languageHandler.getTranslation("toTheTop")}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )}
                            </View>
                            {/* to move the car down */}
                            <View
                                style={[commonStyles.centerFlex, styles.iconWrapper]}>
                                {index !== (currentUser.getCars().length - 1) && (
                                    <TouchableOpacity
                                        testID="moveTheCarDown"
                                        onPress={async () => {
                                            // move down
                                            currentUser.moveCar(carModel.getVin(), MoveDirection.DOWN);
                                            await storageHandler.saveAccount(currentUser);
                                            reloadUser();
                                        }}
                                    >
                                        <View style={styles.iconWrapper}>
                                            <Icon name="expand-more" color={getBlackColour(isDarkMode)} size={20} style={{ paddingBottom: 10 }} />
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>{languageHandler.getTranslation("toTheBottom")}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, gap: 10, marginVertical: 5 }}>
                            {/* to edit car creds */}
                            <View
                                style={[commonStyles.centerFlex, styles.iconWrapper]}>
                                <TouchableOpacity
                                    testID="renameCarOpenButton"
                                    onPress={() => {
                                        // update car creds
                                        setShouldDisplayRenameModal(true);
                                    }}
                                >
                                    <View style={styles.iconWrapper}>
                                        <MaterialIcon name="pen" color={getBlackColour(isDarkMode)} size={20} style={{ paddingBottom: 10 }} />
                                        <Text style={{
                                            textAlign: 'center'
                                        }}
                                            numberOfLines={2}
                                            adjustsFontSizeToFit
                                        >{languageHandler.getTranslation("renameCar")}</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            {/* to delete the car */}
                            <View
                                style={[commonStyles.centerFlex, styles.iconWrapper]}>
                                <TouchableOpacity
                                    testID="deleteTheCar"
                                    onPress={() => {
                                        // display a modal to confirm the deletion
                                        Alert.alert(
                                            languageHandler.getTranslation("deleteVehicle"),
                                            languageHandler.getTranslation("deleteVehicleMessage"),
                                            [
                                                {
                                                    text: languageHandler.getTranslation("cancel"),
                                                    onPress: () => { },
                                                    style: "cancel",
                                                },
                                                {
                                                    text: languageHandler.getTranslation("confirm"),
                                                    onPress: () => {
                                                        (async () => {
                                                            // delete the car
                                                            await RenaultCredentials.clearCredentials(email);
                                                            currentUser.deleteACar(carModel.getVin());
                                                            await storageHandler.saveAccount(currentUser);
                                                            reloadUser();
                                                        })();
                                                    }
                                                }
                                            ]
                                        )
                                    }}
                                >
                                    <View style={styles.iconWrapper}>
                                        <MaterialIcon name="delete-empty" color={getBlackColour(isDarkMode)} size={20} style={{ paddingBottom: 10 }} />
                                        <Text style={{
                                            textAlign: 'center'
                                        }}
                                            numberOfLines={2}
                                            adjustsFontSizeToFit
                                        >{languageHandler.getTranslation("deleteVehicle")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Animated.View >
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 7,
        marginBottom: 15,
        flexDirection: 'column',
    },
    carImage: {
        height: 100,
        width: '100%',
        transform: [{ scale: 1.15 }],
        resizeMode: 'contain'
    },
    rounded: {
        borderRadius: 100,
        borderWidth: 1,
    },
    iconWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default CarRow;