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

const login = require('./src/services/login')
const serv_ut = require('./src/services/utilisateurs')
const serv_hab = require('./src/services/habilitations')
const serv_presta = require('./src/services/presta')
const serv_inc = require('./src/services/incidents')
const serv_jrn = require('./src/services/journaux')
const serv_emp = require('./src/services/emplacements')

const data_emp = require('./src/data/emplacements')
const data_hab = require('./src/data/habilitations')
const data_inc = require('./src/data/incidents')
const data_jrn = require('./src/data/journaux')
const data_mapp = require('./src/data/mapping_tinc_temp')
const data_presta = require('./src/data/presta')
const data_temp = require('./src/data/templacements')
const data_tinc = require('./src/data/tincidents')
const data_ut = require('./src/data/utilisateurs')


const port = 3001
app.listen(port)

//////      login     //////
app.get('/get_accueil', (request, response) => {
     login.accueil(request,response)   
})

app.get('/get_userBySession', (request, response) => {
    response.send({ id: request.session.ut })
})

app.post('/login', (request, response) => {
    login.login(request,response)
 })

 app.post('/change_mdp', function(request, response) {
    login.change_mdp({
        ut_id: request.session.ut,
        ut_mdp: request.body.mdp,
        ut_newmdp: request.body.newmdp
    }, response)
 })

//////////// gestion utilisateurs ////////////
app.post('/crea_user', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        serv_ut.creaUser(request,response)
    }
})

app.get('/get_presta', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        serv_presta.get_presta(request,response)
    }
})

app.get('/get_users', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
      serv_ut.getUserAllList(response)
    }
})
app.get('/get_usersByCatAndPresta/:cat/:presta_id', (request, response) => {
    if (request.session.isId == true & (request.session.profil == 3 | request.session.profil == 4)) {
        serv_ut.getUserListByCatAndPresta(request,response)
    }
})

app.get('/get_user:uuid', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        serv_ut.getUserByUuid(request,response) 
    }
})
app.get('/get_habByUser:uuid', (request, response) => {
    if (request.session.isId == true & request.session.profil == 4) {
        serv_hab.getHabByUserUuid(request,response)
    }
})

app.post('/update_user', (request, response) => { 
    if (request.session.isId == true & request.session.profil == 4) {
        serv_ut.updateUser(request,response)
    }
})
app.post('/update_hab ', (request, response) => {
    if (request.session.isId == true) {
       serv_hab.updateHab(request)
    }
})

app.get('/delete_user:uuid', (request, response) => {
   if (request.session.isId == true & request.session.profil == 4) {
        serv_ut.deleteUser(request,response)
   }
})

//////////// incidents ////////////
app.get('/get_inc_details:id', (request, response) => {
    if (request.session.isId == true) {
        serv_inc.getIncById(request, response)    
    }
})
app.get('/get_inc_journal/:id/:infoImmoInclude', (request, response) => {
    if (request.session.isId == true) {
        serv_jrn.getJrnByIncId(request, response)
    }
})
app.post('/update_comm', (request, response) => {
    if (request.session.isId == true) {
        serv_jrn.UpdateJrn(request, response)
    }
})

//////////// incidents usagers ////////////
app.get('/get_emp', (request, response) => {
    if (request.session.isId == true) {
       serv_emp.getEmpAll(request, response)
    }
})

app.post('/crea_signalement', (request, response) => {
    if (request.session.isId == true) {
        serv_inc.creaSignalement(request, response)
    }
})

app.get('/clotureInc:inc_id', (request, response) => {
    if (request.session.isId == true) {
        serv_inc.clotInc(request, response)   
    }
})
app.post('/clotureInc', (request, response) => {        // insatisfaction : commentaire
    if (request.session.isId == true) {
        serv_inc.clotInc(request, response)   
    }
})
app.get('/clotureInc', (request, response) => {     // clôture tous les incidents fermés +48 heures
    if (request.session.isId == true && request.session.profil == 4) {
        serv_inc.clotIncList({ filtre: 'tempsClotureExpire', }, response)
    }
})

//////////// incidents presta ////////////
app.get('/get_incByPresta', (request, response) => {
    if (request.session.isId == true &&
        (request.session.profil == 2 | request.session.profil == 3)) {//| request.session.profil == 4 - imm
        serv_inc.getInc({
            filtre: 'presta',
            uuid: request.session.uuid  // demandeur de la requête
        }, response)  
    }
})
app.get('/get_incByUser', (request, response) => {
    if (request.session.isId == true) {
        serv_inc.getInc({
            filtre: 'usager',
            uuid: request.session.uuid  // demandeur de la requête
        }, response)  
    }
})
app.get('/get_inc', (request, response) => {
    if (request.session.isId == true) {
        serv_inc.getInc({
            filtre: 'rien',
            uuid: request.session.uuid  // ici sans importance, je garde au cas où ça en aurait un jour
        }, response)  
    }
})

app.get('/affectation:inc_id', (request, response) => {
    if (request.session.isId == true && request.session.profil == 2) {
            serv_inc.affectation(request,response)
    }
})
app.get('/affectation/:inc_id/:techno_id/:reaffect', (request, response) => {
    if (request.session.isId == true &&
        (request.session.profil == 3 | request.session.profil == 4)) {
             serv_inc.affectation(request,response)
        }
})
app.get('/attribution/:inc_id/:presta_id', (request, response) => {
    if (request.session.isId == true && request.session.profil == 4) {
            serv_inc.attribution(request.params, response)
    }
})


app.get('/finIntervention:inc_id', (request, response) => {
    if (request.session.isId == true && request.session.profil != 1) {
        serv_inc.finInc(request, response)
    }
})

/*

*/

