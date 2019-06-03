## ⭐️ What

A check function primarily for test frameworks.

## 📦 Get Started

**Installation**

```shell
npm install –-save-dev deep-include-partial
# or
yarn add -D deep-include-partial
```

**Usage**

`deepIncludePartial(data, pattern, [comparator = isEqual])`

```javascript
// * ---------------- demo
const { ANY, VOID, deepIncludePartial } = require('deep-include-partial');

const pattern = { a: { e: '2' }, b: ANY, d: VOID };

const data = {
  // * explanation
  a: { // * check recursively
    e: '2', // * isEqual
  },
  b: [3, 4], // * is ANY type,
  c: 5, // * is not checked,
  // * d: not has 'd', is VOID
};

deepIncludePartial(data, pattern); // => true
```

---

## 💡 Why

`chai` 's `deepInclude` function missed a feature，  
Like code down here, it does not support partial check,  
If the child level of object is not totally same,  
It would fail.  

This lib is to sovle this.

```javascript
it('chai origin api test', () => {
  assert.deepInclude(
    { length: { valid: false, errMsg: 'error' } },
    { length: { valid: false } }
  ); // => false
});
```

## 📖 Description

**Helper**

-   ANY, any type (like TypeScript)
-   VOID. no value (like TypeScript)

**Rules**

Only if every child value is simple type or object or array  
complicated object (cyclic object, array-like) is not well tested and supported

```javascript
// ✅ good
deepIncludePartial({ tags: ['head', 'footer'] }, { tags: ANY });

// 🔴 bad
deepIncludePartial(arguments, NodeList);
```

Simple type can not check directly  
(just use `isEqual` or else instead)

```javascript
// ✅ good
deepIncludePartial({ val: 2 }, { val: 3 });

// 🔴 bad
deepIncludePartial(2, 3);
```

Array directly check is not supported  
(just use `isEqual` or else instead)

```javascript
// ✅ good
deepIncludePartial({ arr: [1, 2] }, { arr: [1, 2, 3] });

// 🔴 bad
deepIncludePartial([1, 2], [1, 2, 3]);
```

Array check will call comparator (default isEqual)  
(use ANY and make more check outside if you like)

```javascript
// ✅ good
deepIncludePartial({ arr: [1, 2] }, { arr: [2, 3] }, (a, b) => {
  if (isArray(a) && isArray(b)) {
    return a.length === b.length;
  } else {
    return isEqual(a, b);
  }
});

// ✅ good
const obj = { arr: [1, 2] },
  pattern = { arr: ANY };

assert(
  deepIncludePartial(obj, pattern) &&
    Array.isArray(obj.arr) &&
    obj.arr.length == 2 &&
    obj.arr[0] == 1,
);
```

MORE example, check the `index.test.js`

---

## ⌨️ Contribution

```shell
# git clone and cd into it
git clone https://github.com/seognil-lab/deep-include-partial

# npm command
npm i
npm run test:watch
```

## 📜 References

## 🕗 TODO
