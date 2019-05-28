const alasql = require("alasql");

const init = () => {
  const db = new alasql.Database();
  const appsTableNames = ["app_a", "app_b", "app_c", "app_d"]
  generateTable(db).then(() => {
    appsTableNames.forEach(appTableName => {
      return populateTables(db, appTableName);
    });
  }).catch(err => {
    console.log("error populating databses " + err)
  })

  return db;
}

function populateTables(db, apptableName) {
  var selectString = `SELECT * FROM CSV("${apptableName}.log.csv", {headers:false,separator:"|"})`;
  alasql
    .promise(selectString)
    .then(data => {
      data.map(item => {
        let insertStatement =
          `INSERT INTO ${apptableName} (message, severity, header, dateTime) VALUES (:message, :severity, :header, :dateTime);`
        db.exec(insertStatement, { dateTime: item[0], severity: item[1], header: item[2], message: item[3] });
      });
      console.log("Seeded database: " + apptableName);
    })
    .catch(err => {
      console.log("Error:", err);
    });
}


function generateTable(db) {
  return Promise.resolve(runGenerate(db))
  function runGenerate(db) {
    db.exec(
      "CREATE TABLE app_a (" +
      "id VARCHAR(36) NOT NULL DEFAULT UUID(), " +
      "message VARCHAR(500) NOT NULL, " +
      "severity VARCHAR(30), " +
      "header VARCHAR(30), " +
      "dateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    );
    db.exec(
      "CREATE TABLE app_b (" +
      "id VARCHAR(36) NOT NULL DEFAULT UUID(), " +
      "message VARCHAR(500) NOT NULL, " +
      "severity VARCHAR(30), " +
      "header VARCHAR(30), " +
      "dateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    );
    db.exec(
      "CREATE TABLE app_c (" +
      "id VARCHAR(36) NOT NULL DEFAULT UUID(), " +
      "message VARCHAR(500) NOT NULL, " +
      "severity VARCHAR(30), " +
      "header VARCHAR(30), " +
      "dateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    );
    db.exec(
      "CREATE TABLE app_d (" +
      "id VARCHAR(36) NOT NULL DEFAULT UUID(), " +
      "message VARCHAR(500) NOT NULL, " +
      "severity VARCHAR(30), " +
      "header VARCHAR(30), " +
      "dateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    );
  }
}

module.exports = {
  init
};
