const mysql = require('mysql');
function connectToMySQL() {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pepette2021+',
        database: 'sos_immo'
    });
    connection.connect()
    return connection
}

function getPrestaLibelleByTinc(id, nomBidon) {     // pour le bandeau et info pour le journal
    let params = [id]
    let connection = connectToMySQL()
    let query = `SELECT presta_nom FROM presta, types_inc 
                    WHERE tinc_presta = presta_id
                        AND tinc_id = ?`
    connection.query(query, params, nomBidon)
    connection.end();
}

function getPrestaNameById(id, nomBidon) {     // pour le bandeau et info pour le journal
    let params = [id]
    let connection = connectToMySQL()
    let query = `SELECT presta_nom FROM presta 
                    WHERE  presta_id = ?`
    connection.query(query, params, nomBidon)
    connection.end();
}

function getPrestaList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT * FROM presta`
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}








module.exports = {
    getPrestaLibelleByTinc,
    getPrestaNameById,
    getPrestaList,
}