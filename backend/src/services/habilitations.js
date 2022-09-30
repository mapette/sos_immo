const lib = require('./../lib_serveur')

const cl_hab = require('./../lib_cl_hab')
const cl_ut = require('./../lib_cl_ut')
const data_hab = require('./../data/habilitations')
const data_ut = require('./../data/utilisateurs')


function getHabByUserUuid(request,response){
    data_hab.getHabByUser(request.params.uuid, (error, results) => {
        let hab_liste = new cl_hab.Hab_manager()
        results.forEach(element => {
            hab_liste.liste.push(new cl_hab.HabilitationTri(element,))
        });
        hab_liste.retireProfil0()
        response.send(hab_liste.liste)
    })
}

function updateHab(request){
    let user = new cl_ut.Utilisateur(request.body)
    data_ut.updateUser(user, (error, results) => {
        serv_hab.controleUpdateHab(user)
       // response.send({ jrn_id: results.insertId })
    })
}















function controleUpdateHab(data){
    // récup dernière habilitation pour contrôler s'il y a lieu de maj
    let habUpdate = new cl_hab.Habilitation(null, data.ut_uuid, parseInt(data.hab_profil))
    data_ut.getUserByUuid(habUpdate.hab_ut, (error, results) => {
        let habOrigine = new cl_hab.Habilitation(results[0].hab_uuid,results[0].ut_uuid,results[0].hab_profil)
        if (habUpdate.hab_profil !== habOrigine.hab_profil){
            // terminé ancien hab
            data_hab.expHabByUuid(habOrigine, (error, results) => {
            })
            // créer new hab
            habUpdate.hab_uuid = lib.genUuid()
            data_hab.creationHabilitationByUserUuid(habUpdate, (error, results) => {
                console.log('new hab',results)
            })
        }
    })
}

function expHabilitation(ut_uuid){
    // date_exp = now() pour l'hab sans date_exp
    data_hab.expHabByUser(ut_uuid, (error, results) => {
    // création hab avec profil 0 (sans date_exp)
    //    newUuid = lib.genUuid()
    //    console.log('newUuid',newUuid)
    //    newHhab = new hab.Habilitation(newUuid,ut_uuid,0)
    //    console.log('hab',newHhab)
    let data= {
        hab_uuid : lib.genUuid(),
        hab_ut : ut_uuid,
        hab_profil : 0,
    }
        data_hab.creationHabilitationByUserUuid(data, (error, results) => {
            console.log(results)
          //  response.send({ msg:'ok' })
         })
    })
}

module.exports = {
    controleUpdateHab,
    expHabilitation,
    getHabByUserUuid,
    updateHab,

    
}