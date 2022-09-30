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

// création 
function creationHabilitationByUsername(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['hab_uuid'], val['hab_profil'], val['hab_ut'],]
    let query = "INSERT INTO habilitations (hab_uuid,  hab_profil, hab_ut) VALUES (?, ?, " +
        "(SELECT ut_uuid FROM utilisateurs WHERE ut_id = ?))"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}
function creationHabilitationByUserUuid(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['hab_uuid'], val['hab_profil'], val['hab_ut'],]
    let query = "INSERT INTO habilitations (hab_uuid,  hab_profil, hab_ut) VALUES (?, ?, ?)"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

// expiration
function expHabByUuid(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['hab_uuid'],]
    let query = `UPDATE habilitations SET hab_date_exp=now()
                    WHERE hab_uuid=?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function expHabByUser(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = val
    let query = `UPDATE habilitations SET hab_date_exp=now()
                    WHERE hab_ut=?
                    AND hab_date_exp is null`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

// get
function getHabByUser(ut_uuid, nomBidon) {     // pour le bandeau et info pour le journal
    let params = [ut_uuid]
    let connection = connectToMySQL()
    let query = `SELECT * FROM habilitations 
        WHERE hab_ut = ?
        ORDER BY hab_date_deb DESC`
    connection.query(query, params, nomBidon)
    connection.end();
}








module.exports = {
    creationHabilitationByUsername,
    creationHabilitationByUserUuid,

    expHabByUuid,
    expHabByUser,
    getHabByUser,

}