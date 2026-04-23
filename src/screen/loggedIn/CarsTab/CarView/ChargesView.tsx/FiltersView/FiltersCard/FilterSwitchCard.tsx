import { useContext } from "react";
import { Filter } from "../../../../../../../lib/model/filters/FiltersStruct"
import ChargesViewContext from "../../../../../../../lib/Contexts/ChargesViewContext";
import { Switch, View } from "react-native";
import Text from "../../../../../../Common/CustomText";
import MainContext from "../../../../../../../lib/Contexts/MainContext";

type Props = {
    readonly filter: Filter;
    readonly filterValue?: boolean;
}

function FilterSwitchCard({ filter, filterValue }: Props): React.JSX.Element {
    const { applyFilter, removeFilter } = useContext(ChargesViewContext);

    const { languageHandler } = useContext(MainContext);

    return (
        <View
            testID={"expanded" + filter.filterName}
        >
            <View style={{
                flexDirection: 'row',
                gap: 10,
                flex: 1,
                justifyContent: 'space-between',
                paddingTop: 15
            }}>
                <Text>{languageHandler.getTranslation(filter.displayName)}</Text>
                <Switch
                    testID="filterSwitch"
                    value={filterValue ?? false}
                    onValueChange={(value: boolean) => {
                        if (value) {
                            const newFilter: Filter = {
                                displayName: filter.displayName,
                                filterName: filter.filterName,
                                filterType: {
                                    isActive: true
                                }
                            }
                            applyFilter(newFilter);
                        } else {
                            removeFilter(filter.filterName);
                        }
                    }}
                />
            </View >
        </View >
    )
}

export default FilterSwitchCard;