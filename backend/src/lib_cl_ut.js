class Utilisateur {
  constructor(result) {
    this.ut_uuid = result.ut_uuid
    this.ut_id = result.ut_id
    this.ut_nom = result.ut_nom
    this.ut_prenom = result.ut_prenom
    this.ut_presta = result.ut_presta
    this.presta_nom = result.presta_nom
    this.presta_libelle = result.presta_libelle
    this.ut_tel = result.ut_tel
    this.ut_mail = result.ut_mail
    this.hab_profil = result.hab_profil
    this.ut_date_deb = result.ut_date_deb
    this.ut_admin_deb = result.ut_admin_deb
    this.ut_date_exp = result.ut_date_exp
    this.ut_admin_exp = result.ut_admin_exp
    this.hab_profil = result.hab_profil
   // this.ut_mdp = result.ut_mdp 
  }
}

class Ut_manager {
  constructor() {
    this.liste = new Array()
  }
  byProfil(profil) {
    this.liste = this.liste.filter(f => f.hab_profil === parseInt(profil))
  }
  byPresta(presta) {
    this.liste = this.liste.filter(f => f.ut_presta === parseInt(presta))
  }
}
module.exports = {
  Utilisateur,
  Ut_manager,
}
