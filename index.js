module.exports = function(done) {
  return {
    then: function(data) {
      if(done) {
        done(undefined, data);
      }
      return Promise.resolve(data);
    },
    catch: function(err) {
      if(done) {
        done(err);
      }
      return Promise.reject(err);
    }
  };
}
