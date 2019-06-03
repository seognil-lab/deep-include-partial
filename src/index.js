import { has, isArray, isEqual, isObject, isPlainObject } from 'lodash/fp';

// * ----------------

// ! mocha/chai `deepInclude` function missed a feature，
// * like code down here, it's not support partial check,
// * if the child level of object is not totally same,
// * it would fail.
// * my lib is to sovle this.

// it('chai origin api test', () => {
//     assert.deepInclude(
//         { length: { valid: false, errMsg: 'error' } },
//         { length: { valid: false } }
//     )
// })

// * ----------------

// * Only if every child value is simple type or object or array
// * simple type can not check directly (just use `isEqual` or else instead)
// * Array directly check is not supported (just use `isEqual` or else instead)
// * Array check will call comparator(isEqual) (use ANY and make more check outside if you like)
// * complicated object (cyclic object, array-like) is not well tested and supported

// * ANY, any type (like TypeScript)
// * Void. no data (like TypeScript)

// * check the `check-fit.test.js`

// * ----------------

const ANY = Symbol('ANY');
const VOID = Symbol('VOID');

function deepIncludePartial(data, pattern, comparator = isEqual) {
    if (!isPlainObject(pattern) || !isPlainObject(data)) {
        throw `Please pass a result object and a pattern object`;
    }

    if (typeof comparator != 'function') {
        throw `Please pass a function comparator`;
    }

    for (const key in pattern) {
        const current = data[key];
        const should = pattern[key];

        if (should === VOID) {
            if (has(key, data)) return false;
        } else if (should === ANY) {
            if (!has(key, data)) return false;
        } else if (isArray(should)) {
            if (!isArray(current) || !comparator(current, should)) return false;
        } else if (isObject(should)) {
            if (!isObject(current) || !deepIncludePartial(current, should)) return false;
        } else {
            if (!comparator(current, should)) return false;
        }
    }
    return true;
}

// * --------------------------------

export { deepIncludePartial, ANY, VOID };
