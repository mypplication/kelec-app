import { createContext } from "react";

const CarsViewContext = createContext({
    handleModalAnim: (open: boolean) => { },
});

export default CarsViewContext;