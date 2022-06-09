const express = require('express');
const {Pool} = require("pg");
const userRouter = express.Router();
const dbConnection = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
});

const UserRepository = require('./user-repository');
const userService = new UserRepository(dbConnection);

userRouter.get('/users', async (_, response) => {
    try {
        const users = await userService.retrieveUsers()
        response.render("users", {users: users})
    } catch (error) {
        response.status(500).send(error)
    }
});

userRouter.post('/newUser', async (request, response) => {
    try {
        const result = await userService.createUser(request.body)
        response.redirect('/users')
    } catch (error) {
        console.error(error)
        response.status(400).send(error)
    }
});

module.exports = userRouter
