const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// gestion des cookies
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 6000000 } // 100 minutes
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

const port = 3001
app.listen(port)

////// en attente de librairie //////

const MD5 = require('sha1')
const uuid = require('uuidv4');

function genUuid() {
    return uuid.uuid()
}
function genMdp() {
    let mdp = ''
    let longMdp = 8
    /* charAlpha : chaîne de caractères alphanumérique */
    let charAlpha = 'abcdefghijknopqrstuvwxyzAcDEFGHJKLMNPQRSTUVWXYZ12345679'
    /* charSpe : chaîne de caractères spéciaux */
    let charSpe = '!@#$+-*&_'
    /* posCharSpe : position du caractère spécial dans le mdp */
    let posCharSpe = Math.floor(Math.random() * (longMdp - 1))
    for (var i = 0; i < longMdp; ++i) {
        if (posCharSpe == i) {
            /* on insère à la position donnée un caractère spécial aléatoire */
            mdp += charSpe.charAt(Math.floor(Math.random() * charSpe.length));
        } else {
            /* on insère un caractère alphanumérique aléatoire */
            mdp += charAlpha.charAt(Math.floor(Math.random() * charAlpha.length));
        }
    }
    return mdp;
}


//////      api     //////
app.get('/get_accueil', (request, response) => {
    console.log('cookie accueil', request.session)
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

// app.get('/exit', (req, res) => {
//     console.log('je sors')
//     res.redirect('get_accueil')
// })

//////////// gestion utilisateurs ////////////
app.post('/crea_user', (request, response) => {
    console.log('cookie av création ', request.session)
    if (request.session.isId == true & request.session.profil == 0) {
        let mdp = genMdp()
        console.log('mot de passe à changer à la prochaine connexion => ', mdp)
        let paramReq = {
            uuid: genUuid(),
            username: request.body.username, nom: request.body.nom, prenom: request.body.prenom,
            tel: request.body.tel, mail: request.body.mail,
            presta: request.body.presta,
            mdp: MD5(request.body.username + mdp),
            adm: request.session.ut,
        }
        db.creationUtilisateur(paramReq, (error, results) => {
            console.log('results', results)
            response.send(results)
        })
        paramReq = {
            uuid: genUuid(),
            username: request.body.username,
            profil: request.body.profil,
        }
        db.creationHabilitation(paramReq, (error, results) => {
            //  console.log(results)
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

//////////// incidents ////////////
app.get('/get_empl', (request, response) => {
    if (request.session.isId == true) {
        db.getEmplList((error, results) => {
            response.send(results)
        })
    }
})

/*
app.get('/get_products', (request, response) => {
    db.dbGetItems((error, results, fields) => {
        response.send(results)
    })
})

//// données clients - alimentés par les cookies paniers
//// remis à zéro quand le panier est validé 
//// cookie généré depuis le front avec la valeur 'panierVide'
let paniers = {}

app.post('/new_product', (request, response) => {
    db.new_product(request.body, (error, results) => {
        response.send(results)
    })
})

app.get('/validPanier', (request, response) => {
    // maj stocks
    let userId = request.cookies.userId
    console.log(paniers[userId])
    let panier = paniers[userId]['panier']
    db.validBasket(panier, (error, results) => {
        console.log('fait')
    })
    // réinit du panier
    paniers[userId]['panier'] = []
    paniers[userId]['amount'] = 0
})

app.get('/cptPanier/:prix/:id', (request, response) => {
    let userId = request.cookies.userId
    let productId = request.params.id
    let prix = request.params.prix
    paniers[userId].panier.push(productId)
    paniers[userId].amount = parseFloat(paniers[userId].amount) + parseFloat(prix)
    console.log(paniers)
    console.log(paniers[userId].panier.length, ' articles')
})

app.get('/get_panier', (request, response) => {
    if (typeof request.cookies.userId === 'undefined') {
        userId = Math.floor(Math.random() * 1000)
        response.cookie('userId', userId, { maxAge: 20000000000, htppOnly: true })
        paniers[userId] = {
            'panier': [],
            'amount': 0.0,     //calculable mais plus pratique ici
        }
    }
    console.log(paniers)
    results = [{
        'nb': paniers[userId].panier.length,
        'amount': paniers[userId].amount,
    }]
    console.log('results : ', results)
    response.send(results)
})

app.get('/get_products', (request, response) => {
    db.dbGetItems((error, results, fields) => {
        response.send(results)
    })
})

app.get('/get_details/:productId', (request, response) => {
    db.dbGetDetails(request.params.productId, (error, results, fields) => {
        response.send(results[0])
    })
})

app.post('/maj_product', (request, response) => {
    db.dbUpdateProduct(request.body, (error, results) => {
        response.send(results)
    })
})

app.post('/del_product', (request, response) => {
    db.delProduct(request.body, (error, results) => {
        response.send(results)
    })
})

 //test cookies
*/app.get('/get_products', (request, response) => {
    // db.dbGetItems((error, results, fields) => {
    //     response.send(results)
    // })
    response.cookie(
        'cookie_sophie',
        'mon cookie',
        { maxAge: 10000, htppOnly: true }
    )
    response.cookie(
        'autre_cookie',
        'mon autre cookie',
        { maxAge: 10000, htppOnly: true }
    )
})
/*
app.get('/cookie', (request, response) => {
    console.log(request.cookies['cookie_sophie'])
    console.log(request.cookies.autre_cookie)
    response.send(`
    test cookies
    </br>
    ${request.cookies.cookie_sophie}
    </br>
    ${request.cookies.autre_cookie}
    `)
})

*/

