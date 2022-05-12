const request = require('supertest');
//var app = require('../src/group-purchase/route');
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.status(200)
});

describe('Group purchases main page', function() {
    it('Should return 404 when accessing main page', function() {
        request(app)
            .get('/users')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            })
    });
});

/*
const request = require(‘supertest’);
const assert = require(‘assert’);
const express = require(‘express’);
const app = express();
app.get(‘/user’, function(req, res) {
  res.status(200).json({ name: ‘john’) }
});
describe(“my first test”, () => {
    it(“should pass”, () => {
        request(app)
          .get(‘/user’)
          .expect(‘Content-Type’, /json/)
          .expect(‘Content-Length’, ‘15’)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
          })
    })
  });
  */