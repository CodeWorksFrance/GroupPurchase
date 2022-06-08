const UserRepository = require("../../src/repository/userRepository");
const MockDataTransfer = require("./mockDataTransfer");
const Pool = require('pg').Pool
const DataTransfer = require("../../src/repository/dataTransfer")

describe('UserRepository',  () => {
    let pool
    let dataTransfer
    let repository

    beforeAll( () => {
        const pool = new Pool({
            user: 'grouppurchaseadmin',
            host: 'localhost',
            database: 'grouppurchase',
            password: 'butterfly',
            port: 5432,
        })
        dataTransfer = new MockDataTransfer()
    })
    afterAll( () => {
        if(pool) {
            pool.end()
        }
    })

    beforeEach(() => {
        repository = new UserRepository(dataTransfer)
    })

    it('can create a user and give it a distinct id', () => {
        repository.createUser('Clara', new Date(1998, 10, 23), (error, user) => {
            expect(user).toStrictEqual(
                {
                    id: 1,
                    name: 'Clara',
                    birthDate: new Date(1998, 10, 23),
                })
        })
    })

    it('can retrieve all users', () => {
        repository.createUser('Clara', new Date(1998, 10,23), (error, user) => {} )
        repository.createUser('Desmond', new Date(2000, 9, 10), (error, user) => {} )
        repository.createUser('Alice', new Date(1999,4, 17), (error, user) => {} )
        repository.retrieveUsers((error, result) => {
            expect(result).toStrictEqual([
                { name: 'Alice', birthDate: new Date(1999,4,17), id: 3 },
                { name: 'Clara', birthDate: new Date(1998,10,23), id: 1},
                { name: 'Desmond', birthDate: new Date(2000,9,10), id: 2}])
        })
    })

    it('return an error when trying to create an existing user', () => {
        repository.createUser('Clara', new Date(1998, 10,23), (error, user) => {})
        repository.createUser('Clara', new Date(2005, 7, 28), (error, user) => {
            expect(error).toStrictEqual(new Error('User Clara already exists'))
        })
    })
})
