const db = require('../dbConfig/init');

module.exports = class User {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.password = data.password

    };

    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM users;`)
                const users = result.rows.map(u => new User(u))
                resolve(authors);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    };

    static create(user){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`INSERT INTO user (name,password) VALUES ($1,$2) RETURNING *;`, [ user.name, user.password ]);
                resolve(userData.rows[0]);
            } catch (err) {
                reject('User could not be created');
            };
        });
    };


}
