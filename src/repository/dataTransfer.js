DataTransfer = class {
   constructor(pool) {
       this.pool = pool
   }
   retrieveUsers = (callBackFromCaller) => {
       const callBack = (error, result) => {
           const users = []
           if (!error) {
               for (let i = 0; i < result.rows.length; i++) {
                   const user = {name: result.rows[i].name, birthDate: result.rows[i].birth_date}
                   users.push(user)
               }
               console.log("users dans la query %j", users)
           }
           callBackFromCaller(error, users)
       }
       this.pool.query('SELECT * FROM USERS ORDER BY NAME ASC', callBack)
   }
}

module.exports = DataTransfer
