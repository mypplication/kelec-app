import { RenaultCredentials } from "../../src/lib/clients/carMakers/renaultCredentials";

const generateValidJwt = (email: string, delay: number, shouldHavePayload: boolean): string => {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };
    const payload = {
        email: email,
        exp: shouldHavePayload ? Math.floor(Date.now() / 1000) + delay : undefined
    };
    const base64UrlHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const base64UrlPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return `${base64UrlHeader}.${base64UrlPayload}.signature`;
};

test('test valid jwt token', async () => {
    const email = "test@example.com";
    const token = generateValidJwt(email, 60 * 60, true);
    const isValid = RenaultCredentials.isJwtExpired(token);
    expect(isValid).toBe(false);
});


test('test expired jwt token', async () => {
    const email = "test@example.com";
    const expiredToken = generateValidJwt(email, -60 * 60, true);
    const isValid = RenaultCredentials.isJwtExpired(expiredToken);
    expect(isValid).toBe(true);
});

test('test no expiring jwt token', async () => {
    const email = "test@example.com";
    const expiredToken = generateValidJwt(email, -60 * 60, false);
    const isValid = RenaultCredentials.isJwtExpired(expiredToken);
    expect(isValid).toBe(false);
});


test('test storing and retrieving JWT', async () => {
    const email = "test@example.com";
    const token = generateValidJwt(email, 60 * 60, true);
    await RenaultCredentials.storeJWT(email, token);
    const retrievedToken = await RenaultCredentials.getJWTStored(email);
    expect(retrievedToken).toBe(token);
});
