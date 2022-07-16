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
//const msg = require('../src/message')

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
            // db.traitementApReq(results, response)        // réponse déjà envoyée
        })
    }
})
app.get('/get_userBySession', (request, response) => {
    console.log(request.session.ut)
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
        db.traitementApReq(results, response)
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
        //  db.traitementApReq(results, response)    // réponse déjà envoyée
    })
})
// app.get('/exit', (req, res) => {
//     console.log('je sors')
//     res.redirect('get_accueil')
// })

//////////// gestion utilisateurs ////////////
app.post('/crea_user', (request, response) => {
    console.log('cookie av création ', request.session)
    if (request.session.isId == true & request.session.profil == 0) {
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
            // response.send(results) - ici, reponse = plantage du serveur !
        })
    }
})

app.get('/get_presta', (request, response) => {
    if (request.session.isId == true & request.session.profil == 0) {
        db.getPrestaList((error, results) => {
            response.send(results)
        })
    }
})

app.get('/get_users', (request, response) => {
    if (request.session.isId == true & request.session.profil == 0) {
        db.getUserList((error, results) => {
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

app.get('/get_incByUser', (request, response) => {
    if (request.session.isId == true) {
        db.getIncListByUser(request.session.ut, (error, results) => {
            console.log(results)
            response.send(results)
        })
    }
})

app.post('/crea_signalement', (request, response) => {
    let data = {        // toutes les données nécessaires à toutes les req
        id_presta: request.body.inc,
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
        db.getPrestaLibelleByTinc(data.id_presta, (error, results) => {
            data.presta = results[0].presta_nom
        })
        if (request.session.isId == true) {
            // création incident
            db.creationSignalement(data, (error, results) => {
                data.jrn_inc = results.insertId
                data.jrn_conf = false
                
                // jrn 1 - création signalement
                data.jrn_msg = 'signalement ' + data.coordonneesUsager
                db.ligneJournal(data, (error, results) => {
                    //  response.send({ status: true })
                })
                // jrn 2 - info usager - le cas échéant
                if (data.infoUsager !== '') {
                    data.jrn_msg = data.infoUsager
                    db.ligneJournal(data, (error, results) => {
                        //  response.send({ status: true })
                    })
                }
                // jrn 3 - attribution presta
                data.jrn_msg = 'attribution ' + data.presta
                data.jrn_conf = true
                db.ligneJournal(data, (error, results) => {
                    //  response.send({ status: true })
                })
                response.send({ status: true })
            })

        }
    })
})

//////////// incidents presta ////////////
app.get('/get_incByPresta', (request, response) => {
    if (request.session.isId == true &&
        (request.session.profil == 2 | request.session.profil == 3 | request.session.profil == 4)) {
        db.getIncListByPresta(request.session.uuid, (error, results) => {
            response.send(results)
        })
    }
})

app.get('/charge:id', (request, response) => {
    console.log('cookie', request.session)
    let data = {
        inc_id: request.params.id,
        ut_uuid: request.session.uuid,
    }
    if (request.session.isId == true &&
        (request.session.profil == 2 | request.session.profil == 3 | request.session.profil == 4)) {
        db.affectation(data, (error, results) => {
            response.send({ status: true })
        })
    }
})

app.post('/update_comm_presta', (request, response) => {
    if (request.session.isId == true &&
        (request.session.profil == 2 | request.session.profil == 3 | request.session.profil == 4)) {
        let data = {
            id: request.body.id,
            comm: request.body.comm,
        }
        db.update_comm_presta(data, (error, results) => {
            response.send({ status: true })
        })
    }
})

/*

*/

