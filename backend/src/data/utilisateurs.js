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

function userLogin(reqBody, nomBidon) {
    let params = [reqBody.ut_id, reqBody.ut_mdp]
    let connection = connectToMySQL()
    let query = `SELECT ut_nom, ut_prenom, 
                    ut_id, hab_profil, ut_uuid, 
                    hab_uuid, ut_mdp_exp 
                FROM habilitations, utilisateurs
                WHERE ut_id = ? and ut_mdp = ? and hab_date_exp is null
                    AND hab_ut = ut_uuid`               
 //   console.log(params)
  //  console.log(query)
    connection.query(query, params, nomBidon)
    connection.end();
}