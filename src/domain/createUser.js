const createUser = (request, response) => {
    const {name, birthDate} = request.body
    userRepository.createUser(name, birthDate, (error, user) => {
        if (error) {
            response.status(400).send(error)
        } else {
            response.status(201).send(`User added with ID: ${user.id}`)
        }
    })
}

module.exports = createUser
