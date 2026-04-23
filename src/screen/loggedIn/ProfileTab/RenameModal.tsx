import { useContext, useEffect, useState } from "react";
import MainContext from "../../../lib/Contexts/MainContext";
import Dialog from "react-native-dialog";
import { View } from "react-native";

type RenameModalProps = {
    readonly vin: string;
    readonly currentCarName: string;
    readonly shouldDisplay: boolean;
    readonly setShouldShowModal: (shouldShowModal: boolean) => void;
}

function RenameModal({ vin, setShouldShowModal, shouldDisplay, currentCarName }: RenameModalProps): React.JSX.Element {

    const { languageHandler, currentUser, storageHandler, reloadUser } = useContext(MainContext);

    useEffect(() => {
        setCarNameInput(currentCarName);
    }, []);

    const renameVehicle = async (newName: string) => {
        currentUser.renameACar(vin, newName);
        await storageHandler.saveAccount(currentUser);
        reloadUser();
        setShouldShowModal(false);
    };

    const [carNameInput, setCarNameInput] = useState<string>('');


    return (
        <View>
            <Dialog.Container visible={shouldDisplay}>
                <Dialog.Title>{languageHandler.getTranslation("renameCar")}</Dialog.Title>
                <Dialog.Input
                    testID="carNameInput"
                    value={carNameInput}
                    onChangeText={(value: string) => {
                        setCarNameInput(value)
                    }}
                >

                </Dialog.Input>
                <Dialog.Button
                    testID="carNameModalCancel"
                    label={languageHandler.getTranslation("cancel")} onPress={() => {
                        setShouldShowModal(false)
                    }} />
                <Dialog.Button
                    testID="carNameModalConfirm"
                    label={languageHandler.getTranslation("confirm")} onPress={() => {
                        renameVehicle(carNameInput);
                    }} />
            </Dialog.Container>
        </View>
    )

}

export default RenameModal;