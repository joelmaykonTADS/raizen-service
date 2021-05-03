'use strict';

const userCase = require('./userCases')

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  userCase.employer.validation(requestBody, callback);
  const employer = userCase.employer.data(requestBody);
  userCase.employer.create(employer, callback);
};


module.exports.list = (event, context, callback) => {
  userCase.employer.list(callback);
};

module.exports.update = (event, context, callback) => {
  const requestBody = JSON.parse(event.body); 
  userCase.employer.validation(requestBody, callback);
  userCase.employer.update(requestBody, callback);
};

module.exports.remove = (event, context, callback) => {
  const { id } = event.queryStringParameters;
  userCase.employer.remove(id, callback);
};
