import StorageHandler from "../../lib/storage/storageHandler";
import LanguageHandler from "../../lib/model/localization/languageHandler";
import { createContext } from "react";
import UserAccount from "../clients/accounts/userAccount";
import { ViewsAvailable } from "../../Main";
import AppPreferences from "../appPreferences/model/appPreferences";

const MainContext = createContext({
    languageHandler: null as unknown as LanguageHandler,
    currentUser: null as unknown as UserAccount,
    reloadUser: null as unknown as () => void,
    storageHandler: null as unknown as StorageHandler,
    appPreferences: null as unknown as AppPreferences,
    reloadAppPreferences: null as unknown as () => void,
    checkOnboarding: null as unknown as () => void,
    setCurrentView: null as unknown as (view: ViewsAvailable) => void,
});


export type MainContextType = React.ContextType<typeof MainContext>;

export default MainContext;