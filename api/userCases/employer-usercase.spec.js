const employer = require('./employer-usercase');

test('List', async () => {
    process.env.EMPLOYER_TABLE = 'EMPLOYER_TABLE'
    function callback(data) {
        try {
            return;
        } catch (err) {
            console.log(err)
        }
    }
    employer.list(callback);
})