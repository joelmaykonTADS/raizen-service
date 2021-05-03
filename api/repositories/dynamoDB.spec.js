const serviceDB = require('../repositories');

const people = {
    fullname: "Joel",
    office: "Developer",
    age: 26
}

const params = {
    TableName: 'EMPLOYER_TABLE',
    Key: {
        fullname: "Joel",
        office: "Developer",
        age: 26
    },
    Item: people,
};

function callback(data) {
    try {
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

test('List', async () => {    
    serviceDB.dynamo.list(params, callback)
})