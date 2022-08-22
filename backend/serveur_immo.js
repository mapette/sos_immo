const express = require('express')
const app = express()
const MD5 = require('sha1')
//path = require('path')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// gestion des cookies
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000000 } // 1000 minutes
    // cookie: { maxAge: 3000 } // 3 secondes
}))

// évite les pbmes de sécurité pour les envois front->back
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

const db = require('./src/db_manager')
const lib = require('./src/lib_serveur')
const trait = require('./src/lib_traitmt_req')

const port = 3001
app.listen(port)

//////      api     //////
app.get('/get_accueil', (request, response) => {
    if (request.session.uuid !== undefined) {
        console.log('cookie', request.session.ut)
        db.getUserNameByUuid(request.session.uuid, (error, results) => {
            if (results[0] !== undefined) {
                response.send({ id: results[0] })
            }
        })
    }
})
app.get('/get_userBySession', (request, response) => {
    response.send({ id: request.session.ut })
})

app.post('/loggin', (request, response) => {
    db.userLogin(request.body, (error, results) => {
        if (results[0] !== undefined) {
            request.session.isId = true
            request.session.profil = results[0]['hab_profil']
            request.session.uuid = results[0]['ut_uuid']
            request.session.ut = results[0]['ut_id']
        }
        response.json(results)
    })
})

app.post('/change_mdp', (request, response) => {
    let data = {
        ut_id: request.session.ut,
        ut_mdp: request.body.mdp,
        ut_newmdp: request.body.newmdp
    }
    db.userLogin(data, (error, results) => {
        if (results[0] === undefined) {     // devrait pas arriver
            response.send({ status: false })
        }
        else {
            db.change_mdp(data, (error, results) => {
                response.send({ status: true })
            })
        }
    })
})

//////////// gestion utilisateurs ////////////
app.post('/crea_user', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        let mdp = lib.genMdp()
        let data = {
            uuid: lib.genUuid(),
            username: request.body.username, nom: request.body.nom, prenom: request.body.prenom,
            tel: request.body.tel, mail: request.body.mail,
            presta: request.body.presta,
            mdp: MD5(request.body.username + mdp),
            adm: request.session.ut,
        }
        console.log('mot de passe à changer à la prochaine connexion => ', mdp)
        db.creationUtilisateur(data, (error, results) => {
        })
        data = {
            uuid: lib.genUuid(),
            username: request.body.username,
            profil: request.body.profil,
        }
        db.creationHabilitation(data, (error, results) => {
            response.send({ mdp: mdp })// - pour prépa du mail
        })
    }
})

app.get('/get_presta', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        db.getPrestaList((error, results) => {
            response.send(results)
        })
    }
})

app.get('/get_users', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        db.getUserList((error, results) => {
            response.send(results)
        })
    }
})
app.get('/get_usersByCatAndPresta/:cat/:presta_id', (request, response) => {
    if (request.session.isId == true & (request.session.profil == 3 | request.session.profil == 4)) {
        db.getUserList((error, results) => {
            response.send(trait.getUserListByCatAndPresta(results, request.params.cat, request.params.presta_id))
        })
    }
})

//////////// incidents ////////////
app.get('/get_inc_details:id', (request, response) => {
    if (request.session.isId == true) {
        db.getIncById(request.params.id, (error, results) => {
            response.send(results[0])
        })
    }
})
app.get('/get_inc_journal/:id/:infoImmoInclude', (request, response) => {
    if (request.session.isId == true) {
        let data = {
            id: request.params.id,
            infoImmoInclude: request.params.infoImmoInclude,
        }
        db.getJrnByIncId(data, (error, results) => {
            response.send(results)
        })
    }
})
app.post('/update_comm', (request, response) => {
    if (request.session.isId == true) {
        let data = {
            jrn_inc: request.body.jrn_inc,
            jrn_msg: request.body.jrn_msg,
            jrn_imm: request.body.jrn_imm
        }
        db.creaLigneJournal(data, (error, results) => {
            response.send({ jrn_id: results.insertId })
        })
    }
})

//////////// incidents usagers ////////////
app.get('/get_emp', (request, response) => {
    if (request.session.isId == true) {
        db.getEmpList((error, results) => {
            response.send(results)
        })
    }
})

app.post('/crea_signalement', (request, response) => {
    let data = {        // toutes les données nécessaires à toutes les req   
        infoUsager: request.body.info,
        emp: request.body.emp,
        tinc: request.body.tinc,
        ut: request.session.uuid,
    }
    // coordonnées de l'usager
    db.getUserNameByUuid(request.session.uuid, (error, results) => {
        data.coordonneesUsager = results[0].ut_prenom +
            ' ' + results[0].ut_nom +
            ' (tél ' + results[0].ut_tel + ')'
        // nom du presta
        db.getPrestaLibelleByTinc(data.tinc, (error, results) => {
            data.presta = results[0].presta_nom
        })
        if (request.session.isId == true) {
            // création incident
            db.creationSignalement(data, (error, results) => {
                data.jrn_inc = results.insertId
                // journal
                trait.jnrApresSignal(results, response, data)
                response.send({ status: true })
            })
        }
    })
})

