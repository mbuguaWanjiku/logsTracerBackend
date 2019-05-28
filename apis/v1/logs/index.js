const express = require("express");
var router = express.Router();
const logs = require("../../../core/logs");
const validators = require("../../../core/validators");

router.get("/up", (req, res) => {
  const result = "running";
  res.send({ result: result });
});

router.get("/apis/v1/logs/app/", (req, res) => {
  if (validators.isgetClientApplicationslogRequestValid(req)) {
    let appId = req.query.appId;
    const result = logs.getLogs(appId);
    console.log("received logs  request for application : " + appId)
    res.send({ result: {
      logs:result,
      appId:appId
    } });
  } else {
    res.status(400);
    res.send({ error: "unexpected reuest params" });
  }
});

router.get("/apis/v1/logs/status/client/", (req, res) => {
  if (validators.isgetClientApplicationsStatusRequestValid(req)) {
    let clientId = req.query.clientId;
    console.log("received status request for client : " + clientId)
    let result = logs.getLogsStatusClient(clientId);
    res.send({ result: result });
  } else {
    res.status(400);
    res.send({ error: "unexpected reuest params" });
  }
});

router.delete("/apis/v1/log/delete", (req, res, next) => {
  if (validators.isDeleteLogRequestBodyValid(req)) {
    const result = logs.deleteLog(req.body.log);

    res.send({ result: result });
  } else {
    res.status(400);
    res.send({ error: "unexpected body" });
  }
});

module.exports = router;
