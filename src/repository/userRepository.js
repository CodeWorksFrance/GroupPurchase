UserRepository = class {
    constructor(dataTransfer) {
        this.dataTransfer = dataTransfer
    }
    createUser = (name, birthDate) => {
        return this.dataTransfer.createUser(name, birthDate)
    }
    retrieveUsers = (callBack) => {
        this.dataTransfer.retrieveUsers(callBack)
    }
}

module.exports = UserRepository
