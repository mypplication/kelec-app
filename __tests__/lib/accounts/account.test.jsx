import Account from "../../../src/lib/clients/accounts/account";

test('should not be able to fetch hvac status', async () => {
    const account = new Account();
    const hvacStatus = await account.fetchHVACStatus();
    expect(hvacStatus.hasError).toBe(true);
});