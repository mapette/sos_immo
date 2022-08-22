const mysql = require('mysql');

function connectToMySQL() {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pepette2021+',
        database: 'sos_immo'
    });
    connection.connect()
    //  var sessionStore = new MySQLStore({}, connection);
    return connection
}

////// requêtes //////
function userLogin(reqBody, nomBidon) {
    let params = [reqBody.ut_id, reqBody.ut_mdp]
    let connection = connectToMySQL()
    let query = `SELECT ut_nom, ut_prenom, 
                    ut_id, hab_profil, ut_uuid, 
                    hab_uuid, ut_mdp_exp 
                FROM habilitations, utilisateurs
                WHERE ut_id = ? and ut_mdp = ?
                    AND hab_ut = ut_uuid`
    connection.query(query, params, nomBidon)
    connection.end();
}

function change_mdp(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['ut_newmdp'], val['ut_id'],]
    let query = "UPDATE utilisateurs SET ut_mdp = ? WHERE (ut_id = ?)"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

//////////// utilisateurs ////////////
function getUserNameByUuid(ut_uuid, nomBidon) {     // pour le bandeau et info pour le journal
    let params = [ut_uuid]
    let connection = connectToMySQL()
    let query = `SELECT ut_id, ut_nom, ut_prenom,ut_tel FROM utilisateurs where ut_uuid = ?`
    connection.query(query, params, nomBidon)
    connection.end();
}

function getUserList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT ut.*, presta_nom, presta_libelle, hab_profil, hab_date_exp
            FROM utilisateurs ut LEFT JOIN presta ON (ut_presta = presta_id), habilitations  
            WHERE hab_ut = ut_uuid and hab_date_exp IS NULL `
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}

function creationUtilisateur(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['uuid'], val['username'], val['nom'], val['prenom'], val['tel'], val['mail'], val['presta'], val['mdp'], val['adm'],]
    let query = "INSERT INTO utilisateurs " +
        "(ut_uuid, ut_id, ut_nom, ut_prenom, ut_tel, ut_mail, ut_presta, ut_mdp, ut_admin_deb) " +
        "VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?)"
    console.log(params)
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end()
}
function creationHabilitation(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['uuid'], val['profil'], val['username'],]
    let query = "INSERT INTO habilitations (hab_uuid,  hab_profil, hab_ut) VALUES (?, ?, " +
        "(SELECT ut_uuid FROM utilisateurs WHERE ut_id = ?))"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

//////////// presta ////////////
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

//////////// incidents ////////////
function getEmpList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT emp_id, emp_etage, emp_nom, tinc_id, tinc_nom, presta_libelle
                    FROM emplacements, types_emp, mapping_inc_emp, types_inc, presta
                    WHERE temp_id = emp_temp
                    AND mapping_tinc = tinc_id
                    AND mapping_temp = temp_id
                    AND presta_id = tinc_presta
                    ORDER BY emp_etage, emp_nom, presta_libelle`
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}

function getIncList(val, fonction_traitement_resultat_bdd) {
    let params = [val['uuid']]
    let queryCommun = `SELECT inc_id, emp_nom, emp_etage, tinc_nom, presta_nom,
                            inc_signal_date, inc_affect_date, inc_fin_date, inc_cloture_date
                        FROM incidents, emplacements, presta, utilisateurs, types_inc           
                        WHERE inc_emp = emp_id 
                            AND inc_presta = presta_id
                            AND inc_signal_ut = ut_uuid
                            AND inc_tinc = tinc_id `
    let queryFilter = ''
    let queryOrderBy = `order by inc_fin_date asc, inc_affect_date asc, inc_signal_date asc`
    let connection = connectToMySQL()
    if (val['filtre'] == 'presta') {
        queryFilter = `AND presta_id = (SELECT ut_presta FROM presta, utilisateurs 
            WHERE ut_uuid = ?
            AND ut_presta = presta_id) `
    }
    else if (val['filtre'] == 'usager') {
        queryFilter = `AND ut_id = (SELECT ut_id FROM utilisateurs 
            WHERE ut_uuid = ?) `
    }
    else if (val['filtre'] == 'tempsClotureExpire') {
        queryFilter = ` AND inc_fin_date is not null
                        AND inc_cloture_date is null
                        AND TIMESTAMPDIFF(hour, inc_fin_date, now()) > 48 `
    }
    let query = queryCommun + queryFilter + queryOrderBy
    connection.query((query), params, fonction_traitement_resultat_bdd)
    connection.end();
}

function getIncById(val, fonction_traitement_resultat_bdd) {
    let params = [val]
    let connection = connectToMySQL()
    let query = `SELECT emp_id, emp_nom, emp_etage, tinc_id, tinc_nom, presta_id, presta_nom, inc_affect_ut,
                    inc_signal_date, inc_affect_date, inc_fin_date, inc_cloture_date
                FROM incidents, emplacements, types_inc, presta
                WHERE inc_emp = emp_id 
                    AND inc_presta = presta_id
                    AND inc_tinc = tinc_id
                    AND inc_id = ?
                ORDER BY inc_fin_date asc, inc_affect_date asc, inc_signal_date asc`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
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

function creationSignalement(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['emp'], val['tinc'], val['tinc'], val['ut'],]
    let query = `INSERT INTO incidents (inc_emp, inc_tinc, inc_presta, inc_signal_ut)
                    VALUES (?, ?,  
                        (SELECT tinc_presta FROM types_inc WHERE tinc_id = ?),
                    ?)`
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

function affectationInc(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['ut_uuid'], val['inc_id'],]
    let query = `UPDATE incidents 
                    SET inc_affect_ut = ?, inc_affect_date = now()
                    WHERE inc_id = ?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}
function attributionInc(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['presta_id'], val['inc_id'],]
    let query = `UPDATE incidents 
                    SET inc_presta = ?
                    WHERE inc_id = ?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function finIntervention(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = val
    let query = `UPDATE incidents 
                    SET inc_fin_date = now()
                    WHERE inc_id = ?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function clotureInc(val, fonction_traitement_resultat_bdd) {
    // si val => clôturer 1 inc précis
    // sinon => clôturer ts les inc fermés depuis + de 48 heures
    let connection = connectToMySQL()
    let params = null
    let query = `UPDATE incidents 
                    SET inc_cloture_date = now()`
    if (val !== null) {
        params = [val['inc_id']]
        query = query + ` WHERE inc_id = ?`
    }
    else {
        query = query + ` WHERE inc_fin_date is not null
                            AND inc_cloture_date is null
                            AND TIMESTAMPDIFF(hour, inc_fin_date, now()) > 48`
    }
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

//////////////////////////////////////////////
module.exports = {
    userLogin,
    change_mdp,
    getPrestaList,
    getPrestaNameById,
    getUserNameByUuid,
    getUserList,
    creationUtilisateur,
    creationHabilitation,
    getEmpList,
    creationSignalement,
    getIncList,
    affectationInc,
    attributionInc,
    creaLigneJournal,
    getPrestaLibelleByTinc,
    getIncById,
    getJrnByIncId,
    finIntervention,
    clotureInc,
}



//////////////////////////////////////////////
//////////////////////////////////////////////
