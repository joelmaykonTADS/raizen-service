'use strict';

const userCase = require('./userCases')

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  userCase.employer.validation(requestBody, callback);
  const params = userCase.employer.data(requestBody);
  userCase.employer.create(params, callback);
};


module.exports.list = (event, context, callback) => {
  const params = userCase.employer.params();
  userCase.employer.list(params, callback);
};

module.exports.update = (event, context, callback) => {
  const requestBody = JSON.parse(event.body); 
  const { id } = event.queryStringParameters 
  userCase.employer.validation(requestBody, callback);
  const params = userCase.employer.paramsId(requestBody, id);
  userCase.employer.update(params, callback);
};

module.exports.remove = (event, context, callback) => {
  const { id } = event.queryStringParameters;
  const params = userCase.employer.paramsRemove(id);
  userCase.employer.remove(params, callback);
};
