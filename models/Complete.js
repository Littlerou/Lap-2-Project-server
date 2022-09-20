const db = require('../dbConfig/init');

module.exports = class Complete {
    constructor(data) {
        this.data = data.date
        this.id = data.achievement_id
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let achievementData = await db.query(`SELECT * FROM authors WHERE id = $1;`, [ id ]);
                resolve (achievementData.rows.map(a => new Complete(a)))
            } catch (err) {
                reject('Achievement not found');
            };
        });
    };

    // delete dates along with achivement (tue)
    // destroy(){
    //     return new Promise(async(resolve, reject) => {
    //         try {
    //             const result = await db.query(`DELETE date FROM completed WHERE id = $1 RETURNING id`, [ this.id ]);
    //             resolve(`Achievements ${result.id} was deleted`)
    //         } catch (err) {
    //             reject('Achievements could not be deleted')
    //         }
    //     })   
    // }



}
