import { useContext } from "react";
import { StyleSheet, Switch, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import MainContext from "../../../../../lib/Contexts/MainContext";
import { LeasingData } from "../../../../../lib/clients/cars/carTypes/carType";
import Text from "../../../../../screen/Common/CustomText";
import DatePickerField from "../../../../../screen/loggedIn/CarsTab/CarView/Elements/DatePicker";
import TextInput from "../../../../../screen/Common/TextInput";
import KelecCard from "../../../../kelec-model/view/Card";
import { CommonStyles } from "../../../../kelec-model/view/Styles";
import { spacerL, spacerM, spacerXL } from "../../../../kelec-model/view/Spacers";
import { BLACK_COLOUR, PRIMARY_COLOUR } from "../../../../kelec-model/lib/colours";
import { subTitle, textBody } from "../../../../kelec-model/view/Titles";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
    readonly isError: boolean,
    readonly leasingData: LeasingData | undefined,
    readonly setLeasingData: (leasingData: LeasingData | undefined) => void,
}

const CarModelChoiceLeasing = ({ isError, leasingData, setLeasingData }: Props) => {
    const isDarkMode = useColorScheme() === 'dark';

    const { languageHandler } = useContext(MainContext);


    const handleLeasingSwitchChange = async () => {
        if (leasingData) {
            setLeasingData(undefined);
        } else {
            setLeasingData({});
        }
    };

    return (
        <KelecCard>
            <View
                style={
                    [
                        CommonStyles.container,
                        {
                            padding: spacerM,
                            gap: spacerL,

                        }
                    ]
                }>
                <RowView>
                    <TouchableWithoutFeedback
                        testID="leasingSwitch"
                        onPress={handleLeasingSwitchChange}
                    >
                        <View
                            style={
                                styles.settingText
                            }
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: spacerM
                                }}
                            >
                                <Icon
                                    name="car-rental"
                                    size={spacerXL}
                                    color={BLACK_COLOUR(isDarkMode)}
                                />
                                <Text style={
                                    [
                                        textBody,
                                        styles.leftText
                                    ]
                                }>
                                    {languageHandler.getTranslation("myCarIsLeasing")}
                                </Text>
                            </View>
                            <Switch
                                value={leasingData !== undefined}
                                onValueChange={handleLeasingSwitchChange}
                                trackColor={{ true: PRIMARY_COLOUR }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </RowView>
                {leasingData && (
                    <View
                        style={{
                            gap: spacerM
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: spacerL,
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    gap: spacerM,
                                    flex: 1,
                                }}
                            >
                                <Text
                                    testID="leasingStartDate"
                                    style={
                                        [
                                            subTitle,
                                            styles.leftText,
                                            {
                                                color: isError && leasingData?.startDate == null ? 'red' : BLACK_COLOUR(isDarkMode),
                                            }
                                        ]
                                    }
                                >
                                    {languageHandler.getTranslation("leasingStartDate")}
                                </Text>
                                <DatePickerField
                                    updateDate={(date: Date) => {
                                        setLeasingData({ ...leasingData, startDate: date })
                                    }}
                                    dateValue={leasingData?.startDate}
                                    placeholder={"start_date"}
                                />
                            </View>
                            <View
                                style={{
                                    gap: spacerM,
                                    flex: 1,
                                }}
                            >
                                <Text
                                    testID="leasingEndDate"
                                    style={
                                        [
                                            subTitle,
                                            styles.leftText,
                                            {
                                                color: isError && leasingData?.endDate == null ? 'red' : BLACK_COLOUR(isDarkMode),
                                            }
                                        ]
                                    }
                                >
                                    {languageHandler.getTranslation("leasingEndDate")}
                                </Text>
                                <DatePickerField
                                    updateDate={(date: Date) => {
                                        setLeasingData({ ...leasingData, endDate: date })
                                    }}
                                    dateValue={leasingData?.endDate}
                                    placeholder={"end_date"}
                                />
                            </View>

                        </View>
                        <RowView>
                            <Text
                                testID="totalMileageAllowed"
                                style={
                                    [
                                        subTitle,
                                        styles.leftText,
                                        {
                                            color: isError && leasingData?.totalMileage == null ? 'red' : BLACK_COLOUR(isDarkMode),
                                        }
                                    ]
                                }
                            >
                                {languageHandler.getTranslation("totalMileageAllowed")}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <TextInput
                                    testID="totalMileageAllowedInput"
                                    placeholder={languageHandler.getTranslation("1 234")}
                                    value={leasingData?.totalMileage?.toString()}
                                    onChangeText={(text) => {
                                        // to update
                                        let value = text.replace(/\D/g, '');
                                        const mileage = parseInt(value);
                                        if (!isNaN(mileage)) {
                                            setLeasingData({ ...leasingData, totalMileage: mileage })
                                        } else {
                                            setLeasingData({ ...leasingData, totalMileage: undefined })
                                        }
                                    }}
                                    keyboardType="numeric"
                                />
                                <Text>km/mi</Text>
                            </View>
                        </RowView>
                        <RowView>
                            <Text
                                testID="mileageAtStart"
                                style={
                                    [
                                        subTitle,
                                        styles.leftText,
                                        {
                                            color: isError && leasingData?.startMileage == null ? 'red' : BLACK_COLOUR(isDarkMode),
                                        }
                                    ]
                                }
                            >
                                {languageHandler.getTranslation("mileageAtStart")}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <TextInput
                                    testID="mileageAtStartInput"
                                    placeholder={languageHandler.getTranslation("1 234")}
                                    value={leasingData?.startMileage?.toString()}
                                    onChangeText={(text) => {
                                        // to update
                                        let value = text.replace(/\D/g, '');
                                        const mileage = parseInt(value);
                                        if (!isNaN(mileage)) {
                                            setLeasingData({ ...leasingData, startMileage: mileage })
                                        } else {
                                            setLeasingData({ ...leasingData, startMileage: undefined })
                                        }
                                    }}
                                    keyboardType="numeric"
                                />
                                <Text>km/mi</Text>
                            </View>
                        </RowView>
                    </View>
                )}
            </View>
        </KelecCard>
    )
};

type RowViewProps = {
    readonly children: React.ReactNode,
}
export const RowView = ({ children }: RowViewProps) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: spacerL
            }}
        >
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    leftText: {
        flexWrap: 'wrap',
        flexShrink: 1
    },
    settingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacerM,
        flex: 1,
        justifyContent: 'space-between',
    },
    settingText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacerM
    }
});

export default CarModelChoiceLeasing;