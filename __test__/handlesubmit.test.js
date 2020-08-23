import { handleSubmit } from "../src/client/js/app.js"


describe('Test of handleSubmit function', () => {
    test('Test true if handleSubmit functions', () => {
        expect(handleSubmit).toBeDefined();
    });
});
