const db = require('./db_manager')
const lib = require('./lib_serveur')

class Message {
    constructor(type, data, conf = false) {
        this.type = type       // signal-info-attrib-affect-fin-cloture
        this.data = data       // nécessaire à la construction du message
        this.conf = conf       // true : uniquement immo - false par défaut dans la table 'journaux'
    }


    getMsg() {
        switch (this.type) {
            case 'signal':
                // récup coordonnées
                // db.getUserByUuid(this.data, (error, results) => {
                //     msg = 'Signalement ' + results[0].ut_prenom +
                //         ' ' + results[0].ut_nom +
                //         ' ' + results[0].ut_tel
                //     callback(msg)
                // })
                
                break
            case 'info':
                console.log('info')
                break
            case 'attrib':
                break
            case 'affect':
                break
            case 'fin':
                break
            case 'cloture':
                break
        }


    }




}

module.exports = Message;





//     getName(){
//         return this.name
//     }
//     getLifePoints(){
//         return this.lifePoints
//     }
//     lostLifePoints(amount){
//         this.lifePoints-= amount
//     }
//     gainedLifePoints(amount){
//         this.lifePoints+= amount
//     }
//     getIsDead(){
//         if(this.getLifePoints()==0){
//             return true
//         }
//         return false
//     }
//     hitSomeone(person2){
//         if (person2 !== this)
//         {
//             person2.lostLifePoints(10)
//         }   
//     }
// }
// p1 = new Person
// p2 = new Person
// p1.hitSomeone(p1)
// console.log(p1.getLifePoints())
// console.log(p2.getLifePoints())

