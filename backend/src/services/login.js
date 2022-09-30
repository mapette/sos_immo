const data_ut = require('../data/utilisateurs')

function accueil(request, response){
    if (request.session.uuid !== undefined) {
        data_ut.getUserByUuid(request.session.uuid, (error, results) => {
            if (results[0] !== undefined) {
                response.send({ id: results[0] })
            }
        })
    }
}

function login(request,response){
    data_ut.userLogin(request.body, (error, results) => {
        if (results[0] !== undefined) {
            request.session.isId = true
            request.session.profil = results[0]['hab_profil']
            request.session.uuid = results[0]['ut_uuid']
            request.session.ut = results[0]['ut_id']
        }
        response.json(results)
    })
}

function change_mdp(data, response){
    data_ut.userLogin(data, (error, results) => {
        if (results[0] === undefined) {     // devrait pas arriver
            response.send({ status: false })
        }
        else {
            data_ut.change_mdp(data, (error, results) => {
                response.send({ status: true })
             })
        }
    })
}


module.exports = {
    accueil,
    login,
    change_mdp,

}

/*

*/