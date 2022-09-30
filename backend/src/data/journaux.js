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


function getJrnByIncId(val, fonction_traitement_resultat_bdd) {
    let params = [val['id'],]
    let query = ''
    let infoImmoExclude = ''
    if (val['infoImmoInclude'] === 'false') {   // attention : string et non booléen
        infoImmoExclude = `AND jrn_imm = false `
    }
    query = `SELECT jrn_id, jrn_date, jrn_msg, jrn_imm
        FROM journaux
        WHERE jrn_inc = ? `
        + infoImmoExclude +
        `ORDER BY jrn_date asc, jrn_id asc`
    let connection = connectToMySQL()
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function creaLigneJournal(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['jrn_inc'], val['jrn_msg'], val['jrn_imm']]
    let query = `INSERT INTO journaux (jrn_inc, jrn_msg, jrn_imm)
                    VALUES (?, ?, ?)`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}







module.exports = {
    getJrnByIncId,
    creaLigneJournal,
   
}