const fs = require("fs");
const configurations = JSON.parse(fs.readFileSync("conf.json"));
const clients = configurations.registeredClients;
const logsService = require("../../persistency/services/logs");

var counter = 55;

/**
 * 
 * @param {application unique identifier} appId 
 * @returns{}
 */
function getLogs(appId) {
  const result = logsService.getLogs(appId);
  if (result && result instanceof Array) {
    console.log(appId + " fetched : " + result.slice(0, counter).length)
    return result.slice(0, counter);
  }
  return [];
}

function sumSeverities(logs) {
  var severityStats = {
    info: 0, warning: 0, error: 0
  };
  if (!logs || logs.length < 1) {
    return severityStats;
  }
  for (const log of logs) {
    switch (log.severity) {
      case "error":
        ++severityStats.error
        break;
      case "info":
        ++severityStats.info
        break;
      case "warning":
        ++severityStats.warning
        break;
      default:
        break;
    }
  }
  return severityStats;
}
function getClientsApplications(clientId) {
  return clients[clientId];
}

function getClientApplicationsStatus(applicationIDs) {
  var appsLogsMap = new Map();

  applicationIDs.forEach(appID => {
    appsLogsMap.set(appID, getLogs(appID))
  });
  return appsLogsMap;
}

function getClientApplicationsStatusBuilder(clientId) {
  const applicationIDs = getClientsApplications(clientId);
  return getClientApplicationsStatus(applicationIDs)
}

function getLogsStatusClient(clientId) {
  const appsLogsMap = getClientApplicationsStatusBuilder(clientId);
  var clientLogsStatus = {};

  for (var [appID, logs] of appsLogsMap) {
    clientLogsStatus[appID] = sumSeverities(logs);
  }
  return clientLogsStatus;
}

function deleteLog(log) {
  return LogsService.deleteLog(log);
}

module.exports = {
  getLogs,
  deleteLog,
  sumSeverities,
  getClientApplicationsStatus,
  getClientApplicationsStatusBuilder,
  getLogsStatusClient
};
