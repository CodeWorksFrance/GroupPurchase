const Pool = require('pg').Pool
const DataTransfer = require("../../src/repository/dataTransfer")
const UserRepository = require("../../src/repository/userRepository");

describe('pgUserRepository', () => {
    let pool
    let dataTransfer
    let repository

    beforeAll( () => {
        pool = new Pool({
            user: 'grouppurchaseadmin',
            host: 'localhost',
            database: 'grouppurchase',
            password: 'butterfly',
            port: 5432,
        })
        dataTransfer = new DataTransfer(pool)
        repository = new UserRepository(dataTransfer)
    })

    afterAll( () => {
        pool.end()
    })

    it('can retrieve all users', () => {
    })
})
