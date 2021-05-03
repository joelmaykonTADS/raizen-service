const uuid = require('uuid');
const serviceDB = require('../repositories');


const create = (employer, callback) => {
    const createdEmployer = (err, data) => {
        if (err) {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: `Unable to submit employer with office ${employer.office}`
                })
            })
        } else {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Sucessfully submitted employer with office ${employer.office}`,
                    employerId: employer.id
                })
            });
        }
    };

    const params = {
        TableName: process.env.EMPLOYER_TABLE,
        Item: employer,
    };
    return serviceDB.dynamo.create(params, createdEmployer)
};

const data = ({ fullname, office, age }) => {
    const timestamp = new Date().getTime();
    return {
        id: uuid.v1(),
        fullname: fullname,
        office: office,
        age: age,
        submittedAt: timestamp,
        updatedAt: timestamp,
    };
};

const validation = ({ fullname, office, age }, callback) => {
    if (typeof fullname !== 'string' || typeof office !== 'string' || typeof age !== 'number') {
        callback(new Error('Couldn\'t submit employer because of validation errors.'));
        return;
    }
}

const list = (params, callback) => {
    const onScan = (err, data) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    employers: data.Items
                })
            });
        }
    };
    serviceDB.dynamo.list(params, onScan);
}

const params = () => {
    const params = {
        TableName: process.env.EMPLOYER_TABLE,
        ProjectionExpression: "id, fullname, office, age"
    };
    return params;
}

const update = (params, callback) => {
    const updatedEmployer = (err, data) => {
        const info = data.Attributes;
        if (err) {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: `Unable to update employer with office ${info.office}`
                })
            })
        } else {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Sucessfully update employer with office ${info.office}`,
                    employerId: info.id
                })
            });
        }
    };

    return serviceDB.dynamo.update(params, updatedEmployer)
}

const paramsId = ({ fullname, office, age }, id) => {
    const params = {
        TableName: process.env.EMPLOYER_TABLE,
        Key: {
            "id": id
        },
        UpdateExpression: "set #fullname = :fullname, #office = :office, #age = :age",
        ExpressionAttributeNames: {
            "#fullname": "fullname",
            "#office": "office",
            "#age": "age"
        },
        ExpressionAttributeValues: {
            ":fullname": fullname,
            ":office": office,
            ":age": age
        },
        ReturnValues: 'ALL_NEW'
    };
    return params;
}

const paramsRemove = (id) => {
    const params = {
        TableName: process.env.EMPLOYER_TABLE,
        Key: {
            "id": id,          
        }
    };
    return params;
}

const remove = (params, callback) => {
    const removeEmployer = (err, data) => {
        if (err) {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: `Unable to remove employer with office`
                })
            })
        } else {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Sucessfully remove employer with office`,
                    employerId: params.id
                })
            });
        }
    };

    return serviceDB.dynamo.remove(params, removeEmployer)
}

module.exports = { create, data, validation, list, update, paramsId, params, remove, paramsRemove }