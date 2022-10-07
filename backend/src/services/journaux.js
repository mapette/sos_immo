const data_jrn = require('./../data/journaux')
const data_ut = require('../data/utilisateurs')
const data_presta = require('../data/presta')

function getJrnByIncId(request, response){
    let dataJrn ={
        id: request.params.id,
        infoImmoInclude: request.params.infoImmoInclude,
    } 
    data_jrn.getJrnByIncId(dataJrn, (error, results) => {
        response.send(results)
    })
}

function UpdateJrn(request, response){
    let dataJrn ={
        jrn_inc: request.body.jrn_inc,
        jrn_msg: request.body.jrn_msg,
        jrn_imm: request.body.jrn_imm,
        jrn_msg: request.body.info,
    } 
    data_jrn.creaLigneJournal(dataJrn, (error, results) => {
        response.send({ jrn_id: results.insertId })
    })
}

function jnrApresSignal(results, response, data) {
    // jrn 1 - création signalement
    data.jrn_imm = false
    data.jrn_msg = 'Signalement de ' + data.coordonneesUsager
    data_jrn.creaLigneJournal(data, (error, results) => {
        //  response.send({ status: true })
    })
    // jrn 2 - info usager - le cas échéant
    if (data.infoUsager !== '') {
        data.jrn_msg = data.infoUsager
        data_jrn.creaLigneJournal(data, (error, results) => {
            //  response.send({ status: true })
        })
    }
    // jrn 3 - attribution presta
    data.jrn_msg = 'Attribution : ' + data.presta
    data.jrn_imm = true
    data_jrn.creaLigneJournal(data, (error, results) => {
        //  response.send({ status: true })
    })
}

function jnrApresAffectation(results, response, data) {
    // jrn 1 - prise en charge si 1ère affectation
    if (data.reaffect == 'false') {
        data.jrn_imm = false
        data.jrn_msg = 'Prise en charge par notre technicien'
        data_jrn.creaLigneJournal(data, (error, results) => {
            //  response.send({ status: true })
        })
    }
    data_ut.getUserByUuid(data.ut_uuid, (error, results) => {
        // jrn 2 - affectation
        data.jrn_msg = 'Affectation ' + results[0].ut_prenom + ' ' + results[0].ut_nom
        data.jrn_imm = true
        data_jrn.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    })
}
function jnrApresAttribution(results, response, data) {
    data_presta.getPrestaNameById(data.presta_id, (error, results) => {
        data.jrn_msg = 'Attribution : ' + results[0].presta_nom
        data.jrn_imm = true
        data_jrn.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    })
}

function jnrApresFin(results, response, data) {
    // jrn 1 - prise en charge si 1ère affectation
    data.jrn_msg = 'Intervention terminée'
    data.jrn_imm = false
    data_jrn.creaLigneJournal(data, (error, results) => {
        //  response.send({ status: true })
    })
    data_ut.getUserByUuid(data.ut_uuid, (error, results) => {
        // jrn 2 - affectation
        data.jrn_msg = 'Fin intervention : ' + results[0].ut_prenom + ' ' + results[0].ut_nom
        data.jrn_imm = true
        data_jrn.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    })
}

function jnrAprescloture(results, response,data) {
    if (data.relance) {
        data.jrn_msg = 'Relance demandée - Motif : ' + data.jrn_msg
        data.jrn_imm = false
        data_jrn.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    }
    if (data.ut_uuid) {
        data_ut.getUserByUuid(data.ut_uuid, (error, results) => {
            data.jrn_msg = 'Intervention clôturée : ' + results[0].ut_prenom + ' ' + results[0].ut_nom
            data.jrn_imm = false
            data_jrn.creaLigneJournal(data, (error, results) => {
                // response.send({ status: true })
            })
        })
    } else {
        data_jrn.creaLigneJournal(data, (error, results) => {
            // response.send({ status: true })
        })
    }
}

module.exports = {
    getJrnByIncId,
    UpdateJrn,


    jnrApresSignal,
    jnrApresAffectation,
    jnrApresAttribution,
    jnrApresFin,
    jnrAprescloture,

}