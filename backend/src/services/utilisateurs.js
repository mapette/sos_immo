const MD5 = require('sha1')
const lib = require('../../src/lib_serveur')

const cl_ut = require('./../lib_cl_ut')
const cl_hab = require('./../lib_cl_hab')

const data_ut = require('../data/utilisateurs')
const data_hab = require('../data/habilitations')
const serv_hab = require('../services/habilitations')

function creaUser(request,response) {
    let user = new cl_ut.Utilisateur(request.body)
    let mdp = lib.genMdp()
    user.ut_uuid= lib.genUuid()
    user.ut_mdp = MD5(user.ut_id + mdp),
    user.ut_admin_deb = request.session.ut
    console.log('mot de passe à changer à la prochaine connexion => ', mdp)
    data_ut.creationUser(user, (error, results) => {
    let hab = new cl_hab.Habilitation(lib.genUuid(),user.ut_id,user.hab_profil)
    data_hab.creationHabilitationByUsername(hab, (error, results) => {
        response.send({ mdp: mdp })// - pour prépa du mail
    })
})
}

function getUserListByCatAndPresta(request,response) {
    data_ut.getUserList((error, results) => {
        getUserListByCatAndPrestaTraitReq(request, response, results)
    })
}
function getUserListByCatAndPrestaTraitReq(request, response, results) {
    let ut_liste = new cl_ut.Ut_manager()
    results.forEach(element => {
        ut_liste.liste.push(new cl_ut.Utilisateur(element))
    });
    ut_liste.byProfil( request.params.cat)
    ut_liste.byPresta(request.params.presta_id)
    response.send(ut_liste.liste)
}

function getUserAllList(response){
    data_ut.getUserList((error, results) => {
        response.send(results)
    })
}

function getUserByUuid(request,response){
    data_ut.getUserByUuid(request.params.uuid, (error, results) => {
        response.send(results[0])
    })
}

function updateUser(request,response){
    let user = new cl_ut.Utilisateur(request.body)
    data_ut.updateUser(user, (error, results) => {
        serv_hab.controleUpdateHab(user)
        response.send({ msg:'ok' })
    })
}

function deleteUser(request,response){
    let user = {
        ut_uuid : request.params.uuid,
        ut_admin_exp : request.session.ut,
       } 
    data_ut.expUser(user, (error, results) => {
        serv_hab.expHabilitation(user.ut_uuid)   
        response.send({status:'delete'})
    })
}


module.exports = {
    creaUser,
    getUserListByCatAndPresta,
    getUserAllList,
    getUserByUuid,
    updateUser,
    deleteUser,

}