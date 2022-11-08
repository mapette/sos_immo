class Emplacement {
  constructor(result) {
    this.emp_id = result.emp_id
    this.emp_etage = result.emp_etage
    this.emp_nom = result.emp_nom
    this.emp_temp = result.emp_temp
    this.temp_nom = result.temp_nom
  }
}

class Emp_manager {
  constructor() {
    this.liste = []
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

  gdFiltre(filtre) {
    // aucun critère
    if (filtre.etage=== null) {
      this.liste = []
    }
    console.log('cpicpi')
    // // critères manuels uniquement
    // else if ((filtre.nom !== '' || filtre.presta !== '')
    //   && !filtre.actif && !filtre.inactif
    //   && !filtre.usager && !filtre.imm && !filtre.technicien && !filtre.valideur) {
    //   this.filtreNom(filtre.nom)
    //   this.filtrePresta(filtre.presta)
    // }
    // // actif uniquement sans profil
    // else if (filtre.nom === '' && filtre.presta === ''
    //   && filtre.actif && !filtre.inactif
    //   && !filtre.usager && !filtre.imm && !filtre.technicien && !filtre.valideur) {
    //   this.liste = []
    // }
    // // actif avec profil - au minimum
    // else {
    //   this.filtreNom(filtre.nom)
    //   this.filtrePresta(filtre.presta)
    // }
    // this.liste = this.liste
    //   .sort((x, y) => {
    //     if (x.ut_prenom < y.ut_prenom) { return -1 }
    //     if (x.ut_prenom > y.ut_prenom) { return 1 }
    //     return 0
    //   })
    //   .sort((x, y) => {
    //     if (x.ut_nom < y.ut_nom) { return -1 }
    //     if (x.ut_nom > y.ut_nom) { return 1 }
    //     return 0
    //   })

  }

  byProfil(profil) {
    this.liste = this.liste.filter(f => f.hab_profil === parseInt(profil))
  }

  byPresta(presta) {
    this.liste = this.liste.filter(f => f.ut_presta === parseInt(presta))
  }
}

module.exports = {
  Emplacement,
  Emp_manager,
}
