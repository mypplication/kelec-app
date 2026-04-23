
const getImage = async (url: string) => {
    let result = await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
            return blob;
        })
        .catch((error) => {
            console.error(error);
        });
    return result;
};

const convertBlobToBase64 = async (blob: Blob): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const base64String = getBase64StringFromDataURL(reader.result?.toString() as string);
            resolve(base64String);
        };
        reader.readAsDataURL(blob);
    });
};

const getBase64StringFromDataURL = (dataURL: string) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');

const fetchImage = async (url: string): Promise<string | null> => {
    const image = await getImage(url);
    if (image == null) {
        return null;
    }
    let imageString = await convertBlobToBase64(image);
    return imageString;
};

export default fetchImage;
export { getBase64StringFromDataURL, convertBlobToBase64, getImage }