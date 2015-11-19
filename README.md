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
The function generates a `then` and `catch` handler from a normal callback style function.

    var nonodeify = require("nonodeify");

    function foo(callback) {
      callback = nonodeify(callback);

      someFnReturningPromise()
        .then(callback.then)
        .catch(callback.catch);
    }

The above requires `Promise` globally, if you want to provide a local polyfill use

    var nonodeify = require("nonodeify/generate")(Promise);



## License
[MIT](LICENSE)
