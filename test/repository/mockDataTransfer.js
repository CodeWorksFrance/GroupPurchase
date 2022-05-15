MockDataTransfer = class {
    constructor() {
        this.lastUserId = 0
        this.users = []
    }
    createUser = (name, birthDate, callBack) => {
        if(this.users.find( user => { return (user.name === name) })) {
            callBack(new Error (`User ${name} already exists`), null)
        } else {
            this.lastUserId += 1
            const user = {id: this.lastUserId, name: name, birthDate: birthDate}
            this.users.push(user)
            callBack(null, user)
        }
    }

    retrieveUsers =  (callBack) => {
        const users =  this.users.sort( (a,b) => {
            if(a.name < b.name)
                return -1
            else
                return +1
        })
        callBack(null, users)
    }
}

module.exports = MockDataTransfer

