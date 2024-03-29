function formatDate(dateR) {
  if(dateR === null){
    return ''
  }
  else{
     let date = new Date(dateR)
  return convDateToString(date) 
  }
}

function oldIncident(dateCloture) {
  let result = false
  if (dateCloture != null && new Date() - new Date(dateCloture) > DELAIS_VISIBILITE_INC_CLOTURE) {
    result = true
  }
  return result
}


function convDateToString(date) {
  let mois
  if (date.getMonth() + 1 < 10) {
    mois = `0${date.getMonth() + 1}`
  }
  else {
    mois = `${date.getMonth() + 1}`
  }
  let jour
  if (date.getDate() < 10) {
    jour = `0${date.getDate()}`
  }
  else {
    jour = `${date.getDate()}`
  }
  return `${jour}-${mois}-${date.getFullYear()}`
}

function formatHeure(dateR, kpi) {
  let date = new Date(dateR)
  return convHeureToString(date, kpi)
}

function convHeureToString(date, kpi) {
  let heures
  if (date.getHours() + 1 < 10) {
    heures = `0${date.getHours()}`
  }
  else {
    heures = `${date.getHours()}`
  }
  let minutes
  if (date.getMinutes() < 10) {
    minutes = `0${date.getMinutes()}`
  }
  else {
    minutes = `${date.getMinutes()}`
  }
  if (kpi) {
    return `${heures}H${minutes}`
  }
  return `${heures} heures ${minutes}`
}

function initDate() {
  return new Date()
}

function displayDatePilotage(date) {
  let result = '-'
  if (date !== null) {
    result = formatDate(date) + ' - ' + formatHeure(date, true)
  }
  return result
}

function calculTempsRestant(dateSignal, dateFin) {
  // si fin == null : now - signal 
  let tmp = null
  let date = new Date()
  let signal = new Date(dateSignal)
  if (dateFin == null) {
    tmp = DELAIS - (date.getTime() - signal.getTime())
  }
  return tmp
}

function tempsRestant(dateSignal, dateFin) {
  let diff = {}
  let min; let hour
  let msgRetour = 'terminé'
  let tmp = calculTempsRestant(dateSignal, dateFin)
  if (tmp != null) {
    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
    if (Math.abs(diff.min) < 10) { min = '0' + Math.abs(diff.min).toString()} 
    else min = Math.abs(diff.min)

    tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
    if (Math.abs(diff.hour) < 10) { hour = '0' + Math.abs(diff.hour).toString()} 
    else hour = Math.abs(diff.hour)

    tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
    diff.day = tmp;
    if (diff.sec < 0 | diff.min < 0 | diff.hours < 0) {
      msgRetour = 'passé de ' + -diff.day + ' jours ' + hour + 'H ' + min
    } else {
      msgRetour = hour + 'H ' + diff.min
    }
  }
  return msgRetour
}

function isDateExp(dateExp) {
  if (new Date(dateExp) < new Date()) { return true }
  else { return false }
}

function addDaysToDate(date, days) {
  return date.setDate(date.getDate() + days);
}
function addHoursToDate(date, hours) {
  return date.setHours(date.getHours() + hours);
}


const DELAIS = 86400000 // 24 heures en millisecondes
const DELAIS_VISIBILITE_INC_CLOTURE = 2592000000 // 30 jours

module.exports = {
  formatDate,
  formatHeure,
  initDate,
  displayDatePilotage,
  calculTempsRestant,
  tempsRestant,
  addDaysToDate,
  addHoursToDate,
  isDateExp,
  oldIncident,
}
