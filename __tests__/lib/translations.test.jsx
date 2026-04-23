// the main purpose of this test is to check that all languages have the same keys
const languages = require('../../src/lib/model/localization/localizations.json');

test('all languages have the same keys', () => {
    const keys = Object.keys(languages.en);
    Object.keys(languages).forEach((lang) => {
        expect(Object.keys(languages[lang])).toEqual(keys);

        // check that for each language there are the same of spaces before and after
        Object.entries(languages[lang]).forEach(([key, value]) => {
            const enValue = languages.en[key];
            const numberOfSpacesBefore = (value.match(/^ +/) || [''])[0].length;
            const numberOfSpacesAfter = (value.match(/ +$/) || [''])[0].length;
            if (enValue && value != "") {
                const enNumberOfSpacesBefore = (enValue.match(/^ +/) || [''])[0].length;
                const enNumberOfSpacesAfter = (enValue.match(/ +$/) || [''])[0].length;
                expect(numberOfSpacesBefore).toEqual(enNumberOfSpacesBefore);
                expect(numberOfSpacesAfter).toEqual(enNumberOfSpacesAfter);
            }
        });
    });
});