# nonodeify
Really simple helper when you don't have a `nodeify` in your promise chain.

[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)][stability]
[![circleci](https://circleci.com/gh/orangemug/nonodeify.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/nonodeify.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/nonodeify/dev-status.svg)][dm-dev]

[stability]: https://github.com/orangemug/stability-badges#stable
[circleci]:  https://circleci.com/gh/orangemug/nonodeify
[dm-prod]:   https://david-dm.org/orangemug/nonodeify
[dm-dev]:    https://david-dm.org/orangemug/nonodeify#info=devDependencies

## Usage
The function generates a `then` and `catch` handler from a normal callback style function, whilst also wrapping the original function.

So first off wrap your callback

```js
var nonodeify = require("nonodeify");

function callback(err) {
  return (err ? "error" : "success");
}

callback = nonodeify(callback);
```

The `callback` will still act as a normal function (as before)

```js
// Normal usage
assert.equal(callback(), "success");
assert.equal(callback("err"), "error");
```

However you'll also get `then` and `catch` methods which return Promises after calling the original callback method

```js
// Promise success
Promise.resolve()
  .then(callback.then)
  .then(function(res) {
    assert.equal(res, "success")
  });

// Promise error
Promise.reject()
  .then(callback.then)
  .then(function(res) {
    assert.equal(res, "error")
  });
```

The above requires `Promise` globally, if you want to provide a local polyfill use

```js
var Bluebird = require("bluebird");
var nonodeify = require("nonodeify/generate")(Bluebird);
```


## License
[MIT](LICENSE)
