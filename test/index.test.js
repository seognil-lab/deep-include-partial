const { assert } = require('chai');
const { ANY, VOID, deepIncludePartial } = require('../dist/index.cjs');

const checkFit = (data, pattern, equal = true) =>
    assert(deepIncludePartial(data, pattern) === equal, '错误');

describe('deepIncludePartial', function() {
    it('partial, () => true', () => {
        checkFit({ length: { valid: false, errMsg: 'error' } }, { length: { valid: false } }, true);
    });
    it('partial, () => false', () => {
        checkFit({ length: { valid: false, errMsg: 'error' } }, { length: { valid: true } }, false);
    });

    it('single level object, () => false', () => {
        checkFit({ valid: true }, { valid: false }, false);
    });

    it('ANY, has value => true', () => {
        checkFit({ length: { errMsg: 'error' } }, { length: { errMsg: ANY } }, true);
    });
    it('ANY, value is undefined => true', () => {
        checkFit({ length: { errMsg: undefined } }, { length: { errMsg: ANY } }, true);
    });
    it('ANY, no value => false', () => {
        checkFit({ length: {} }, { length: { errMsg: ANY } }, false);
    });

    it('VOID, no value => true', () => {
        checkFit({ length: {} }, { length: { errMsg: VOID } }, true);
    });

    it('VOID, value is undefined => false', () => {
        checkFit({ length: { errMsg: undefined } }, { length: { errMsg: VOID } }, false);
    });

    it('VOID, value is something => false', () => {
        checkFit({ length: { errMsg: 'error' } }, { length: { errMsg: VOID } }, false);
    });
});

describe('object.array, check _.isEqual()', function() {
    it('array is equal, => true', () => {
        checkFit({ size: [50, 100], center: [25, 0] }, { size: [50, 100], center: [25, 0] }, true);
    });
    it('array is not equal, => false', () => {
        checkFit(
            { size: [50, 100], center: [25, 0] },
            { size: [50, 100], center: [125, 100] },
            false,
        );
    });
});
describe('object and boundary value, check _.isEqual()', function() {
    it('object.array, equal => true', () => {
        checkFit({ v: [1, 2] }, { v: [1, 2] }, true);
    });

    it('objecy.array, not equal => false', () => {
        checkFit({ v: [1, 2] }, { v: [1, 2, 3] }, false);
    });

    it('value is null && null => true', () => {
        checkFit({ v: null }, { v: null }, true);
    });

    it('value is 2 && NaN => false', () => {
        checkFit({ v: 2 }, { v: NaN }, false);
    });

    it('value is NaN && NaN => true', () => {
        checkFit({ v: NaN }, { v: NaN }, true);
    });
});

describe('params not object, is not allowd', function() {
    it('fn(array, ...) => throw', () => {
        assert.throws(() => checkFit([1, 2], [1, 2]));
    });

    it('fn(number, ...) => throw', () => {
        assert.throws(() => checkFit(1, 2));
    });

    it('fn(null, ...) => throw', () => {
        assert.throws(() => checkFit(null, null));
    });
});

describe('readme demo', () => {
    it('readme demo', () => {
        const pattern = { a: { e: '2' }, b: ANY, d: VOID };

        const data = {
            // * explanation
            a: {
                // * check recursively
                e: '2', // * isEqual
            },
            b: [3, 4], // * is ANY type,
            c: 5, // * is not checked,
            // * d: not has 'd', is VOID
        };

        assert(deepIncludePartial(data, pattern) === true);
    });
});
