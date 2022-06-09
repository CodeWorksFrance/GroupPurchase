const express = require('express');
const UserRepository = require('./user-repository');
const dbConnection = require("../config/secrets");

const userService = new UserRepository(dbConnection);

const userRouter = express.Router();

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
