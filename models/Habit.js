const db = require('../dbConfig/init');

const User = reqiure('./User')

module.exports = class Habit {
    constructor(data) {
        this.is = data.id
        this.description = data.description
        this.user = {id: data.user_id, name: data.user_name }
    }

    static findByUserId(id){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT * FROM habits WHERE user_id = $1;`, [ id ]);
                resolve (userData.rows.map(u => new User(u)))
            } catch (err) {
                reject('User not found');
            };
        });
    };

    static create(description,user_id){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`INSERT INTO habits (description,user_id) VALUES ($1,$2) RETURNING *;`, [ description, user_id]);
                new Habit(habitData.rows[0]);
            } catch (err) {
                reject('Habit could not be created');
            };
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM habits WHERE id = $1 RETURNING id`, [ this.id ]);
                resolve(`Habit ${result.id} was deleted`)
            } catch (err) {
                reject('Habit could not be deleted')
            };
        });  
    };
}

