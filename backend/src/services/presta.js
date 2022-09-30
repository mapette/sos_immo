const cl_ut = require('../lib_cl_ut')
const data_ut = require('../data/utilisateurs')
const data_presta = require('../data/presta')


function get_presta(request,response) {
    data_presta.getPrestaList((error, results) => {
        response.send(results)
    })
}


module.exports = {
    get_presta,

    
}