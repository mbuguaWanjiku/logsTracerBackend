
var DB = (function () {
  var instance;

  function createInstance() {
    const dbInit = require('./db.init').init;
      return dbInit();
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();

module.exports = {
  DB
}