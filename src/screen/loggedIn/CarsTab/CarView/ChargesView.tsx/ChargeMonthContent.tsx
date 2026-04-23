import { View } from "react-native";
import { ChargeIndex } from "../../../../../lib/clients/apiHandlers/renaultChargesHandler";
import ChargeMonthHeader from "./ChargeMonthHeader";
import ChargeCard from "./ChargeCard";
import commonStyles from "../../../../../lib/graphics/commonStyle";
import CarType from "../../../../../lib/clients/cars/carTypes/carType";
import { useEffect, useState } from "react";

type Props = {
    readonly chargeIndex: ChargeIndex
    readonly carType: CarType
    readonly isFirst: boolean // if it is the first month in the list
}

function ChargeMonthContent({ chargeIndex, carType, isFirst }: Props): React.JSX.Element {

    const [shouldDisplayCharges, setShouldDisplayCharges] = useState(false);

    useEffect(() => {
        if (isFirst) {
            setShouldDisplayCharges(true);
        }
    }, [isFirst]);



    return (
        <View key={chargeIndex.monthYear}>
            <ChargeMonthHeader chargeIndex={chargeIndex} shouldDisplayCharges={shouldDisplayCharges} setShouldDisplayCharges={setShouldDisplayCharges} />
            {shouldDisplayCharges && chargeIndex.charges.map((charge, index) => {
                return (
                    <View key={charge.getStartDate().toISOString()}>
                        <ChargeCard charge={charge} carType={carType} />
                        {index !== chargeIndex.charges.length - 1 && (
                            <View style={[commonStyles.navSeparator, { marginVertical: 5, marginHorizontal: 15 }]}></View>
                        )}

                    </View>
                )
            })}
        </View>
    )
};

export default ChargeMonthContent;