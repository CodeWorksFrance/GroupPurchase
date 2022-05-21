UserRepository = class {
    retrieveUsersP = async () => {
        const result = await this.dataTransfer.retrieveUsersP()
        return result
    }
    constructor(dataTransfer) {
        this.dataTransfer = dataTransfer
    }
    createUser = (name, birthDate, callBack) => {
        this.dataTransfer.createUser(name, birthDate, callBack)
    }
    retrieveUsers = (callBack) => {
        this.dataTransfer.retrieveUsers(callBack)
    }
}

module.exports = UserRepository
