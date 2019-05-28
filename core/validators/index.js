
function isDeleteLogRequestBodyValid(request) {
  return request && request.body && request.body.log && request.body.log.id;
}
function isgetClientApplicationsStatusRequestValid(request) {
  return request && request.query && request.query.clientId;
}
function isgetClientApplicationslogRequestValid(request) {
  return request && request.query && request.query.appId;
}
module.exports = {
  isDeleteLogRequestBodyValid,
  isgetClientApplicationsStatusRequestValid,
  isgetClientApplicationslogRequestValid
}
