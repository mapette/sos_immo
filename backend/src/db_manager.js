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

////// en attente de librairie //////


////// traitements requêtes //////
function traitementApReq(results, response) {
    // console.log('results traitementApReq', results)
    response.json(results)
}

////// requêtes //////
function userLogin(reqBody, nomBidon) {
    let params = [reqBody.ut_id, reqBody.ut_mdp]
    let connection = connectToMySQL()
    let query = `SELECT ut_nom, ut_prenom, 
                    ut_id, hab_profil, ut_uuid, 
                    hab_uuid, ut_mdp_exp 
     FROM habilitations, utilisateurs
              where ut_id = ? and ut_mdp = ?
              and hab_ut = ut_uuid`
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
    let query = `SELECT ut_id, ut_nom,ut_prenom,ut_tel FROM utilisateurs where ut_uuid = ?`
    connection.query(query, params, nomBidon)
    connection.end();
}

function getUserList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT ut.*, presta_nom, presta_libelle, hab_profil, hab_date_exp
            FROM sos_immo.utilisateurs ut LEFT JOIN sos_immo.presta ON (ut_presta = presta_id),
                sos_immo.habilitations hab 
            WHERE hab_ut = ut_uuid and hab_date_exp IS NULL`
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}

function creationUtilisateur(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['uuid'], val['username'], val['nom'], val['prenom'], val['tel'], val['mail'], val['presta'], val['mdp'], val['adm'],]
    let query = "INSERT INTO utilisateurs " +
        "(ut_uuid, ut_id, ut_nom, ut_prenom, ut_tel, ut_mail, ut_presta, ut_mdp, ut_admin_deb) " +
        "VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?)"
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

function getIncListByUser(val, fonction_traitement_resultat_bdd) {
    let params = [val]
    let connection = connectToMySQL()
    let query = `SELECT inc_uuid, emp_nom, emp_etage, tinc_nom, inc_signal_comm, inc_jrn_interv,
                        inc_signal_date, inc_affect_date, inc_fin_date
                    FROM incidents, emplacements, presta, utilisateurs, types_inc
                    WHERE inc_emp = emp_id 
                        AND inc_presta = presta_id
                        AND inc_signal_ut = ut_uuid
                        AND inc_tinc = tinc_id
                        AND ut_id = ?
                        order by inc_fin_date asc, inc_affect_date asc, inc_signal_date asc`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function getIncListByPresta(val, fonction_traitement_resultat_bdd) {
    let params = [val]
    let connection = connectToMySQL()
    let query = `SELECT inc_uuid, emp_nom, emp_etage, tinc_nom, presta_nom, inc_signal_comm, inc_jrn_interv,
                        ut_nom, ut_prenom, ut_tel,
                        inc_signal_date, inc_affect_date, inc_fin_date
                    FROM incidents, emplacements, presta, utilisateurs, types_inc           
                    WHERE presta_id = (SELECT ut_presta FROM presta, utilisateurs 
                                            WHERE ut_uuid = ?
                                            AND ut_presta = presta_id )
                        AND inc_emp = emp_id 
                        AND inc_presta = presta_id
                        AND inc_signal_ut = ut_uuid
                        AND inc_tinc = tinc_id
                    order by inc_fin_date asc, inc_affect_date asc, inc_signal_date asc`
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

function ligneJournal(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['jrn_inc'], val['jrn_msg'], val['jrn_conf']]
    console.log('param lignes',params)
    let query = `INSERT INTO journaux (jrn_inc, jrn_msg, jrn_conf)
                    VALUES (?, ?, ?)`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function affectation(val, fonction_traitement_resultat_bdd) {
    console.log('params1', val)
    let connection = connectToMySQL()
    let params = [val['ut_uuid'], val['inc_id'],]
    console.log('params2', params)
    let query = `UPDATE incidents 
                    SET inc_affect_ut = ?, inc_affect_date = now()
                    WHERE inc_uuid = ?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

function update_comm_presta(val, fonction_traitement_resultat_bdd) {
    console.log('params1', val)
    let connection = connectToMySQL()
    let params = [val['comm'], val['id'],]
    console.log('params2', params)
    let query = `UPDATE incidents 
                    SET inc_jrn_interv = ?
                    WHERE inc_uuid = ?`
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}


//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////


function delProduct(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let idToDelete = [val['id']]
    let query = "DELETE FROM items WHERE id = ?"
    connection.query(query, idToDelete)
    connection.end();
}

module.exports = {
    userLogin,
    change_mdp,
    traitementApReq,
    getPrestaList,
    getUserList,
    getUserNameByUuid,
    creationUtilisateur,
    creationHabilitation,
    getEmpList,
    creationSignalement,
    getIncListByUser,
    getIncListByPresta,
    affectation,
    update_comm_presta,
    ligneJournal,
    getPrestaLibelleByTinc,
}