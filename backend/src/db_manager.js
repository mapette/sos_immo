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
    let query = `SELECT ut_nom, ut_prenom, ut_id, hab_profil, ut_uuid, hab_uuid, ut_mdp_exp 
     FROM habilitations, utilisateurs
              where ut_id = ? and ut_mdp = ?
              and hab_ut = ut_uuid`
    connection.query(query, params, nomBidon)
    connection.end();
}

function getUserNameByUuid(ut_uuid, nomBidon) {
    let params = [ut_uuid]
    let connection = connectToMySQL()
    let query = `SELECT ut_id  FROM utilisateurs
                    where ut_uuid = ?`
    connection.query(query, params, nomBidon)
    connection.end();
}
//    console.log('params',params)

//////////// gestion utilisateurs ////////////
function getPrestaList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT * FROM presta`
    connection.query(query, fonction_traitement_resultat_bdd)
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
    //    console.log(val)
    let params = [val['uuid'], val['username'], val['nom'], val['prenom'], val['tel'], val['mail'], val['presta'], val['mdp'], val['adm'],]
    // console.log('params', params)
    let query = "INSERT INTO utilisateurs " +
        "(ut_uuid, ut_id, ut_nom, ut_prenom, ut_tel, ut_mail, ut_presta, ut_mdp, ut_admin_deb) " +
        "VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?)"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}
function creationHabilitation(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let params = [val['uuid'], val['profil'], val['username'],]
    let query = "INSERT INTO habilitations (hab_uuid,  hab_profil, hab_ut) VALUES (?, ?, " +
        "(SELECT ut_uuid FROM utilisateurs WHERE ut_id = ?))"
    connection.query(query, params, fonction_traitement_resultat_bdd)
    connection.end();
}

//////////// incidents ////////////
function getEmplList(fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT emp_id, emp_etage, emp_nom, tinc_id, tinc_nom, presta_libelle
                    FROM emplacements emp,types_emp,mapping_inc_emp,types_inc, presta
                    WHERE temp_id = emp_temp
                    AND mapping_inc = tinc_id
                    AND mapping_emp = temp_id
                    AND presta_id = tinc_presta
                    ORDER BY emp_etage, emp_nom, presta_libelle`
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}
/*
SELECT emp_id, emp_etage, emp_nom, tinc_id, tinc_nom
FROM emplacements emp,types_emp,mapping_inc_emp,types_inc
WHERE temp_id = emp_temp
AND mapping_inc = tinc_id
AND mapping_emp = temp_id
;
*/
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
function dbGetDetails(id, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let query = `SELECT * FROM items WHERE id = ${id}`
    connection.query(query, fonction_traitement_resultat_bdd)
    connection.end();
}

function new_product(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let valuesToInsert = [val['name'], val['origine'], val['description'], val['id_cat'], val['image'], val['prix'], val['qte']]
    let query = "INSERT INTO items (name, origine, description, id_cat, image, prix, qte) VALUES (?, ?, ?, ?, ?, ? ,?)"
    connection.query(query, valuesToInsert, fonction_traitement_resultat_bdd)
    connection.end();
}

function dbUpdateProduct(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let valuesToUpdate = [val['name'], val['description'], val['origine'], val['prix'], val['image'], val['qte'], val['id_cat'], val['id']]
    let query = "UPDATE items SET name = ?, description = ?,  origine = ?, prix = ?, image = ?, qte = ?, id_cat = ? WHERE (id = ?)"
    connection.query(query, valuesToUpdate, fonction_traitement_resultat_bdd)
    connection.end();
}

function delProduct(val, fonction_traitement_resultat_bdd) {
    let connection = connectToMySQL()
    let idToDelete = [val['id']]
    let query = "DELETE FROM items WHERE id = ?"
    connection.query(query, idToDelete)
    connection.end();
}

module.exports = {
    userLogin,
    traitementApReq,
    getPrestaList,
    getUserList,
    getUserNameByUuid,
    creationUtilisateur,
    creationHabilitation,
    getEmplList,

}