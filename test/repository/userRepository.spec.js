const UserRepository = require("../../src/repository/userRepository");

describe('userRepository', () => {
    let lastUserId
    let users

    beforeEach( () => {
        lastUserId =0
        users = []
    })
    mockUserRepository = {
        createUser: (name,birthDate) => {
            lastUserId += 1
            const newUser = {id: lastUserId, name: name, birthDate: birthDate}
            users.push(newUser)
            return newUser
        },
        retrieveUsers: () => {
            return users.sort( (a,b) => {
                if(a.name < b.name)
                    return -1
                else
                    return +1
            })
        },
    }
    it('can create a user and give it a distinct id', () => {
        const repository = new UserRepository(mockUserRepository)
        expect(repository.createUser('Clara',new Date(1998, 10, 23))).toStrictEqual(
            {
                id: 1,
                name: 'Clara',
                birthDate: new Date(1998, 10, 23),
            }
        )
    })
    it('can retrieve all users', () => {
        const repository = new UserRepository(mockUserRepository)
        repository.createUser('Clara', new Date(1998, 10,23))
        repository.createUser('Desmond', new Date(2000, 9, 10))
        repository.createUser('Alice', new Date(1999,4, 17))
        expect(repository.retrieveUsers()).toStrictEqual( [
            { name: 'Alice', birthDate: new Date(1999,4,17), id: 3 },
            { name: 'Clara', birthDate: new Date(1998,10,23), id: 1},
            { name: 'Desmond', birthDate: new Date(2000,9,10), id: 2}])
    })
})
