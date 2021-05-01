const employer = require('./employer');


const validTable = 'EMPLOYER_TABLE';

test('List', async () =>{
    try {
        const res = await employer.list(validTable);
        expect(res).toBe('array')
        console.log(res)
    }catch(err){
        console.log('Erro testing employer list ', err);
    }
})