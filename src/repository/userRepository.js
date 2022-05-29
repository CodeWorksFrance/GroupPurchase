UserRepository = class {

    constructor(dataTransfer) {
        this.dataTransfer = dataTransfer
    }

    retrieveUsersP = () => this.dataTransfer.retrieveUsersP()

    createUser = (name, birthDate, callBack) => {
        this.dataTransfer.createUser(name, birthDate, callBack)
    }
    retrieveUsers = (callBack) => {
        this.dataTransfer.retrieveUsers(callBack)
    }
}

module.exports = UserRepository
