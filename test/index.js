var assert            = require("assert");
var Bluebird          = require("bluebird");
var nonodeify         = require("../");
var nonodeifyGenerate = require("../generate");


describe("nonodeify", function() {
  describe("valid usage", function() {
    it("should wrap original callback", function() {
      var calledWith;
      function fn() {
        calledWith = Array.prototype.slice.call(arguments);
      };

      var wrapped = nonodeify(fn);
      wrapped(1, 2, 3);

      assert.deepEqual(calledWith, [1, 2, 3])
    })

    it("should pass no err arg success", function() {
      var calledWith;
      var input = {foo: "bar"};
      var done = nonodeify(function() {
        calledWith = arguments;
      });

      return Promise.resolve(input)
        .then(done.then)
        .then(function() {
          assert(calledWith);
          assert.equal(calledWith.length, 2);
          assert.equal(calledWith[0], undefined);
          assert.equal(calledWith[1], input);
        });
    })

    it("should pass err arg on error", function() {
      var err = "arrrgh";
      var done = nonodeify(function() {
        calledWith = arguments;
      });

      return Promise.reject(err)
        .catch(done.catch)
        .catch(function() {
          assert(calledWith);
          assert.equal(calledWith.length, 1);
          assert.equal(calledWith[0], err);
        });
    });
  });

  describe("invalid usage", function() {
    var oldWarn, calledWith;
    beforeEach(function() {
      oldWarn = console.warn;
      console.warn = function() {
        calledWith = arguments;
      }
    });

    afterEach(function() {
      console.warn = oldWarn;
    });

    it("should warn if callback called more than once on resolve", function() {
      var done = nonodeify(function() {});
      done.catch();
      done.catch();
      assert.equal(calledWith.length, 1);
      assert.equal(calledWith[0], "nodeify: 'catch' called more than once");
    });

    it("should warn if callback called more than once on reject", function() {
      var done = nonodeify(function() {});
      done.then();
      done.then();
      assert.equal(calledWith.length, 1);
      assert.equal(calledWith[0], "nodeify: 'then' called more than once");
    });

    it("should warn if both 'then' and 'catch' are called", function() {
      var done = nonodeify(function() {});
      done.catch();
      done.then();
      assert.equal(calledWith.length, 1);
      assert.equal(calledWith[0], "nodeify: 'catch' and 'then' called");
    });
  });
});

describe("nonodeify#generate", function() {
  /**
   * NOTE: You'd never actually want to do this because Bluebird provides a
   * nodeify function. However if you're in a non ES6 env you'd probably want
   * to pass in a polyfill
   */
  it("Use 'bluebird' as promise library", function() {
    var done = nonodeifyGenerate(Bluebird)(function() {});
    var p = done.then()
    assert(!(p instanceof Promise));
    assert(p instanceof Bluebird);
  });

  it("throw if Promise doesn't exist", function() {
    var thrown;
    try {
      nonodeifyGenerate()(function() {});
    } catch(err) {
      thrown = err;
    }
    assert(thrown instanceof Error);
    assert.equal(thrown.toString(), "Error: Promise not defined");
  });
});

