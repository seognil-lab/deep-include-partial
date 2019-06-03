import { has, isArray, isEqual, isObject, isPlainObject } from 'lodash/fp';

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
