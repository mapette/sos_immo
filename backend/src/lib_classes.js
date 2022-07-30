class Utilisateur {
  constructor(result) {
    this.ut_uuid = result.ut_uuid
    this.ut_id = result.ut_id
    this.ut_nom = result.ut_nom
    this.ut_prenom = result.ut_prenom
    this.ut_presta = result.ut_presta
    this.ut_tel = result.ut_tel
    this.ut_mail = result.ut_mail
    //  this.ut_date_deb: 2022-06-22T16:40:19.000Z,
    //  this.ut_admin_deb: 'sjoffre',
    //  this.ut_date_exp: null,
    //  this.ut_admin_exp: null,
    //  this.ut_mdp: '73a9a84ffa2adc1543d8b1e57fefb5550507deda',
    //  this.ut_mdp_exp: null,
    //  this.presta_nom: 'Eclair',
    //  this.presta_libelle: 'électricité',
    this.hab_profil = result.hab_profil
    //  this.hab_date_exp: null
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
