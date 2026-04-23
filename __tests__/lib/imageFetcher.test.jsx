import { waitFor, act } from '@testing-library/react-native';
import fetchImage, { getImage, getBase64StringFromDataURL } from '../../src/lib/graphics/imageFetcher';



describe('fetchImage', () => {
    it('should not fetch an image', async () => {
        const mockFetch = jest.fn();
        global.fetch = mockFetch.mockRejectedValueOnce('error')
        let image = null;
        await act(async () => {
            try {
                image = await fetchImage('imageUrl');
            } catch (e) {
                expect(e).toEqual(new Error('error'));
            }
        });
    });
});

describe('getImage', () => {
    it('should fetch an image', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            blob: jest.fn().mockResolvedValueOnce('blob')
        });
        const image = await getImage('imageUrl');
        expect(image).toBe('blob');
    });
});

describe('getBase64StringFromDataURL', () => {
    it('should return a base64 string', () => {
        const base64String = getBase64StringFromDataURL('data:image/png;base64,base64String');
        expect(base64String).toBe('base64String');
    });
});


