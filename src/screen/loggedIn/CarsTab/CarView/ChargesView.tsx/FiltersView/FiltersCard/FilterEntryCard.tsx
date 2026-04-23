import { useContext, useEffect, useRef, useState } from "react";
import { Filter, FilterName } from "../../../../../../../lib/model/filters/FiltersStruct";
import { Animated, Easing, TouchableOpacity, useColorScheme, View } from "react-native";
import { getBlackColour } from "../../../../../../../lib/graphics/utils";
import Text from "../../../../../../Common/CustomText";
import MainContext from "../../../../../../../lib/Contexts/MainContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterDateCard from "./FilterDateCard";
import FilterNumericalCard from "./FilterNumericalCard";
import { getDateFiltersValues, getFilterSwitchValue, getNumericalFiltersValues } from "../../../../../../../lib/model/filters/FiltersHandlers";
import ChargesViewContext from "../../../../../../../lib/Contexts/ChargesViewContext";
import FilterSwitchCard from "./FilterSwitchCard";

type FilterCardProps = {
    readonly filter: Filter;
    readonly filterValueMin?: number | Date | string; // if the filter is already applied
    readonly filterValueMax?: number | Date | string; // if the filter is already applied
}

function FilterEntryCard({ filter, filterValueMin, filterValueMax }: FilterCardProps): React.JSX.Element {
    const { languageHandler } = useContext(MainContext);
    const { filters } = useContext(ChargesViewContext);

    // if the filter row is expanded
    const [expanded, setExpanded] = useState(false);

    // chevron rotation in degrees
    const chevronRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        makeChevronRotate(expanded);
    }, [expanded]);

    const makeChevronRotate = (expanded: boolean) => {
        Animated.timing(chevronRotation, {
            toValue: expanded ? 0 : 180,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start();
    };

    const isDarkMode = useColorScheme() === 'dark';

    const displayFilterCard = () => {
        switch (filter.filterName) {
            case FilterName.DATE:
                return <FilterDateCard filter={filter} filterValueMin={getDateFiltersValues(filter.filterName, filters).filterValueMin} filterValueMax={getDateFiltersValues(filter.filterName, filters).filterValueMax} />
            case FilterName.ONLY_DC:
                return <FilterSwitchCard filter={filter} filterValue={getFilterSwitchValue(filter.filterName, filters)} />
            default:
                return <FilterNumericalCard filter={filter} filterValueMin={getNumericalFiltersValues(filter.filterName, filters).filterValueMin} filterValueMax={getNumericalFiltersValues(filter.filterName, filters).filterValueMax} />
        }

    }

    return (
        <View
            style={{
                padding: 15,
                borderRadius: 7,
            }}>
            <TouchableOpacity
                testID={"expandButton" + filter.filterName}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={{
                    marginBottom: expanded ? 10 : 0
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{
                        color: getBlackColour(isDarkMode),
                        fontSize: 17
                    }}>
                        {languageHandler.getTranslation(filter.displayName)}
                    </Text>
                    <Animated.View style={{
                        transform: [
                            {
                                rotate: chevronRotation.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ['0deg', '360deg']
                                })
                            }
                        ]
                    }}>
                        <Icon name="expand-more" size={25} color={getBlackColour(isDarkMode)} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {expanded && (
                displayFilterCard()
            )}
        </View>
    )

};

export default FilterEntryCard;