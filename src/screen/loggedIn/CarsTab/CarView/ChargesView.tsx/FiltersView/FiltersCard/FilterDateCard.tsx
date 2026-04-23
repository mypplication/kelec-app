import { useContext, useEffect, useState } from "react";
import { Filter } from "../../../../../../../lib/model/filters/FiltersStruct"
import { View } from "react-native";
import ChargesViewContext from "../../../../../../../lib/Contexts/ChargesViewContext";
import DatePickerField from "../../../Elements/DatePicker";

type Props = {
    readonly filter: Filter;
    readonly filterValueMin?: Date;
    readonly filterValueMax?: Date;
}

function FilterDateCard({ filter, filterValueMin, filterValueMax }: Props): React.JSX.Element {

    const { applyFilter, removeFilter } = useContext(ChargesViewContext);


    const [startDate, setStartDate] = useState<Date | undefined>(undefined);

    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (filterValueMin !== undefined) {
            setStartDate(filterValueMin);
        }
        if (filterValueMax !== undefined) {
            setEndDate(filterValueMax);
        }
    }, []);

    useEffect(() => {
        if (!startDate && !endDate) {
            // If both dates are undefined, remove the filter
            removeFilter(filter.filterName);
            return
        }
        const filterToApply: Filter = {
            displayName: filter.displayName,
            filterName: filter.filterName,
            filterType: {
                startDate: startDate,
                endDate: endDate
            }
        }
        applyFilter(filterToApply);
    }, [startDate, endDate]);

    return (
        <View
            testID={"expanded" + filter.filterName}
        >
            < View style={{
                flexDirection: 'row',
                gap: 10,
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <DatePickerField

                    updateDate={setStartDate}
                    dateValue={startDate}
                    placeholder={"start_date"}
                />
                <DatePickerField
                    updateDate={setEndDate}
                    dateValue={endDate}
                    placeholder={"end_date"}
                />
            </View >
        </View >
    )
}

export default FilterDateCard;