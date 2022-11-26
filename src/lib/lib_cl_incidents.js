const time = require('./lib_time')

class Incident {
  constructor(result) {
    this.inc_id = result.inc_id
    this.emp_etage = result.emp_etage
    this.emp_nom = result.emp_nom
    this.presta_nom = result.presta_nom
    this.tinc_nom = result.tinc_nom
    this.inc_signal_date = result.inc_signal_date
    this.inc_affect_date = result.inc_affect_date
    this.inc_fin_date = result.inc_fin_date
    this.inc_cloture_date = result.inc_cloture_date
  }
}

class Inc_manager {
  constructor() {
    this.liste = new Array()
  }

  static cloneListe(listeOriginale){
    let listeClonee = new Inc_manager()
    for (var i = 0; i < listeOriginale.length; i++){
      listeClonee.liste[i] = listeOriginale[i];
    }
    return  listeClonee.liste
  }

  filterEnAttente() {
    this.liste = this.liste
      .filter(f => f.inc_affect_date === null)
      .sort((x, y) => {
        if (x.inc_signal_date < y.inc_signal_date) { return -1 }
        if (x.inc_signal_date > y.inc_signal_date) { return 1 }
        return 0
      })
  }
  filterEnCours() {
    this.liste = this.liste
      .filter(f => f.inc_affect_date !== null && f.inc_fin_date === null)
      .sort((x, y) => {
        if (x.inc_signal_date < y.inc_signal_date) { return -1 }
        if (x.inc_signal_date > y.inc_signal_date) { return 1 }
        return 0
      })
  }
  filterHorsDelais() {
    this.liste = this.liste
      .filter(f => f.inc_fin_date === null && time.calculTempsRestant(f.inc_signal_date, f.inc_fin_date) < 0)
      .sort((x, y) => {
        if (x.inc_signal_date < y.inc_signal_date) { return -1 }
        if (x.inc_signal_date > y.inc_signal_date) { return 1 }
        return 0
      })
  }
  filterFermesNonClotures() {
    this.liste = this.liste
      .filter(f => f.inc_fin_date !== null && f.inc_cloture_date === null)
      .sort((x, y) => {
        if (x.inc_signal_date < y.inc_signal_date) { return -1 }
        if (x.inc_signal_date > y.inc_signal_date) { return 1 }
        return 0
      })
  }
  clotureAutomatique(listeInc) {
    if (listeInc.length > 0) {
      listeInc.forEach(idToFind => {
        this.liste.forEach(Incident => {
          if (idToFind == Incident.inc_id) {
            Incident.inc_cloture_date = time.initDate()
          }
        });
      });
    }
    this.liste = this.liste
      .sort((x, y) => {
        if (x.inc_signal_date < y.inc_signal_date) { return -1 }
        if (x.inc_signal_date > y.inc_signal_date) { return 1 }
        return 0
      })
  }
}

module.exports = {
  Incident,
  Inc_manager,
}
