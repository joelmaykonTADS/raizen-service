const config = require('../config');

const create = (params, callback) => {
    const dynamoDb = config.aws.dynamoDBConnection();
    return dynamoDb.put(params, callback);
}

const list = (params, callback) => {
    const dynamoDb = config.aws.dynamoDBConnection();
    dynamoDb.scan(params, callback);
}

const update = (params, callback) => {
    const dynamoDb = config.aws.dynamoDBConnection();
    return dynamoDb.update(params, callback)
}

const remove = (params, callback) => {
    const dynamoDb = config.aws.dynamoDBConnection();
    return dynamoDb.delete(params, callback)
}

module.exports = { create, list, update, remove }