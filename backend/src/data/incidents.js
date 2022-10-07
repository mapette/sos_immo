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

// get
function getIncList(val, fonction_traitement_resultat_bdd) {
    // ts les inc selon le profil du demandeur
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
    
    

// création 
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

// update
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






module.exports = {
    getIncList,
    getIncById,
    creationSignalement,
    affectationInc,
    attributionInc,
    finIntervention,
    clotureInc
}