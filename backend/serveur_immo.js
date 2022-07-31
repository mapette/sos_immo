const express = require('express')
const app = express()
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

const MD5 = require('sha1')

//////      api     //////
app.get('/get_accueil', (request, response) => {
    if (request.session.uuid !== undefined) {
        console.log('cookie', request.session.ut)
        db.getUserNameByUuid(request.session.uuid, (error, results) => {
            console.log(results[0])
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
// app.get('/exit', (req, res) => {
//     console.log('je sors')
//     res.redirect('get_accueil')
// })

//////////// gestion utilisateurs ////////////
app.post('/crea_user', (request, response) => {
    console.log('cookie av création ', request.session)
    if (request.session.isId == true & request.session.profil == 4) {
        let mdp = lib.genMdp()
        console.log('mot de passe à changer à la prochaine connexion => ', mdp)
        let data = {
            uuid: lib.genUuid(),
            username: request.body.username, nom: request.body.nom, prenom: request.body.prenom,
            tel: request.body.tel, mail: request.body.mail,
            presta: request.body.presta,
            mdp: MD5(request.body.username + mdp),
            adm: request.session.ut,
        }
        db.creationUtilisateur(data, (error, results) => {
            // response.send(results)
        })
        data = {
            uuid: lib.genUuid(),
            username: request.body.username,
            profil: request.body.profil,
        }
        db.creationHabilitation(data, (error, results) => {
            response.send({ status: true })// - si pas réponse, le fetch ne peut pas avoir de .then
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
        tinc_id: request.body.inc,
        infoUsager: request.body.info,
        emp: request.body.emp,
        tinc: request.body.inc,
        ut: request.session.uuid,
    }
    // coordonnées de l'usager
    db.getUserNameByUuid(request.session.uuid, (error, results) => {
        data.coordonneesUsager = results[0].ut_prenom +
            ' ' + results[0].ut_nom +
            ' (tél ' + results[0].ut_tel + ')'
        // nom du presta
        trait.getPrestaLibelleByTinc(data.tinc_id, (error, results) => {
            data.presta = results[0].presta_nom
        })
        if (request.session.isId == true) {
            // création incident
            db.creationSignalement(data, (error, results) => {
                data.jrn_inc = results.insertId
                console.log('av jrn', data)
                // journal
                trait.jnrApresSignal(results, response, data)
                response.send({ status: true })
            })

        }
    })
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
    console.log(data)
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
    console.log('data', data)
    if (request.session.isId == true &&
        request.session.profil == 4) {
        db.attributionInc(data, (error, results) => {
            // journal
            trait.jnrApresAttribution(results, response, data)
            response.send({ status: true })
        })
    }
})

app.post('/update_comm', (request, response) => {
    //   console.log('req.body', request.body)
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

/*

*/

