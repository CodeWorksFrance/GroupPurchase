const Users = require("./domain/Users");
const users = new Users();


class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }

    retrieveUsers() {
        const findUsersQuery = 'SELECT * FROM USERS ORDER BY NAME ASC';
        return this.pool.query(findUsersQuery)
            .then(response => users.mapUsers(response.rows))
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            });
    }

    createUser(payload) {
        const newUser = payload;
        return this.pool.query('INSERT INTO USERS (name, birth_date) VALUES ($1, $2)', [newUser.user, newUser.date])
            .then(response => response)
            .catch(error => {
                console.log("An error has occured:::", error)
                throw error
            });
    }
}

module.exports = UserRepository;
