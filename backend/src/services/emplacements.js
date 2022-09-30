const lib = require('./../lib_serveur')

const cl_hab = require('./../lib_cl_hab')
const data_hab = require('./../data/habilitations')
const data_ut = require('./../data/utilisateurs')
const data_emp = require('./../data/emplacements')


function getEmpAll(request, response){
    data_emp.getEmpList((error, results) => {
        response.send( results )
    })
}



module.exports = {
    getEmpAll,
    
    
}