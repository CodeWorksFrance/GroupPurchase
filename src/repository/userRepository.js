UserRepository = class {
    constructor(concreteRepository) {
        this.concreteRepository = concreteRepository
    }
    createUser = (name, birthDate) => {
        return this.concreteRepository.createUser(name, birthDate)
    }
    retrieveUsers = () => {
        return this.concreteRepository.retrieveUsers()
    }
}

module.exports = UserRepository
