function formatDate(dateR) {
  if(dateR === null){
    return ''
  }
  else{
     let date = new Date(dateR)
  return convDateToString(date) 
  }
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
  let msgRetour = 'terminé'
  let tmp = calculTempsRestant(dateSignal, dateFin)
  if (tmp != null) {
    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
    tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
    tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
    tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
    diff.day = tmp;
    if (diff.sec < 0 | diff.min < 0 | diff.hours < 0) {
      msgRetour = 'passé de ' + -diff.day + ' jours ' + -diff.hour + 'H ' + -diff.min
    } else {
      msgRetour = diff.hour + 'H ' + diff.min
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
}
