'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');


let options = {}

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

if (process.env.JEST_WORKER_ID) {
  options = {
    region: 'local-env',
    endpoint: 'http://localhost:8000',
    sslEnabled: false
  }
}

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient(options);


module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const email = requestBody.email;
  const experience = requestBody.experience;

  if (typeof fullname !== 'string' || typeof email !== 'string' || typeof experience !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit employer because of validation errors.'));
    return;
  }

  submitEmployerP(employerInfo(fullname, email, experience))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted employer with email ${email}`,
          employerId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit employer with email ${email}`
        })
      })
    });
};


const submitEmployerP = employer => {
  console.log('Submitting employer');
  const employerInfo = {
    TableName: process.env.EMPLOYER_TABLE,
    Item: employer,
  };
  return dynamoDb.put(employerInfo).promise()
    .then(res => employer);
};

const employerInfo = (fullname, email, experience) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    fullname: fullname,
    email: email,
    experience: experience,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};

module.exports.list = (event, context, callback) => {
  var params = {
    TableName: process.env.EMPLOYER_TABLE,
    ProjectionExpression: "id, fullname, email, experience"
  };

  console.log("Scanning employer table.");
  const onScan = (err, data) => {

    if (err) {
      console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("Scan succeeded.");
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          employers: data.Items
        })
      });
    }

  };

  dynamoDb.scan(params, onScan);

};

module.exports.update = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const email = requestBody.email;
  const experience = requestBody.experience;
  const id = requestBody.id;
  
  const params = {
      TableName: process.env.EMPLOYER_TABLE,
      Key: {
          "id": id
      },
      UpdateExpression: "set #fullname = :fullname, #email = :email, #experience = :experience",
      ExpressionAttributeNames: {
          "#fullname": "fullname",
          "#email"   : "email",
          "#experience" : "experience"
      },
      ExpressionAttributeValues: {
          ":fullname": fullname,
          ":email": email,
          ":experience": experience
      },
      ReturnValues: 'ALL_NEW'
  };

  dynamoDb.update(params).promise().then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully update employer with email ${email}`,
        employerId: res.id
      })
    });
  })
  .catch(err => {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to update employer with email ${email}`
      })
    })
  });
};