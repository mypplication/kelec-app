import { createContext } from "react";
import { Filter } from "../model/filters/FiltersStruct";

const ChargesViewContext = createContext({
    filters: null as unknown as Filter[],
    setFilters: (_: Filter[]) => { },
    applyFilter: (_: Filter): void => { },
    removeFilter: (_: string): void => { },
});

export default ChargesViewContext;