const {successReponse} = require('./responses');

describe('Testing success response', ()=>{
    it('It should return 200 status code', () => {
        expect(successReponse(200,{},'Testing').statusCode).toBe(200);
    })
})