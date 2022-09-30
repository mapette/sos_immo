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

// tous les empl avec tous les tinc possible
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








module.exports = {
    getEmpList,
}