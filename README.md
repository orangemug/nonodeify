# nonodeify
Really simple helper when you don't have a `nodeify` in your promise chain.


## Usage
The function generates a `then` and `catch` handler from a normal callback style function.

    var nonodeify = require("nonodeify");
    function foo(callback) {
      callback = nonodeify(callback);
      someFnReturningPromise()
        .then(callback.then)
        .then(callback.catch);
    }

Requires `Promise` globally


## License
MIT
