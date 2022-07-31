const db = require('./db_manager')
const classes = require('./lib_classes')

////// traitements requêtes //////
function getUserListByCatAndPresta(results, cat, presta_id) {
    let ut_liste = new classes.Ut_manager()
    results.forEach(element => {
        ut_liste.liste.push(new classes.Utilisateur(element))
    });
    ut_liste.byProfil(cat)
    ut_liste.byPresta(presta_id)
    return (ut_liste.liste)
}

function jnrApresSignal(results, response, data) {
    // jrn 1 - création signalement
    data.jrn_imm = false
    data.jrn_msg = 'signalement de ' + data.coordonneesUsager
    db.creaLigneJournal(data, (error, results) => {
        //  response.send({ status: true })
    })
    // jrn 2 - info usager - le cas échéant
    if (data.infoUsager !== '') {
        data.jrn_msg = data.infoUsager
        db.creaLigneJournal(data, (error, results) => {
            //  response.send({ status: true })
        })
    }
    // jrn 3 - attribution presta
    data.jrn_msg = 'attribution : ' + data.presta
    data.jrn_imm = true
    db.creaLigneJournal(data, (error, results) => {
        //  response.send({ status: true })
    })
}

function jnrApresAffectation(results, response, data) {
    // jrn 1 - prise en charge si 1ère affectation
    if (data.reaffect == 'false') {
        data.jrn_imm = false
        data.jrn_msg = 'prise en charge par notre technicien'
        db.creaLigneJournal(data, (error, results) => {
            //  response.send({ status: true })
        })
    }
    db.getUserNameByUuid(data.ut_uuid, (error, results) => {
        // jrn 2 - affectation
        data.jrn_msg = 'affectation ' + results[0].ut_prenom + ' ' + results[0].ut_nom
        data.jrn_imm = true
        db.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    })
}
function jnrApresAttribution(results, response, data) {
    db.getPrestaNameById(data.presta_id, (error, results) => {
        data.jrn_msg = 'attribution : ' + results[0].presta_nom
        data.jrn_imm = true
        db.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    })
}

//////////////////////////////////////////////
module.exports = {
    getUserListByCatAndPresta,
    jnrApresSignal,
    jnrApresAffectation,
    jnrApresAttribution,
}