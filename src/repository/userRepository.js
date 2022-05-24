class UserRepository{
    constructor(pool) {
        this.pool = pool
        //this.dataTransfer = dataTransfer
    }
    createUser = (name, birthDate, callBack) => {
       // this.dataTransfer.createUser(name, birthDate, callBack)
    }
    retrieveUsers() {
        const findUsersQuery = 'SELECT * FROM USERS ORDER BY NAME ASC';
        return this.pool.query(findUsersQuery)
            .then(response => response.rows)
            .catch(error =>  {
                console.log("An error has occured:::", error)
                throw error
            })
    }
}

module.exports = UserRepository
