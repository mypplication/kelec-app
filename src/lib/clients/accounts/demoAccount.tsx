import Account from "./account"

class DemoAccount extends Account {

    launchHVAC = async (_: number): Promise<boolean> => {
        console.log("HVAC launched");
        return true;
    }

}

export default DemoAccount;