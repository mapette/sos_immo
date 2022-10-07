const lib = require('../lib_serveur')

const data_inc = require('../data/incidents')
const data_ut = require('../data/utilisateurs')
const data_presta = require('../data/presta')
const serv_jrn = require('../services/journaux')


function getIncById (request, response){
    data_inc.getIncById(request.params.id, (error, results) => {
        response.send(results[0])
    })
}

function creaSignalement(request, response){
    let data = {        // toutes les données nécessaires aux req   
        infoUsager: request.body.info,
        emp: request.body.emp,
        tinc: request.body.tinc,
        ut: request.session.uuid,
    }
    data_ut.getUserByUuid(request.session.uuid, (error, results) => {
        data.coordonneesUsager = results[0].ut_prenom +
            ' ' + results[0].ut_nom +
            ' (tél ' + results[0].ut_tel + ')'
        // nom du presta
        data_presta.getPrestaLibelleByTinc(data.tinc, (error, results) => {
            data.presta = results[0].presta_nom
        })
        // création incident
        data_inc.creationSignalement(data, (error, results) => {
            data.jrn_inc = results.insertId
            // journal
            serv_jrn.jnrApresSignal(results, response, data)
            response.send({ status: true })
        })
    })
}

function getInc(dataInc, response){
    data_inc.getIncList(dataInc, (error, results) => {
        response.send(results)
    })
}

function affectation(request,response){
    if(request.params.reaffect === undefined){  // auto-affectation
        request.params.reaffect = 'false'
        request.params.techno_id = request.session.uuid
    }
    let dataAffect = {
        inc_id: request.params.inc_id,
        jrn_inc: request.params.inc_id,// doublon nécessaires pour les req sql
        ut_uuid: request.params.techno_id,
        reaffect: request.params.reaffect,
    }
    data_inc.affectationInc(dataAffect, (error, results) => {
        // journal
        serv_jrn.jnrApresAffectation(results, response, dataAffect)
        response.send({ status: true }) 
    })
}

function attribution(request,response){
    let dataJrn = {
        inc_id: request.inc_id,
        jrn_inc: request.inc_id,// doublon nécessaires pour les req sql
        presta_id: request.presta_id,
    }
    data_inc.attributionInc(dataJrn, (error, results) => {
        // journal
        serv_jrn.jnrApresAttribution(results, response, dataJrn)
        response.send({ status: true })
    })
}

function clotInc(request, response){
    let dataCloture = {
        ut_uuid :  request.session.uuid,
        relance : false,
    }
    if(request.params.inc_id !== undefined){    // clôture d'1 inc avec satisfaction
        dataCloture.inc_id=  request.params.inc_id
        dataCloture.jrn_inc = request.params.inc_id// doublon nécessaires pour les req sql
        }
    else if(request.body.inc_id !== undefined){    // clôture d'1 inc avec insatisfaction (commentaire)
        dataCloture.inc_id=  request.body.inc_id
        dataCloture.jrn_inc = request.body.inc_id// doublon nécessaires pour les req sql
        }
    data_inc.clotureInc(dataCloture, (error, results) => {
        // journal
        serv_jrn.jnrAprescloture(results, response, dataCloture)
        response.send({ status: true })
    })
}

function clotIncList(filtre, response){  // clôture tous les incidents fermés +48 heures
    let listeInc = []
    data_inc.getIncList(filtre, (error, results) => {
        // journal
        console.log('results',results)
        results.forEach(element => {
            let dataJrn =
            {
                jrn_inc: element.inc_id,
                jrn_msg: 'Intervention clôturée automatiquement',
                jrn_imm: false,
            }
            serv_jrn.jnrAprescloture(results, response, dataJrn)
            listeInc.push(element.inc_id)
        });
        // maj incidents
        data_inc.clotureInc(null, (error, results) => {
            response.send(listeInc)
        })

    })
}

function finInc(request, response){
    data_inc.finIntervention(request.params.inc_id, (error, results) => {
        // journal
        let data = {
            jrn_inc: request.params.inc_id,
            ut_uuid: request.session.uuid,
        }
        serv_jrn.jnrApresFin(results, response, data)
        response.send({ status: true })
    })
}








module.exports = {
    getIncById,
    creaSignalement,
    getInc,
    affectation,
    attribution,
    clotInc,
    clotIncList,
    finInc,

}