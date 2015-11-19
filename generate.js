function warn(str) {
  console.warn("nodeify: " + str);
}

function check(called) {
  if (called.then > 0 && called.catch > 0) {
    warn("'catch' and 'then' called");
  } else if (called.then > 1) {
    warn("'then' called more than once");
  } else if (called.catch > 1) {
    warn("'catch' called more than once");
  } else {
    return true;
  }
}

module.exports = function(Promise) {
  if(!Promise) {
    throw new Error("Promise not defined");
  }

  return function(done) {
    // Cache for errors.
    var called = {
      then: 0,
      catch: 0
    };

    var fn = function() {
      return done.apply(this, arguments);
    };

    fn.then = function(data) {
      called["then"]++;
      if(done && check(called)) {
        done(undefined, data);
      }
      return Promise.resolve(data);
    };

    fn.catch = function(err) {
      called["catch"]++;
      if(done && check(called)) {
        done(err);
      }
      return Promise.reject(err);
    }

    return fn;
  };
};
