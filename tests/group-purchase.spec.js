const request = require('supertest');

describe('Group purchases main page', function() {
    it('Smoke testing an external & public API', function(done) {
        request('https://dog.ceo')
            .get('/api/breed/hound/list')
            .expect(200)
            .expect(response => {
                expect(response.body.message).toEqual(expect.arrayContaining([
                    'afghan',
                    'basset',
                    'blood',
                    'english',
                    'ibizan',
                    'plott',
                    'walker'
                ]))
                expect(response.body.status).toEqual('success')
            })
            .end(done)
    });
    it('Testing with localhost', (done) => {
        request('http://localhost:3000')
            .get('/new')
            .expect(200)
            .expect(response => {
                expect(response.text).not.toBeNull()
            })
            .end(done)

    });
});
