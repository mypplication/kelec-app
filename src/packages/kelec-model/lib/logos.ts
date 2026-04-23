import { CarMaker } from "../../../lib/clients/accounts/account";

/**
 * 
 * @param brand The brand to get the logo 
 * @param isDarkMode If the user has turned on dark mode
 * @returns The logo matching the brand and colour scheme
 */
export const getCarMakerLogo = (brand: CarMaker, isDarkMode: boolean): any => {
    switch (brand) {
        case CarMaker.RENAULT:
        case CarMaker.DEMO:
            return isDarkMode ? require('../../../assets/logos/car_makers/renault_white.png') : require('../../../assets/logos/car_makers/renault_black.png');
        case CarMaker.HYUNDAI:
            return isDarkMode ? require('../../../assets/logos/car_makers/hyundai_white.png') : require('../../../assets/logos/car_makers/hyundai_black.png');
        case CarMaker.DACIA:
            return isDarkMode ? require('../../../assets/logos/car_makers/dacia_white.png') : require('../../../assets/logos/car_makers/dacia_black.png');
        case CarMaker.ALPINE:
            return isDarkMode ? require('../../../assets/logos/car_makers/alpine_white.png') : require('../../../assets/logos/car_makers/alpine_black.png');
    }
}