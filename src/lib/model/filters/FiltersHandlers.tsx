import { Filter, FilterDate, FilterName, FilterNumerical } from "./FiltersStruct";

export const getNumericalFiltersValues = (filterName: string, filters: Filter[]): { filterValueMin: number | undefined, filterValueMax: number | undefined } => {
    // find if the filter is already applied
    const filter = filters.find(f => f.filterName === filterName);
    const filterType = filter?.filterType as FilterNumerical;
    if (filter) {
        return { filterValueMin: filterType.min, filterValueMax: filterType.max };
    }
    return { filterValueMin: undefined, filterValueMax: undefined };
}

export const getDateFiltersValues = (filterName: string, filters: Filter[]): { filterValueMin: Date | undefined, filterValueMax: Date | undefined } => {
    // find if the filter is already applied
    const filter = filters.find(f => f.filterName === filterName);
    const filterType = filter?.filterType as FilterDate;
    if (filter) {
        return { filterValueMin: filterType.startDate, filterValueMax: filterType.endDate };
    }
    return { filterValueMin: undefined, filterValueMax: undefined };
}

export const getFilterSwitchValue = (filterName: string, filters: Filter[]): boolean => {
    // find if the filter is already applied
    const filter = filters.find(f => f.filterName === filterName);
    const filterType = filter?.filterType as { isActive: boolean };
    if (filter) {
        return filterType.isActive;
    }
    return false;
}

export const getFilterMin = (filter: Filter): number | Date | string => {
    if (filter.filterName == FilterName.DATE) {
        const startDate = (filter.filterType as FilterDate).startDate;
        const formattedDate = startDate?.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        return formattedDate ? formattedDate : 0;
    }
    return (filter.filterType as FilterNumerical).min;
}

export const getFilterMax = (filter: Filter): number | Date | string => {
    if (filter.filterName == FilterName.DATE) {
        const endDate = (filter.filterType as FilterDate).endDate;
        const formattedDate = endDate?.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        return formattedDate ? formattedDate : 9999;
    }
    return (filter.filterType as FilterNumerical).max;
}

export const getFilterUnit = (filter: Filter): string => {
    if (filter.filterName == FilterName.DATE) {
        return ''; // No unit for date
    }
    return (filter.filterType as FilterNumerical).unit;
}