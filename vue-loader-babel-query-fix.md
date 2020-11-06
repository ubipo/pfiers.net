
# node_modules/vue-loader/dist/index.js

Lines like:
```js
const query = `?vue&type=template${idQuery}${scopedQuery}${attrsQuery}${bindingsQuery}${resourceQuery}`;
```

Should be (replace resourceQuery & add '&' in front):
```js
const query = `?vue&type=template${idQuery}${scopedQuery}${attrsQuery}${bindingsQuery}&${rawQuery}`;
```
