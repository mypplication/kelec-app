import { it, expect, describe } from '@jest/globals';

jest.mock('react-native', () => {
    return {
        Platform: {
            OS: 'ios',
            select: () => null,
        },
    };
});

describe('fonts', () => {
    it('should export fonts', async () => {
        const { fontFamilyBold, fontWeightBold } = await import('../../../src/packages/kelec-model/lib/fonts');


        expect(fontFamilyBold).toBeDefined();
        expect(fontWeightBold).toBeDefined();
    });
});