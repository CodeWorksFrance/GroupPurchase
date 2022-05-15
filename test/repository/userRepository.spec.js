const UserRepository = require("../../src/repository/userRepository");
const MockDataTransfer = require("./mockDataTransfer");

describe('UserRepository', function () {

    it('can create a user and give it a distinct id', () => {
        const repository = new UserRepository(new MockDataTransfer())
        expect(repository.createUser('Clara',new Date(1998, 10, 23))).toStrictEqual(
            {
                id: 1,
                name: 'Clara',
                birthDate: new Date(1998, 10, 23),
            }
        )
    })
    it('can retrieve all users', () => {
        const repository = new UserRepository(new MockDataTransfer())
        repository.createUser('Clara', new Date(1998, 10,23))
        repository.createUser('Desmond', new Date(2000, 9, 10))
        repository.createUser('Alice', new Date(1999,4, 17))
        expect(repository.retrieveUsers()).toStrictEqual( [
            { name: 'Alice', birthDate: new Date(1999,4,17), id: 3 },
            { name: 'Clara', birthDate: new Date(1998,10,23), id: 1},
            { name: 'Desmond', birthDate: new Date(2000,9,10), id: 2}])
    })
    it('return an error when trying to create an existing user', () => {
        const repository = new UserRepository(new MockDataTransfer())
        expect(repository.createUser('Clara',new Date(1998, 10, 23))).toStrictEqual(
            {
                id: 1,
                name: 'Clara',
                birthDate: new Date(1998, 10, 23),
            }
        )
        expect(() => {
            repository.createUser('Clara', new Date(2005, 7, 28))
        }).toThrow(Error)
    })
})
