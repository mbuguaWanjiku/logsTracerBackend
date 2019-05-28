
const DB = require('../../db.instance').DB;

function getLogs(appId) {
  const res = DB.getInstance().exec("SELECT * FROM "+appId);
  return res;
}
function deleteLog(log) {
  const id = log.id;
  const res = DB.getInstance().exec("DELETE FROM client_A WHERE id = :id", {id});
  return res;
}

module.exports={
  getLogs,
  deleteLog
}