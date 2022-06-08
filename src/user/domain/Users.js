class Users {

    mapUsers(rawUsers) {
        const users = []
        for (let i = 0; i < rawUsers.length; i++) {
            const user = {name: rawUsers[i].name, birthDate: rawUsers[i].birth_date}
            users.push(user)
        }
        return users;
    }
}

module.exports = Users;
