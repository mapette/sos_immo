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
  }
}

class Ut_manager {
  constructor() {
    this.liste = new Array()
  }

  filtreNom(nom) {
    if (nom !== '') {
      this.liste = this.liste.filter(f =>
      (f.ut_nom.toLowerCase().indexOf(nom) !== -1
        || f.ut_prenom.toLowerCase().indexOf(nom) !== -1
        || f.ut_id.toLowerCase().indexOf(nom) !== -1)
      )
    }
  }

  filtrePresta(presta){
    if (presta !== '') {
      this.liste = this.liste.filter(f => f.ut_presta === parseInt(presta))
    }
  }

  gdFiltre(bt) {
    // aucun critère
    if (bt.nom === '' && bt.presta === ''
      && !bt.actif && !bt.inactif
      && !bt.usager && !bt.imm && !bt.technicien && !bt.valideur) {
      this.liste = []
    }
    // inactif
    else if (!bt.actif && bt.inactif) {
      this.liste = this.liste.filter(f => f.ut_date_exp !== null)
      this.liste.filter(f => f.hab_profil === 0)
      if (bt.nom === '' || bt.presta === '') {
        this.filtreNom(bt.nom)
        this.filtrePresta(bt.presta)
      }
    }
    // critères manuels uniquement
    else if (bt.nom !== '' || bt.presta !== ''
      && !bt.actif && !bt.inactif
      && !bt.usager && !bt.imm && !bt.technicien && !bt.valideur) {
      this.filtreNom(bt.nom)
      this.filtrePresta(bt.presta)
    }
    // actif uniquement sans profil
    else if (bt.nom === '' && bt.presta === ''
      && bt.actif && !bt.inactif
      && !bt.usager && !bt.imm && !bt.technicien && !bt.valideur) {
      this.liste = []
    }
    // actif avec profil - au minimum
    else {
      this.filtreNom(bt.nom)
      this.filtrePresta(bt.presta)

      // status
      if (!bt.actif & !bt.inactif) {
        this.liste = []
      }
      else if (bt.actif & !bt.inactif) {
        this.liste = this.liste.filter(f => f.ut_date_exp === null)
      }

      // profils
      if (!bt.usager & !bt.imm & !bt.technicien & !bt.valideur) {
        this.liste = []
      }
      else {
        if (!bt.usager) {
          this.liste = this.liste.filter(f => f.hab_profil !== 1)
        }
        if (!bt.imm) {
          this.liste = this.liste.filter(f => f.hab_profil !== 4)
        }
        if (!bt.technicien) {
          this.liste = this.liste.filter(f => f.hab_profil !== 2)
        }
        if (!bt.valideur) {
          this.liste = this.liste.filter(f => f.hab_profil !== 3)
        }
      }
    }
    this.liste = this.liste
      .sort((x, y) => {
        if (x.ut_prenom < y.ut_prenom) { return -1 }
        if (x.ut_prenom > y.ut_prenom) { return 1 }
          return 0
        })
        .sort((x, y) => {
          if (x.ut_nom < y.ut_nom) { return -1 }
          if (x.ut_nom > y.ut_nom) { return 1 }
          return 0
        })
    
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
