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
// login
function userLogin(reqBody, nomBidon) {
    let params = [reqBody.ut_id, reqBody.ut_mdp]
    let connection = connectToMySQL()
    let query = `SELECT ut_nom, ut_prenom, 
                    ut_id, hab_profil, ut_uuid, 
                    hab_uuid, ut_mdp_exp 
                FROM habilitations, utilisateurs
                WHERE ut_id = ? and ut_mdp = ? and hab_date_exp is null
                    AND hab_ut = ut_uuid`
    connection.query(query, params, nomBidon)
    connection.end();
}

function change_mdp(val, ) {
    let connection = connectToMySQL()
    let params = [val['ut_newmdp'], val['ut_id'],]
    let query = 'UPDATE utilisateurs SET ut_mdp = ?, ut_mdp_exp=DATE_ADD(now(), INTERVAL 90 DAY) WHERE ut_id = ?'
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

// création
function creationUser(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['ut_uuid'], val['ut_id'], val['ut_nom'], val['ut_prenom'], val['ut_tel'], val['ut_mail'], val['ut_presta'], val['ut_mdp'], val['ut_admin_deb'],]
    let query = "INSERT INTO utilisateurs " +
        "(ut_uuid, ut_id, ut_nom, ut_prenom, ut_tel, ut_mail, ut_presta, ut_mdp, ut_admin_deb, ut_mdp_exp) " +
        "VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, DATE_ADD(now(), INTERVAL 90 DAY))"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end()
}

// update
function updateUser(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['ut_nom'], val['ut_prenom'],val['ut_tel'],val['ut_mail'],val['ut_presta'],val['ut_uuid'],]
    let query = `UPDATE utilisateurs 
                    SET ut_nom=?, ut_prenom=?, ut_tel=?, ut_mail=?, ut_presta=?
                    WHERE ut_uuid=?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

// get
function getUserByUuid(ut_uuid, nomBidon) {     // pour le bandeau et info pour le journal
    let params = [ut_uuid]
    let connection = connectToMySQL()
    let query = `SELECT ut.*, presta_nom, presta_libelle, hab_uuid, hab_profil
        FROM utilisateurs ut LEFT JOIN presta ON (ut_presta = presta_id), habilitations  
        WHERE hab_ut = ut_uuid 
            AND hab_date_exp IS NULL
            AND ut_uuid = ?`
    connection.query(query, params, nomBidon)
    connection.end();
}

function getUserList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT ut.*, presta_nom, presta_libelle, hab_profil, hab_date_exp
            FROM utilisateurs ut LEFT JOIN presta ON (ut_presta = presta_id), habilitations  
            WHERE hab_ut = ut_uuid and hab_date_exp IS NULL` 
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}

// exp
function expUser(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['ut_admin_exp'], val['ut_uuid'],]
    let query = `UPDATE utilisateurs 
                    SET ut_date_exp=now(), ut_admin_exp=?, ut_mdp=Null, ut_mdp_exp=now()
                    WHERE ut_uuid=?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}







module.exports = {
    userLogin,
    change_mdp,
    creationUser,
    updateUser,
    getUserByUuid,
    getUserList,
    expUser,


}