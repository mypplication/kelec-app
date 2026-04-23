import { it, expect, describe } from '@jest/globals';
import { BLACK_COLOUR, WHITE_COLOUR } from '../../../src/packages/kelec-model/lib/colours';

describe('colours', () => {
    it('should export colours', async () => {
        const {
            PRIMARY_COLOUR,
            SECONDARY_COLOUR,
            BLUE_ONE,
            BLUE_TWO,
            ORANGE_ONE,
            ORANGE_TWO,
            ORANGE_GRADIENT,
            NEUTRAL_ZERO,
            NEUTRAL_50,
            NEUTRAL_100,
            NEUTRAL_200,
            NEUTRAL_300,
            NEUTRAL_400,
            NEUTRAL_450,
            NEUTRAL_500,
            NEUTRAL_ZERO_30,
            NEUTRAL_ZERO_70
        } = await import('../../../src/packages/kelec-model/lib/colours');

        expect(PRIMARY_COLOUR).toBeDefined();
        expect(SECONDARY_COLOUR).toBeDefined();
        expect(BLUE_ONE).toBeDefined();
        expect(BLUE_TWO).toBeDefined();
        expect(ORANGE_ONE).toBeDefined();
        expect(ORANGE_TWO).toBeDefined();
        expect(ORANGE_GRADIENT).toBeDefined();
        expect(NEUTRAL_ZERO).toBeDefined();
        expect(NEUTRAL_50).toBeDefined();
        expect(NEUTRAL_100).toBeDefined();
        expect(NEUTRAL_200).toBeDefined();
        expect(NEUTRAL_300).toBeDefined();
        expect(NEUTRAL_400).toBeDefined();
        expect(NEUTRAL_450).toBeDefined();
        expect(NEUTRAL_500).toBeDefined();
        expect(NEUTRAL_ZERO_30).toBeDefined();
        expect(NEUTRAL_ZERO_70).toBeDefined();
        expect(WHITE_COLOUR(true)).toBeDefined();
        expect(WHITE_COLOUR(false)).toBeDefined();
        expect(BLACK_COLOUR(true)).toBeDefined();
        expect(BLACK_COLOUR(false)).toBeDefined();
    });
});

