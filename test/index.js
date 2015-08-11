var assert = require("assert");
var nonodeify = require("../");

describe("nonodeify", function() {
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
  })
})
