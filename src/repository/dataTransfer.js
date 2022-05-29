DataTransfer = class {
   constructor(pool) {
       this.pool = pool
   }
    retrieveUsersP = async () => {
        const result = await this.pool.query('SELECT * FROM Users ORDER BY Name ASC');
        // everything from here is the promise.then() part
        const users = []
        for (let i = 0; i < result.rows.length; i++) {
            const user = {name: result.rows[i].name, birthDate: result.rows[i].birth_date}
            users.push(user)
        }
        return users; // this return is *NOT* the return of the retrieveUsersP
    }

   retrieveUsers = (callBack) => {
       this.pool.query('SELECT * FROM USERS ORDER BY NAME ASC', (error, result) => {
           const users = []
           if (!error) {
               for (let i = 0; i < result.rows.length; i++) {
                   const user = {name: result.rows[i].name, birthDate: result.rows[i].birth_date}
                   users.push(user)
               }
           }
           callBack(error, users)
       })
   }

   createUser = (name, birthDate, callBack) => {
       this.pool.query('INSERT INTO USERS (name, birth_date) VALUES ($1, $2) RETURNING Id;', [name, birthDate], (error, result) => {
           if(error) {
               callBack(error, null)
           } else {
               const user = { name: name, birthDate: birthDate, id: result.rows[0].id }
               callBack(null, user)
           }
       })
   }
}

module.exports = DataTransfer