app.get('/clotureInc:inc_id', (request, response) => {
    let data = {
        inc_id: request.params.inc_id,
        jrn_inc: request.params.inc_id,// doublon nécessaires pour les req sql
        ut_uuid: request.session.uuid,
        relance: false,
    }
    if (request.session.isId == true) {
        db.clotureInc(data, (error, results) => {
            // journal
            trait.jnrAprescloture(results, response, data)
            response.send({ status: true })
        })
    }
})
app.post('/clotureInc', (request, response) => {
    let data = {
        inc_id: request.body.inc_id,
        jrn_inc: request.body.inc_id,// doublon nécessaires pour les req sql
        ut_uuid: request.session.uuid,
        jrn_msg: request.body.info,
        relance: true,
    }
    if (request.session.isId == true) {
        db.clotureInc(data, (error, results) => {
            // journal
            trait.jnrAprescloture(results, response, data)
            response.send({ status: true })
            // recopier les data de l'inc terminé à l'identique dans un nouveau inc => url creaSignalement
        })
    }
})
app.get('/clotureInc', (request, response) => {
    if (request.session.isId == true && request.session.profil == 4) {
        // récupérer les id des incidents concencés - le cas échéant - pour le journal
        data = {
            filtre: 'tempsClotureExpire',
        }
        let listeInc = []
        db.getIncList(data, (error, results) => {
            // journal
            results.forEach(element => {
                let data =
                {
                    jrn_inc: element.inc_id,
                    jrn_msg: 'Intervention clôturée automatiquement',
                    jrn_imm: false,
                }
                trait.jnrAprescloture(results, response, data)
                listeInc.push(element.inc_id)
            });
            // maj incidents
            db.clotureInc(null, (error, results) => {
                response.send(listeInc)
            })
           
        })
    }
})

//////////// incidents presta ////////////
app.get('/get_incByPresta', (request, response) => {
    if (request.session.isId == true &&
        (request.session.profil == 2 | request.session.profil == 3)) {//| request.session.profil == 4 - imm
        data = {
            filtre: 'presta',
            uuid: request.session.uuid  // demandeur de la requête
        }
        db.getIncList(data, (error, results) => {
            response.send(results)
        })
    }
})
app.get('/get_incByUser', (request, response) => {
    if (request.session.isId == true) {
        data = {
            filtre: 'usager',
            uuid: request.session.uuid  // demandeur de la requête
        }
        db.getIncList(data, (error, results) => {
            response.send(results)
        })
    }
})
app.get('/get_inc', (request, response) => {
    if (request.session.isId == true) {
        data = {
            filtre: 'rien',
            uuid: request.session.uuid  // ici sans importance, je garde au cas où ça en aurait un jour
        }
        db.getIncList(data, (error, results) => {
            response.send(results)
        })
    }
})

app.get('/affectation:inc_id', (request, response) => {
    let data = {
        inc_id: request.params.inc_id,
        jrn_inc: request.params.inc_id,// doublon nécessaires pour les req sql
        ut_uuid: request.session.uuid,
        reaffect: 'false',
    }
    if (request.session.isId == true &&
        request.session.profil == 2) {
        db.affectationInc(data, (error, results) => {
            // journal
            trait.jnrApresAffectation(results, response, data)
            response.send({ status: true })
        })
    }
})
app.get('/affectation/:inc_id/:techno_id/:reaffect', (request, response) => {
    let data = {
        inc_id: request.params.inc_id,
        jrn_inc: request.params.inc_id,// doublon nécessaires pour les req sql
        ut_uuid: request.params.techno_id,
        reaffect: request.params.reaffect,
    }
    if (request.session.isId == true &&
        (request.session.profil == 3 | request.session.profil == 4)) {
        db.affectationInc(data, (error, results) => {
            // journal
            trait.jnrApresAffectation(results, response, data)
            response.send({ status: true })
        })
    }
})
app.get('/attribution/:inc_id/:presta_id', (request, response) => {
    let data = {
        inc_id: request.params.inc_id,
        jrn_inc: request.params.inc_id,// doublon nécessaires pour les req sql
        presta_id: request.params.presta_id,
    }
    if (request.session.isId == true &&
        request.session.profil == 4) {
        db.attributionInc(data, (error, results) => {
            // journal
            trait.jnrApresAttribution(results, response, data)
            response.send({ status: true })
        })
    }
})
app.get('/finIntervention:inc_id', (request, response) => {
    if (request.session.isId == true &&
        request.session.profil != 1) {
        db.finIntervention(request.params.inc_id, (error, results) => {
            // journal
            let data = {
                jrn_inc: request.params.inc_id,
                ut_uuid: request.session.uuid,
            }
            trait.jnrApresFin(results, response, data)
            response.send({ status: true })
        })
    }
})

/*

*/

