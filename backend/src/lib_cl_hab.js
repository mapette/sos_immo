class Habilitation {
  constructor(uuid,ut,profil) {
    this.hab_uuid = uuid
    this.hab_ut = ut
    this.hab_profil = profil
  }
}

class HabilitationTri {
  constructor(results) {
    this.hab_uuid = results.hab_uuid
    this.hab_ut = results.hab_ut
    this.hab_profil = results.hab_profil
    this.hab_date_deb = results.hab_date_deb
    this.hab_date_exp = results.hab_date_exp
  }
}
class Hab_manager {
  constructor() {
    this.liste = new Array()
  }
  retireProfil0() {
    this.liste = this.liste
      .filter(f => f.hab_profil !== 0)
  }

}
/*
      .sort((x, y) => {
        if (x.hab_date_deb < y.hab_date_deb) { return -1 }
        return 0
      })
*/

module.exports = {
  Habilitation,
  HabilitationTri,
  Hab_manager,
}


