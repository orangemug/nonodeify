# nonodeify
![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)

Really simple helper when you don't have a `nodeify` in your promise chain.

[![circleci](https://circleci.com/gh/orangemug/nonodeify.png?style=shield)](https://circleci.com/gh/orangemug/nonodeify)
[![Dependency Status](https://david-dm.org/orangemug/nonodeify.svg)](https://david-dm.org/orangemug/nonodeify)
[![Dev Dependency Status](https://david-dm.org/orangemug/nonodeify/dev-status.svg)](https://david-dm.org/orangemug/nonodeify#info=devDependencies)

## Usage
The function generates a `then` and `catch` handler from a normal callback style function.

    var nonodeify = require("nonodeify");

    function foo(callback) {
      callback = nonodeify(callback);

      someFnReturningPromise()
        .then(callback.then)
        .catch(callback.catch);
    }

Requires `Promise` globally


## License
[MIT](LICENSE)
