MockDataTransfer = class {
    constructor() {
        this.lastUserId = 0
        this.users = []
    }
    createUser = (name,birthDate) => {
        if(this.users.find( user => { return (user.name === name) })) {
            throw new Error (`User ${name} already exists`)
        }
        this.lastUserId += 1
        const newUser = {id: this.lastUserId, name: name, birthDate: birthDate}
        this.users.push(newUser)
        return newUser
    }
    retrieveUsers =  () => {
        return this.users.sort( (a,b) => {
            if(a.name < b.name)
                return -1
            else
                return +1
        })
    }
}

module.exports = MockDataTransfer

