const request = require('supertest');

describe('Group purchases routes', function() {

    it('root page should render a welcome message', (done) => {
        request('http://localhost:3000')
            .get('/')
            .expect(200)
            .expect(response => {
                expect(response.text).toContain('Hi! welcome to the Groupped purchase!')
            })
            .end(done)
    });

    it('should display a table containing the name and creation birthdate of a user', (done) => {
        request('http://localhost:3000/users')
            .get('/')
            .expect(200)
            .expect(response => {
                expect(response.text).toContain('newUserForm')
                expect(response.text).toContain('<table class="ui celled table center aligned"><tbody><tr><th>Name</th><th>Date</th></tr>')
            })
            .end(done)
    });

    it('should display the details of an imported purchase', (done) => {
        request('http://localhost:3000/purchase/10')
            .get('/')
            .expect(200)
            .expect(response => {
                expect(response.text).not.toBeNull();
            })
            .end(done)
    });


});
